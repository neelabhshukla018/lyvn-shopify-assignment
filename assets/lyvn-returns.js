document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("returnsForm");
  const tabs = document.querySelectorAll(".tab-btn");
  const reasonSelect = document.getElementById("returnReason");
  const statusMessage = document.getElementById("statusMessage");
  const damageUpload = document.getElementById("damageUpload");

  const reasons = {
    exchange: [
      { value: "small", text: "Size too small" },
      { value: "large", text: "Size too large" },
      { value: "fit", text: "Fit not as expected" }
    ],
    return: [
      { value: "mind", text: "Changed my mind" },
      { value: "mistake", text: "Ordered by mistake" },
      { value: "expected", text: "Product not as expected" },
      { value: "damaged", text: "Damaged item" }
    ]
  };

  const messages = {
    small: {
      title: "Exchange Recommended",
      body: "Your selected size appears to be too small. We recommend requesting the next available size."
    },
    large: {
      title: "Exchange Recommended",
      body: "We recommend exchanging the product for a smaller size."
    },
    fit: {
      title: "Exchange Available",
      body: "We'll help you find a size that fits you better."
    },
    mind: {
      title: "Store Credit",
      body: "Returns for this reason are eligible for store credit."
    },
    mistake: {
      title: "Return Accepted",
      body: "Your request will be reviewed before approval."
    },
    expected: {
      title: "Additional Information",
      body: "Please describe what was different from your expectations."
    },
    damaged: {
      title: "Damaged Product",
      body: "Upload clear images of the damaged product so our team can review your request.",
      upload: true
    }
  };

  let activeTab = "exchange";

  function populateReasons(type) {
    reasonSelect.innerHTML = '<option value="">Choose a reason</option>';

    reasons[type].forEach(({ value, text }) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = text;
      reasonSelect.appendChild(option);
    });

    statusMessage.innerHTML = "Please choose a reason to continue.";
    damageUpload.classList.add("hidden");
  }

  function updateMessage(reason) {
    const info = messages[reason];

    damageUpload.classList.add("hidden");

    if (!info) {
      statusMessage.innerHTML = "Please choose a reason to continue.";
      return;
    }

    statusMessage.innerHTML = `
      <strong>${info.title}</strong>
      <p>${info.body}</p>
    `;

    if (info.upload) {
      damageUpload.classList.remove("hidden");
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(button => {
        button.classList.remove("active");
        button.setAttribute("aria-pressed", "false");
      });

      tab.classList.add("active");
      tab.setAttribute("aria-pressed", "true");

      activeTab = tab.dataset.type;
      populateReasons(activeTab);
    });
  });

  reasonSelect.addEventListener("change", event => {
    updateMessage(event.target.value);
  });

  // ⭐ Prevent page refresh and simulate request submission
  form.addEventListener("submit", event => {
    event.preventDefault();

    if (!reasonSelect.value) {
      alert("Please select a reason first.");
      return;
    }

    statusMessage.innerHTML = `
      <div style="padding:16px;background:#dcfce7;border:1px solid #16a34a;border-radius:8px;color:#166534;">
        <strong>✅ Request Submitted Successfully</strong>
        <p>Your ${activeTab} request has been received. Our support team will contact you within 24 hours.</p>
      </div>
    `;

    form.reset();
    damageUpload.classList.add("hidden");
  });

  populateReasons(activeTab);
});