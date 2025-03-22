document.addEventListener("DOMContentLoaded", () => {
  // Animate project cards on scroll
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
});
