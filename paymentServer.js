const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

const stripe = require('stripe')('sk_test_51HdlDPCE2YsnFpa1c9SDrEcVDDpQbKwnEYdiV9PKXElpXW5b1rkdGBpH6A1RX6Qj9aHzCyWLF9tYBGlZxjZSaeUS00O99y0edf')

const paymentIntent = stripe.paymentIntents.create({
  amount: 1099,
  currency: 'usd',
  metadata: { integration_check: 'accept_a_payment' },
})

app.get('/secret', async (req, res) => {
  const intent = await paymentIntent
  res.json({ client_secret: intent.client_secret })
});

app.listen(4000, () => {
  console.log('Running on port 4000');
})
