// Form submission
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  console.log({ name, email, subject, message });

  // Reset form
  contactForm.reset();

  // Show success message
  alert("Thank you for your message! I will get back to you soon.");
});
