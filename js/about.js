// Image slideshow for aboutSquare
const aboutSquareSlideshow = () => {
  const images = document.querySelectorAll(".about-square-image");
  const dots = document.querySelectorAll(".image-dot");

  if (images.length > 0) {
    let currentIndex = 0;

    // Function to show next image
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
};

// Interactive image gallery controls
const setupImageControls = () => {
  const aboutSquare = document.getElementById("aboutSquare");
  const images = document.querySelectorAll(".about-square-image");

  // Check if controls already exist
  if (aboutSquare && images.length > 0 && !aboutSquare.querySelector(".image-dots")) {
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

      // Set active class for the initial active image
      if (index === activeIndex) {
        dot.classList.add("active");
      }

      dot.addEventListener("click", () => {
        // Hide all images
        images.forEach((image) => image.classList.remove("active"));
        // Show selected image
        images[index].classList.add("active");

        // Update dots
        document.querySelectorAll(".image-dot").forEach((d) => d.classList.remove("active"));
        dot.classList.add("active");
      });

      dotsContainer.appendChild(dot);
    });

    // Append dots to aboutSquare
    aboutSquare.appendChild(dotsContainer);
  }
};

// Make sure image controls are initialized before the slideshow
document.addEventListener("DOMContentLoaded", () => {
  setupImageControls();
  setTimeout(aboutSquareSlideshow, 100); // Small delay to ensure dots are created first
});
