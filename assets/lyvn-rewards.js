document.addEventListener("DOMContentLoaded", () => {
  const earnedCoinsElement = document.getElementById("earnedCoins");
  const availableCoinsElement = document.getElementById("availableCoins");
  const originalTotalElement = document.getElementById("originalTotal");
  const finalTotalElement = document.getElementById("finalTotal");
  const redeemCheckbox = document.getElementById("redeemCoins");
  const discountNote = document.getElementById("discountInfo");
  const purchaseButton = document.getElementById("earnCoinsBtn");

  const STORAGE_KEY = "lyvnCoins";

  // Earn 1 coin for every ₹10 spent
  const COIN_RATE = 10;

  // Redeem 10 coins = ₹1 discount
  const REDEMPTION_RATE = 10;

  function parsePrice(text) {
    return Number(text.replace(/[^\d.]/g, "")) || 0;
  }

  function getBalance() {
    return Number(localStorage.getItem(STORAGE_KEY)) || 0;
  }

  function saveBalance(balance) {
    localStorage.setItem(STORAGE_KEY, balance);
  }

  function earnedCoins(price) {
    return Math.floor(price / COIN_RATE);
  }

  function formatCurrency(value) {
    return `₹${value.toFixed(2)}`;
  }

  function render() {
    const price = parsePrice(originalTotalElement.textContent);
    const balance = getBalance();
    const earned = earnedCoins(price);

    earnedCoinsElement.textContent = `${earned} Coins`;
    availableCoinsElement.textContent = `${balance} Coins`;

    let payable = price;

    if (redeemCheckbox.checked && balance > 0) {
      const discount = Math.min(balance / REDEMPTION_RATE, price);

      payable -= discount;

      discountNote.innerHTML = `
        <strong>Reward Applied</strong>
        <p>You saved ${formatCurrency(discount)} using your reward coins.</p>
      `;
    } else {
      discountNote.textContent =
        "Redeem your available reward coins for an instant discount.";
    }

    finalTotalElement.textContent = formatCurrency(payable);
  }

  redeemCheckbox.addEventListener("change", render);

  purchaseButton.addEventListener("click", () => {
    const price = parsePrice(originalTotalElement.textContent);

    let balance = getBalance();

    if (redeemCheckbox.checked && balance > 0) {
      const discount = Math.min(balance / REDEMPTION_RATE, price);
      const redeemedCoins = Math.floor(discount * REDEMPTION_RATE);

      balance -= redeemedCoins;
    }

    const earned = earnedCoins(price);
    balance += earned;

    saveBalance(balance);

    render();

    window.alert(
      `Purchase simulated successfully!

You earned ${earned} reward coins.

Current Balance: ${balance} Coins`
    );
  });

  render();
});