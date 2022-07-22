import {StyleSheet, Text, View, Button} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  CardField,
  useStripe,
  useConfirmPayment,
} from '@stripe/stripe-react-native';

const API_URL = 'https://hosdough-backend.herokuapp.com/stripe';
const fetchPaymentIntentClientSecret = async () => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    type: 'Standard Plan',
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  return fetch(`${API_URL}/create_payment_intent`, requestOptions)
    .then(response => response.text())
    .then(result => {
      // console.log(result);
      const yo = JSON.parse(result);
      return yo.data;
    })
    .catch(error => console.log('error', error));
};

const PaymentScreen = () => {
  const {confirmPayment, loading} = useConfirmPayment();

  const handlePayPress = async () => {
    const billingDetails = {
      email: 'jenny.rosen@example.com',
    };
    // Fetch the intent client secret from the backend.
    const clientSecret = await fetchPaymentIntentClientSecret();

    // Confirm the payment with the card details
    const {paymentIntent, error} = await confirmPayment(clientSecret, {
      paymentMethodType: 'Card',
      paymentMethodData: {
        billingDetails,
      },
    });

    if (error) {
      console.log('Payment confirmation error', error);
    } else if (paymentIntent) {
      console.log('Success from promise', paymentIntent);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        {/* Text Data */}
        <Text>{`Test Data
        
1)   4242424242424242	 => Succeeds and immediately processes the payment.


2)   4000002500003155  => 	Requires authentication. Stripe will trigger a modal asking for the customer to authenticate.


3)   4000000000009995	 => Always fails with a decline code of insufficient_funds.

        `}</Text>
        <CardField
          postalCodeEnabled={false}
          placeholders={{
            number: '4242 4242 4242 4242',
          }}
          cardStyle={{
            backgroundColor: '#FFFFFF',
            textColor: '#000000',
          }}
          style={{
            width: '100%',
            height: 50,
            marginVertical: 30,
          }}
          onCardChange={cardDetails => {
            console.log('cardDetails', cardDetails);
          }}
          onFocus={focusedField => {
            console.log('focusField', focusedField);
          }}
        />
      </View>
      <Button onPress={handlePayPress} title="Pay" disabled={loading} />
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {backgroundColor: 'skyblue', flex: 1, paddingHorizontal: '5%'},
});
