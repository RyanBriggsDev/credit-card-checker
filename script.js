document.addEventListener("DOMContentLoaded", function () {
  // Listen for input events in the card input field
  document.getElementById("cardInput").addEventListener("input", function () {
    const cardNumber = this.value;

    // Just for now, we log the card number
    console.log("Card Number:", cardNumber);

    // Placeholder: Update the DOM (this will be replaced by actual logic later)
    document.getElementById("cardType").textContent = "Card Type: Unknown";
    document.getElementById("cardValidity").textContent =
      "Validity: Checking...";
  });
});
