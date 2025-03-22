document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const navLinks = document.getElementById("navLinks");
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const closeMenu = document.getElementById("closeMenu");
  const navItems = document.querySelectorAll(".nav-links a");

  // Toggle mobile menu
  mobileMenuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    navLinks.style.top = "0";
    navLinks.classList.add("nav-active");
    closeMenu.style.display = "flex";
    mobileMenuBtn.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  // Close menu function
  const closeNavMenu = () => {
    navLinks.classList.remove("nav-active");
    mobileMenuBtn.classList.remove("active");
    document.body.style.overflow = "";
  };

  // Close menu when X is clicked
  closeMenu.addEventListener("click", (e) => {
    e.stopPropagation();
    closeNavMenu();
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && e.target !== mobileMenuBtn && navLinks.classList.contains("nav-active")) {
      closeNavMenu();
    }
  });

  // Close menu when a nav item is clicked
  navItems.forEach((item) => {
    item.addEventListener("click", closeNavMenu);
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      closeNavMenu();

      const targetElement = document.querySelector(this.getAttribute("href"));
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Add active class to current section in nav
  const sections = document.querySelectorAll("section");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${current}`) {
        item.classList.add("active");
      }
    });
  });
});
