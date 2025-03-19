// Mouse movement effect for about square
const aboutSquare = document.getElementById("aboutSquare");
if (aboutSquare) {
  document.addEventListener("mousemove", (e) => {
    const { clientX, clientY } = e;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const moveX = (clientX - windowWidth / 2) / 50;
    const moveY = (clientY - windowHeight / 2) / 50;

    gsap.to("#aboutSquare", {
      x: moveX,
      y: moveY,
      duration: 0.8,
      ease: "power1.out",
    });

    // gsap.to("#aboutSquare::before", {
    //   x: moveX * 1.5,
    //   y: moveY * 1.5,
    //   duration: 0.5,
    //   ease: "power1.out",
    // });
    gsap.to("#aboutSquare", {
      "--pseudo-x": `${moveX * 1.5}px`,
      "--pseudo-y": `${moveY * 1.5}px`,
      duration: 0.5,
      ease: "power1.out",
    });
  });
}

// Add particle background effect
const createParticle = () => {
  const particle = document.createElement("div");
  particle.style.position = "absolute";
  particle.style.width = "3px";
  particle.style.height = "3px";
  particle.style.background = "rgba(94, 129, 172, 0.5)";
  particle.style.borderRadius = "50%";
  particle.style.pointerEvents = "none";

  // Random position
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;

  // Random size
  const size = Math.random() * 2 + 1;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;

  // Add to body
  document.body.appendChild(particle);

  // Animate
  gsap.to(particle, {
    y: y + 100,
    x: x + (Math.random() * 100 - 50),
    opacity: 0,
    duration: Math.random() * 5 + 3,
    ease: "power1.out",
    onComplete: () => {
      document.body.removeChild(particle);
      createParticle();
    },
  });
};

// Create initial particles
for (let i = 0; i < 20; i++) {
  setTimeout(() => {
    createParticle();
  }, i * 200);
}

// Image slideshow for aboutSquare
const aboutSquareSlideshow = () => {
  const images = document.querySelectorAll(".about-square-image");
  if (images.length > 0) {
    let currentIndex = 0;

    // Function to show next image
    const showNextImage = () => {
      // Hide current image
      images[currentIndex].classList.remove("active");

      // Update index
      currentIndex = (currentIndex + 1) % images.length;

      // Show new image
      images[currentIndex].classList.add("active");
    };

    // Change image every 3 seconds
    setInterval(showNextImage, 3000);
  }
};

// Initialize slideshow
document.addEventListener("DOMContentLoaded", aboutSquareSlideshow);

// Interactive image gallery controls
const setupImageControls = () => {
  const aboutSquare = document.getElementById("aboutSquare");
  const images = document.querySelectorAll(".about-square-image");

  if (aboutSquare && images.length > 0) {
    // Create navigation dots
    const dotsContainer = document.createElement("div");
    dotsContainer.className = "image-dots";

    images.forEach((img, index) => {
      const dot = document.createElement("span");
      dot.className = "image-dot";
      if (img.classList.contains("active")) {
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

// Initialize image controls
document.addEventListener("DOMContentLoaded", setupImageControls);
