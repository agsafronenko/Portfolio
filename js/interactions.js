// Add fancy hover effect to project cards
const projectCards = document.querySelectorAll(".project-card");
projectCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    gsap.to(card, {
      scale: 1.03,
      boxShadow: "0 30px 40px rgba(0,0,0,0.3)",
      duration: 0.3,
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      scale: 1,
      boxShadow: "0 20px 30px rgba(0,0,0,0.2)",
      duration: 0.3,
    });
  });
});

// Add skill tag animation on hover
const skillTags = document.querySelectorAll(".skill-tag");
skillTags.forEach((tag) => {
  tag.addEventListener("mouseenter", () => {
    gsap.to(tag, {
      y: -5,
      scale: 1.1,
      backgroundColor: "var(--accent)",
      color: "white",
      boxShadow: "0 5px 15px rgba(94, 129, 172, 0.3)",
      duration: 0.3,
    });
  });

  tag.addEventListener("mouseleave", () => {
    gsap.to(tag, {
      y: 0,
      scale: 1,
      backgroundColor: "var(--card-bg)",
      color: "var(--text)",
      boxShadow: "none",
      duration: 0.3,
    });
  });
});
