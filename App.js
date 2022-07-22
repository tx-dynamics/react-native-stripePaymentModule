import {StyleSheet, Text, View, Button, Alert} from 'react-native';
import React from 'react';
import {StripeProvider} from '@stripe/stripe-react-native';
import PaymentScreen from './PaymentScreen';

const publishable_Key =
  'pk_test_51LNZqVB4V2Xg8qCiEBroGh3IjmI7VcQFftYUW5Jx8lKRVEsFUsClNc2smqrUi16p7oQHBA9Q2Di8l91bPvOKSn1900ocJ1hyVI';
const App = () => {
  return (
    <StripeProvider publishableKey={publishable_Key}>
      <View style={{flex: 1, backgroundColor: 'White'}}>
        <PaymentScreen />
      </View>
    </StripeProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
