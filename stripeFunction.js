const StripeFunction = async () => {
  const stripe = require('stripe')(
    'sk_test_51LNZqVB4V2Xg8qCicxX7aQbydifREaHjLR4d0j7Bu6CkSvduSWtnIKrC10qj70NwC1W7QNcqytltwRsd78K4iyEU00rN2ibuS8',
  );

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'usd',
  });
  const clientSecret = paymentIntent.client_secret;
  console.log('clientSecret', clientSecret);
};
StripeFunction();
