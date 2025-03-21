document.addEventListener("DOMContentLoaded", () => {
  // Create modal elements
  const modalHTML = `
      <div id="location-modal" class="location-modal">
        <div class="modal-content">
          <span class="close-modal">&times;</span>
          <h3>Herceg Novi</h3>
          <div class="modal-tabs">
            <button class="tab-btn" data-tab="map">Map</button>
            <button class="tab-btn active" data-tab="gallery">Gallery</button>
          </div>
          <div class="tab-content">
            <div id="map-tab" class="tab-pane">
              <div class="map-container">
                <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12000000!2d18.5375!3d42.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134c311aaadf1073%3A0x5a6d5733aadab22f!2sHerceg%20Novi%2C%20Montenegro!5e0!3m2!1sen!2sus!4v1716511325046!5m2!1sen!2sus" 
                width="100%" 
                height="450" 
                style="border:0;" 
                allowfullscreen="" 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade">
                </iframe>
              </div>
            </div>
            <div id="gallery-tab" class="tab-pane active">
              <div class="gallery-container">
                <div class="gallery-slider">
                  <div class="slide active">
                    <img src="images/herceg_novi/04.jpg" alt="Boka Kotorska from Kanli Kula fortress" />
                    <p class="caption">Boka Kotorska from Kanli Kula fortress</p>
                  </div>
                  <div class="slide">
                    <img src="images/herceg_novi/02.jpeg" alt="Herceg Novi coastal view" />
                    <p class="caption">Herceg Novi coastal view</p>
                  </div>
                  <div class="slide">
                    <img src="images/herceg_novi/05.jpg" alt="Herceg Novi Old Town" />
                    <p class="caption">Herceg Novi Old Town</p>
                  </div>
                  <div class="slide">
                    <img src="images/herceg_novi/01.jpeg" alt="Church of Michael the Archangel" />
                    <p class="caption">Church of Michael the Archangel</p>
                  </div>
                  <div class="slide">
                    <img src="images/herceg_novi/03.jpg" alt="Herceg Novi promenade" />
                    <p class="caption">Herceg Novi promenade</p>
                  </div>
                </div>
                <div class="gallery-controls">
                  <button class="prev-btn">&larr;</button>
                  <div class="gallery-dots"></div>
                  <button class="next-btn">&rarr;</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

  // Append modal to body
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  // Add event listener to Herceg Novi link
  const locationLink = document.querySelector('a[href*="Herceg+Novi"]');
  if (locationLink) {
    locationLink.addEventListener("click", function (e) {
      e.preventDefault();
      openLocationModal();
    });
  }

  // Modal elements
  const modal = document.getElementById("location-modal");
  const closeBtn = document.querySelector(".close-modal");
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabPanes = document.querySelectorAll(".tab-pane");

  // Gallery elements
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const dotsContainer = document.querySelector(".gallery-dots");

  // Create dots for gallery
  slides.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("gallery-dot");
    if (index === 0) dot.classList.add("active");
    dot.dataset.index = index;
    dotsContainer.appendChild(dot);

    dot.addEventListener("click", () => {
      showSlide(index);
    });
  });

  // Current slide index
  let currentSlide = 0;

  // Function to show a specific slide
  function showSlide(index) {
    // Hide all slides
    slides.forEach((slide) => {
      slide.classList.remove("active");
      gsap.to(slide, { opacity: 0, duration: 0.3 });
    });

    // Update dots
    document.querySelectorAll(".gallery-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });

    // Show the selected slide with animation
    currentSlide = index;
    gsap.to(slides[currentSlide], {
      opacity: 1,
      duration: 0.5,
      onStart: () => {
        slides[currentSlide].classList.add("active");
      },
    });
  }

  // Previous slide
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    });
  }

  // Next slide
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    });
  }

  // Auto slide every 5 seconds when gallery is visible
  let slideInterval;

  function startSlideshow() {
    slideInterval = setInterval(() => {
      if (document.getElementById("gallery-tab").classList.contains("active")) {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
      }
    }, 3500);
  }

  function stopSlideshow() {
    clearInterval(slideInterval);
  }

  // Function to open modal
  function openLocationModal() {
    modal.style.display = "flex";
    gsap.fromTo(modal, { opacity: 0 }, { opacity: 1, duration: 0.3 });

    gsap.fromTo(".modal-content", { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" });

    startSlideshow();
  }

  // Close modal
  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  // Close when clicking outside the modal content
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  function closeModal() {
    gsap.to(modal, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        modal.style.display = "none";
      },
    });
    stopSlideshow();
  }

  // Tab switching
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons and panes
      tabBtns.forEach((b) => b.classList.remove("active"));
      tabPanes.forEach((p) => p.classList.remove("active"));

      // Add active class to clicked button and corresponding pane
      btn.classList.add("active");
      const tabId = btn.dataset.tab + "-tab";
      const tabPane = document.getElementById(tabId);

      gsap.fromTo(tabPane, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, onStart: () => tabPane.classList.add("active") });
    });
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!modal.style.display || modal.style.display === "none") return;

    if (e.key === "Escape") {
      closeModal();
    } else if (e.key === "ArrowLeft" && document.getElementById("gallery-tab").classList.contains("active")) {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    } else if (e.key === "ArrowRight" && document.getElementById("gallery-tab").classList.contains("active")) {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }
  });
});
