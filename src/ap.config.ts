export const STRIPE_CONFIG = {
  CODE_KEY:
    "sk_test_51HA579JUFVcFDpYODB3St4e8mj8O9Z6rIKhS7oKD92EU4ZBOFAF6HPEifa8iKS9njYkYcOX7v76oO5vJdBrU7lzF00Nc91MMhD",
  CURRENCY: "USD",
  SUCCESS_URL:
    "http://localhost:5173/orders/payment-success?session_id={CHECKOUT_SESSION_ID}",
  CANCEL_URL: "http://localhost:5173/orders/payment-failure",
};

//module.exports = { STRIPE_CONFIG };
