const dotenv = require('dotenv');
dotenv.config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
console.log("stripe Key",stripe)

if (!process.env.STRIPE_SECRET_KEY) {
  console.error('STRIPE_SECRET_KEY is not set in environment variables');
} else {
  console.log('Stripe key loaded successfully');
}

module.exports = stripe;
