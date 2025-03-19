// Navigation functionality
const header = document.getElementById("header");
const navLinks = document.getElementById("navLinks");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const closeMenu = document.getElementById("closeMenu");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("header-scrolled");
  } else {
    header.classList.remove("header-scrolled");
  }
});

mobileMenuBtn.addEventListener("click", () => {
  navLinks.classList.add("nav-active");
  mobileMenuBtn.classList.add("active");
});

closeMenu.addEventListener("click", () => {
  navLinks.classList.remove("nav-active");
  mobileMenuBtn.classList.remove("active");
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    // Close mobile menu if open
    navLinks.classList.remove("nav-active");
    mobileMenuBtn.classList.remove("active");

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});
