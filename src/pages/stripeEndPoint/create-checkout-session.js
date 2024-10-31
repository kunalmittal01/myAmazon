
const express = require('express');
const app = express();
const stripe = require('stripe')(import.meta.env.VITE_STRIPE_SECRET_KEY); 
app.use(express.json());
app.use(cors()); 
app.use(express.json());
app.post('/create-checkout-session', async (req, res) => {
  const { items, total, email } = req.body; // Get the amount from the request body (in the smallest unit, e.g., cents)
  console.log(items);
  
  const newItems = items.map(item => {
    return {
      description: item.description,
      quantity: 1,
      price_data: {
        currency: 'usd',
        unit_amount: item.price*100,
        product_data: {
          name: item.title,
          images: [(item.images && item.images[0]) || item.image]
        }
      }
    }
  })
  try {
    const paymentIntent = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      shipping_address_collection: {allowed_countries: ['GB,US','CA']},
      line_items: newItems,
      mode: 'payment',
      success_url: `${import.meta.env.VITE_HOST}/success`,
      cancel_url: `${import.meta.env.VITE_HOST}/cart`,
      currency: 'usd', 
      amount: total,
      metadata: {
        email: email,
        images: JSON.stringify(items.map(item=>item.image||item.images[0]))
      }
    });
    res.status(200).json({id: paymentIntent.id})
    // res.send({
    //   clientSecret: paymentIntent.client_secret,
    // });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.listen(5000, () => console.log('Server is running on port 5000'));