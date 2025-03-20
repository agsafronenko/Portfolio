document.addEventListener("DOMContentLoaded", () => {
  // Scroll Animations
  gsap.registerPlugin(ScrollTrigger);

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

  // Project Cards Animation
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card, index) => {
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: index * 0.15,
      ease: "power3.out",
    });
  });

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

  // Contact Form Animation
  const contactForm = document.querySelector(".contact-form");
  gsap.from(contactForm, {
    scrollTrigger: {
      trigger: contactForm,
      start: "top 80%",
      toggleActions: "play none none none",
    },
    opacity: 0,
    scale: 0.95,
    duration: 0.8,
    ease: "back.out(1.7)",
  });
});
