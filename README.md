# LYVN Shopify Developer Intern Assignment

This repository contains my submission for the **Shopify Developer Intern Assignment** at **LYVN**.

The assignment focuses on building custom Shopify features using **Liquid, JavaScript, CSS, and Shopify's theme architecture** without relying on third-party Shopify apps.

---

## Live Demo

**Store Preview**
https://lyvn-assignment.myshopify.com

**Store Password**
<YOUR_STOREFRONT_PASSWORD>

### Pages

Returns & Exchange

https://lyvn-assignment.myshopify.com/pages/returns-exchange

Rewards

https://lyvn-assignment.myshopify.com/pages/rewards

---

# Assignment Tasks

## Task 1 – Returns & Exchange Flow

Implemented a dedicated Returns & Exchange page with interactive user flows.

### Features

- Separate Return and Exchange tabs
- Dynamic dropdown reasons based on selected flow
- Conditional messages for different return reasons
- Exchange recommendations for size-related issues
- Store credit message for "Changed my mind"
- Damaged product upload section
- Responsive layout
- Client-side validation
- JavaScript-powered interaction

---

## Task 2 – Rewards / Coins System

Built a simple rewards system without using any Shopify application.

### Features

- Earn **1 reward coin for every ₹10 spent**
- Reward balance stored using LocalStorage
- Coin redemption during purchase simulation
- Dynamic payable amount calculation
- Reward balance updates instantly
- Responsive user interface
- No third-party apps used

---

# Tech Stack

- Shopify Liquid
- JavaScript (ES6)
- CSS3
- HTML5
- LocalStorage

---

# Project Structure

```
assets/
├── lyvn-returns.css
├── lyvn-returns.js
├── lyvn-rewards.css
└── lyvn-rewards.js

sections/
├── lyvn-returns.liquid
└── lyvn-rewards.liquid

snippets/
└── reward-card.liquid

templates/
├── page.returns.json
└── page.rewards.json
```

---

# Implementation Approach

### Returns & Exchange

The Returns & Exchange page was built as a reusable Shopify section.

The interface dynamically changes available reasons based on whether the customer selects **Return** or **Exchange**. JavaScript is used to display contextual messages and handle conditional UI such as the damaged item upload section.

---

### Rewards System

The rewards system simulates customer reward points using browser LocalStorage.

Customers earn reward coins based on the purchase amount and can redeem available coins to reduce the payable amount. The implementation demonstrates how reward logic can be built without relying on Shopify apps or external services.

---

# Key Highlights

- Shopify theme architecture
- Modular Liquid sections
- Interactive JavaScript logic
- Responsive design
- Clean code structure
- No third-party apps
- LocalStorage simulation
- Performance-focused implementation

---

# How to Test

## Returns & Exchange

1. Open the Returns page.
2. Switch between Return and Exchange.
3. Select different reasons.
4. Observe conditional messages.
5. For "Damaged Item", verify the upload section appears.

---

## Rewards

1. Open the Rewards page.
2. Click **Simulate Purchase**.
3. Verify reward coins are earned.
4. Enable **Redeem Coins**.
5. Verify the payable amount updates correctly.
6. Refresh the page to verify reward balance persists using LocalStorage.

---

# Author

**Neelabh Shukla**

GitHub:
https://github.com/neelabhshukla018

LinkedIn:
https://www.linkedin.com/in/neelabh18shukla/

Email:
neelabhshukla79@gmail.com
