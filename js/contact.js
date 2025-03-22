document.addEventListener("DOMContentLoaded", () => {
  initContactForm();
  initCopyButtons();
});

function initContactForm() {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  // Set form attributes
  contactForm.setAttribute("action", "https://formspree.io/f/xwpllrek");
  contactForm.setAttribute("method", "POST");

  contactForm.addEventListener("submit", handleFormSubmit);
}

function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const email = document.getElementById("email");
  const message = document.getElementById("message");
  const submitButton = form.querySelector("button[type='submit']");

  // Update button state
  toggleSubmitButton(submitButton, true);

  // Send form data
  fetch(form.action, {
    method: form.method,
    body: formData,
    headers: { Accept: "application/json" },
  })
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then(() => {
      createStatusMessage("Message sent successfully! Thank you for reaching out.", "success");

      // Clear form
      email.value = "";
      message.value = "";
    })
    .catch((error) => {
      console.error("Error:", error);
      createStatusMessage("There was a problem sending your message. Please try again.", "error");
    })
    .finally(() => {
      toggleSubmitButton(submitButton, false);
    });
}

function toggleSubmitButton(button, isLoading) {
  button.disabled = isLoading;
  button.innerText = isLoading ? "Sending..." : "Send";
}

function createStatusMessage(messageText, type) {
  const contactForm = document.getElementById("contactForm");

  // Remove existing status messages
  const existingStatus = document.querySelector(".form-status");
  if (existingStatus) existingStatus.remove();

  // Create and add status element
  const statusElement = document.createElement("div");
  statusElement.className = `form-status ${type}`;
  statusElement.textContent = messageText;
  contactForm.appendChild(statusElement);

  // Auto-remove success messages
  if (type === "success") {
    setTimeout(() => {
      statusElement.style.opacity = "0";
      setTimeout(() => statusElement.remove(), 300);
    }, 5000);
  }
}

function initCopyButtons() {
  const copyButtons = document.querySelectorAll(".copy-btn");
  copyButtons.forEach((button) => {
    button.addEventListener("click", handleCopyClick);
  });
}

function handleCopyClick(e) {
  const valueToCopy = this.getAttribute("data-value");

  navigator.clipboard
    .writeText(valueToCopy)
    .then(() => {
      showTooltip("Copied!", e.clientX, e.clientY);
    })
    .catch((err) => {
      console.error("Could not copy text:", err);
      showTooltip("Failed to copy", e.clientX, e.clientY);
    });
}

function showTooltip(message, x, y) {
  const tooltip = document.createElement("div");
  tooltip.textContent = message;
  tooltip.className = "tooltip";
  tooltip.style.left = `${x + 10}px`;
  tooltip.style.top = `${y - 10}px`;

  document.body.appendChild(tooltip);

  // Remove tooltip after delay
  setTimeout(() => {
    tooltip.style.opacity = "0";
    setTimeout(() => document.body.removeChild(tooltip), 500);
  }, 1500);
}
