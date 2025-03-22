document.addEventListener("DOMContentLoaded", () => {
  // Scroll Animations
  gsap.registerPlugin(ScrollTrigger);

  // Section Fade In Animation
  const sections = document.querySelectorAll(".section-fade-in");
  sections.forEach((section) => {
    gsap.to(section, {
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  });

  // Background Particle Animation
  // Create canvas element for particles
  const canvas = document.createElement("canvas");
  canvas.id = "particleCanvas";
  document.body.insertBefore(canvas, document.body.firstChild);

  // Style the canvas
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none"; // Make sure it doesn't interfere with clicks
  canvas.style.zIndex = "-1"; // Place behind all content

  const ctx = canvas.getContext("2d");

  // Set canvas size to match window
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  // Call resize initially and on window resize
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Particle class
  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1; // Varied sizes
      this.speedX = (Math.random() - 0.5) * 0.5; // Slow horizontal movement
      this.speedY = (Math.random() - 0.5) * 0.5; // Slow vertical movement
      this.opacity = Math.random() * 0.5 + 0.1; // Varied opacity
    }

    update() {
      // Move particles
      this.x += this.speedX;
      this.y += this.speedY;

      // Reset particles that go off screen
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }

    draw() {
      ctx.fillStyle = `rgba(100, 120, 255, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }
  }

  // Create particles
  const particles = [];
  const particleCount = Math.min(100, Math.floor(window.innerWidth / 20)); // Adjust count based on screen width

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Connect particles with lines if they're close enough
  function connectParticles() {
    const maxDistance = 150;

    for (let i = 0; i < particles.length; i++) {
      for (let j = i; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          // Draw line with opacity based on distance
          const opacity = 1 - distance / maxDistance;
          ctx.strokeStyle = `rgba(100, 120, 255, ${opacity * 0.15})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  // Animation loop
  function animate() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    for (const particle of particles) {
      particle.update();
      particle.draw();
    }

    // Connect particles with lines
    connectParticles();

    // Continue animation
    requestAnimationFrame(animate);
  }

  // Start animation
  animate();

  // Add mouse interaction
  const mouse = {
    x: null,
    y: null,
    radius: 150,
  };

  window.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;

    // Slightly repel particles near the cursor
    for (const particle of particles) {
      const dx = particle.x - mouse.x;
      const dy = particle.y - mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouse.radius) {
        const force = (mouse.radius - distance) / mouse.radius;
        const directionX = dx / distance || 0;
        const directionY = dy / distance || 0;

        particle.x += directionX * force * 2;
        particle.y += directionY * force * 2;
      }
    }
  });

  // Handle touch devices
  window.addEventListener(
    "touchmove",
    (event) => {
      if (event.touches.length > 0) {
        mouse.x = event.touches[0].clientX;
        mouse.y = event.touches[0].clientY;
      }
    },
    { passive: true }
  );
});
