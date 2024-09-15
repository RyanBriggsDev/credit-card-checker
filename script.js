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

    // Check card type
    let cardType = "Unknown";
    switch (true) {
      case /^4/.test(cardNumber):
        cardType = "Visa";
        break;
      case /^5[1-5]/.test(cardNumber):
        cardType = "MasterCard";
        break;
      case /^3[47]/.test(cardNumber):
        cardType = "American Express";
        break;
      case /^6(?:011|5)/.test(cardNumber):
        cardType = "Discover";
        break;
      case /^(?:2131|1800|35\d{3})/.test(cardNumber):
        cardType = "JCB";
        break;
      default:
        cardType = "Unknown";
    }

    return { isValid, cardType };
  }

  // Function to update card image
  function updateCardImage(cardType) {
    const cardTypeImage = document.getElementById("cardTypeImage");
    let imagePath = "";

    switch (cardType) {
      case "Visa":
        imagePath = "assets/card_types/visa.png";
        cardTypeImage.style.top = "4px";
        break;
      case "MasterCard":
        imagePath = "assets/card_types/mastercard.svg";
        cardTypeImage.style.top = "5px";
        break;
      case "American Express":
        imagePath = "assets/card_types/amex.png";
        cardTypeImage.style.top = "0px";
        break;
      case "Discover":
        imagePath = "assets/card_types/discover.png";
        cardTypeImage.style.top = "0px";
        break;
      case "JCB":
        imagePath = "";
        cardTypeImage.style.top = "0px";
        break;
      default:
        imagePath = "";
    }

    cardTypeImage.src = imagePath;
    cardTypeImage.parentElement.style.display = imagePath ? "block" : "none";
  }

  // listen for changes on input field
  document.getElementById("cardInput").addEventListener("input", function () {
    const cardNumber = this.value;
    const result = validateAndIdentifyCard(cardNumber);
    if (result.isValid) {
      this.classList.add("valid");
      this.classList.remove("invalid");
    } else {
      if (!this.classList.contains("invalid")) {
        this.classList.remove("valid");
        this.classList.add("invalid");
      }
    }

    if (this.value == "") {
      this.classList.remove("invalid");
    }

    updateCardImage(result.cardType);

    document.getElementById(
      "cardType"
    ).textContent = `Card Type: ${result.cardType}`;
    document.getElementById("cardValidity").textContent = `Validity: ${
      result.isValid ? "Valid" : "Invalid"
    }`;
  });
});
