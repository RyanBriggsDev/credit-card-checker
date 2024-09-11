document.addEventListener("DOMContentLoaded", function () {
  function validateAndIdentifyCard(cardNumber) {
    // Remove any non-digit characters
    cardNumber = cardNumber.replace(/\D/g, "");

    // Check input length
    if (cardNumber.length < 13 || cardNumber.length > 19) {
      return { isValid: false, cardType: "Unknown" };
    }

    // Luhn Algorithm
    let sum = 0;
    let isEven = false;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i), 10);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    const isValid = sum % 10 === 0;

    return { isValid, cardType: "Unknown" };
  }

  // listen for changes on input field
  document.getElementById("cardInput").addEventListener("input", function () {
    const cardNumber = this.value;
    const result = validateAndIdentifyCard(cardNumber);

    document.getElementById("cardType").textContent = "Card Type: Unknown";
    document.getElementById("cardValidity").textContent = `Validity: ${
      result.isValid ? "Valid" : "Invalid"
    }`;
  });
});
