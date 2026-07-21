document.addEventListener("DOMContentLoaded", () => {
  const rewardsSection = document.getElementById("lyvnRewards");
  const earnedCoinsElement = document.getElementById("earnedCoins");
  const availableCoinsElement = document.getElementById("availableCoins");
  const originalTotalElement = document.getElementById("originalTotal");
  const finalTotalElement = document.getElementById("finalTotal");
  const redeemCheckbox = document.getElementById("redeemCoins");
  const discountNote = document.getElementById("discountInfo");
  const purchaseButton = document.getElementById("earnCoinsBtn");

  // Make sure all required elements exist
  if (
    !rewardsSection ||
    !earnedCoinsElement ||
    !availableCoinsElement ||
    !originalTotalElement ||
    !finalTotalElement ||
    !redeemCheckbox ||
    !discountNote ||
    !purchaseButton
  ) {
    console.error("LYVN Rewards: Required elements not found.");
    return;
  }

  const STORAGE_KEY = "lyvnCoins";

  // 1 coin earned for every ₹10 spent
  const COIN_RATE = 10;

  // 10 coins = ₹1 discount
  const REDEMPTION_RATE = 10;

  // Get raw product price from Liquid data attribute
  const price = Number(rewardsSection.dataset.price) || 0;

  function getBalance() {
    return Number(localStorage.getItem(STORAGE_KEY)) || 0;
  }

  function saveBalance(balance) {
    localStorage.setItem(STORAGE_KEY, balance);
  }

  function calculateEarnedCoins(productPrice) {
    return Math.floor(productPrice / COIN_RATE);
  }

  function formatCurrency(value) {
    return `₹${value.toFixed(2)}`;
  }

  function render() {
    const balance = getBalance();
    const earned = calculateEarnedCoins(price);

    // Update reward information
    earnedCoinsElement.textContent = `${earned} Coins`;
    availableCoinsElement.textContent = `${balance} Coins`;

    // Default payable amount
    let payable = price;

    // Apply reward discount if selected
    if (redeemCheckbox.checked && balance > 0) {
      const discount = Math.min(
        balance / REDEMPTION_RATE,
        price
      );

      payable = price - discount;

      discountNote.innerHTML = `
        <strong>Reward Applied</strong>
        <p>
          You saved ${formatCurrency(discount)}
          using your reward coins.
        </p>
      `;
    } else {
      discountNote.textContent =
        "Redeem your available reward coins for an instant discount.";
    }

    // Update final payable amount
    finalTotalElement.textContent = formatCurrency(payable);
  }

  // Recalculate when redeem checkbox changes
  redeemCheckbox.addEventListener("change", render);

  // Simulate successful purchase
  purchaseButton.addEventListener("click", () => {
    let balance = getBalance();

    // Redeem existing coins if selected
    if (redeemCheckbox.checked && balance > 0) {
      const discount = Math.min(
        balance / REDEMPTION_RATE,
        price
      );

      const redeemedCoins = Math.floor(
        discount * REDEMPTION_RATE
      );

      balance -= redeemedCoins;
    }

    // Earn new coins from current purchase
    const earned = calculateEarnedCoins(price);

    balance += earned;

    // Save updated balance
    saveBalance(balance);

    // Uncheck redemption after purchase
    redeemCheckbox.checked = false;

    // Refresh UI
    render();

    window.alert(
      `Purchase simulated successfully!

You earned ${earned} reward coins.

Current Balance: ${balance} Coins`
    );
  });

  // Initial render
  render();
});