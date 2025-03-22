// Initialize after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // About Square Animation
  gsap.to("#aboutSquare", {
    scrollTrigger: {
      trigger: "#aboutSquare",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    duration: 1.5,
    ease: "elastic.out(1, 0.3)",
    scale: 1.05,
    rotate: 3,
  });

  setupImageControls();
  setTimeout(startImageSlideshow, 100);
});

// Set up image slideshow for about section
function startImageSlideshow() {
  const images = document.querySelectorAll(".about-square-image");
  const dots = document.querySelectorAll(".image-dot");

  if (images.length === 0) return;

  let currentIndex = 0;

  // Show next image in rotation
  const showNextImage = () => {
    // Hide current image and dot
    images[currentIndex].classList.remove("active");
    if (dots[currentIndex]) {
      dots[currentIndex].classList.remove("active");
    }

    // Update index
    currentIndex = (currentIndex + 1) % images.length;

    // Show new image and dot
    images[currentIndex].classList.add("active");
    if (dots[currentIndex]) {
      dots[currentIndex].classList.add("active");
    }
  };

  // Change image every 3 seconds
  setInterval(showNextImage, 3000);
}

// Set up image navigation controls
function setupImageControls() {
  const aboutSquare = document.getElementById("aboutSquare");
  const images = document.querySelectorAll(".about-square-image");

  // Verify elements exist and dots don't already exist
  if (!aboutSquare || images.length === 0 || aboutSquare.querySelector(".image-dots")) {
    return;
  }

  // Find the initial active image index
  let activeIndex = 0;
  images.forEach((img, idx) => {
    if (img.classList.contains("active")) {
      activeIndex = idx;
    }
  });

  // Create navigation dots
  const dotsContainer = document.createElement("div");
  dotsContainer.className = "image-dots";

  images.forEach((img, index) => {
    const dot = document.createElement("span");
    dot.className = "image-dot";

    // Set active class for initial active image
    if (index === activeIndex) {
      dot.classList.add("active");
    }

    // Add click event to show corresponding image
    dot.addEventListener("click", () => {
      // Hide all images
      images.forEach((image) => image.classList.remove("active"));

      // Show selected image
      images[index].classList.add("active");

      // Update dots state
      document.querySelectorAll(".image-dot").forEach((d) => d.classList.remove("active"));
      dot.classList.add("active");
    });

    dotsContainer.appendChild(dot);
  });

  // Add dots to container
  aboutSquare.appendChild(dotsContainer);
}
