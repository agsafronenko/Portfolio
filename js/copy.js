document.addEventListener("DOMContentLoaded", function () {
  // Add event listeners to all copy buttons
  const copyButtons = document.querySelectorAll(".copy-btn");

  copyButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Get the value to copy from the data attribute
      const valueToCopy = this.getAttribute("data-value");

      // Copy to clipboard
      navigator.clipboard
        .writeText(valueToCopy)
        .then(() => {
          // Create a tooltip for feedback
          showTooltip("Copied!", e.clientX, e.clientY);
        })
        .catch((err) => {
          console.error("Could not copy text: ", err);
          showTooltip("Failed to copy", e.clientX, e.clientY);
        });
    });
  });

  // Function to show tooltip
  function showTooltip(message, x, y) {
    const tooltip = document.createElement("div");
    tooltip.textContent = message;
    tooltip.className = "tooltip";
    tooltip.style.left = `${x + 10}px`;
    tooltip.style.top = `${y - 10}px`;

    document.body.appendChild(tooltip);

    // Remove the tooltip after a delay
    setTimeout(() => {
      tooltip.style.opacity = "0";
      setTimeout(() => document.body.removeChild(tooltip), 500);
    }, 1500);
  }
});
