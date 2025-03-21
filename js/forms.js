document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    // Add action and method directly to the form
    contactForm.setAttribute("action", "https://formspree.io/f/xwpllrek");
    contactForm.setAttribute("method", "POST");

    contactForm.addEventListener("submit", function (event) {
      // Prevent the default form submission
      event.preventDefault();

      const form = event.target;
      const formData = new FormData(form);
      const email = document.getElementById("email");
      const message = document.getElementById("message");
      const submitButton = form.querySelector("button[type='submit']");

      // Disable button and show loading state
      submitButton.disabled = true;
      submitButton.innerText = "Sending...";

      // Send form data using fetch
      fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok");
        })
        .then((data) => {
          // Success! Show message and clear form
          createStatusMessage("Message sent successfully! Thank you for reaching out.", "success");

          // Clear form fields
          email.value = "";
          message.value = "";
        })
        .catch((error) => {
          console.error("Error:", error);
          createStatusMessage("There was a problem sending your message. Please try again.", "error");
        })
        .finally(() => {
          // Re-enable button
          submitButton.disabled = false;
          submitButton.innerText = "Send";
        });
    });
  }

  function createStatusMessage(messageText, type) {
    // Remove any existing status messages
    const existingStatus = document.querySelector(".form-status");
    if (existingStatus) {
      existingStatus.remove();
    }

    // Create status element
    const statusElement = document.createElement("div");
    statusElement.className = `form-status ${type}`;
    statusElement.textContent = messageText;

    // Add to form
    contactForm.appendChild(statusElement);

    // Auto-remove success message after 5 seconds
    if (type === "success") {
      setTimeout(() => {
        statusElement.style.opacity = "0";
        setTimeout(() => statusElement.remove(), 300);
      }, 5000);
    }
  }
});
