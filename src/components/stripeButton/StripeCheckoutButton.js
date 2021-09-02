import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price  }) => {

    // In order for a proper charge to be made, Strip want the price in cents.

    // Converting price in dollar  into cents
    const priceForStripe = price * 100;
    
    const publishableKey = 'pk_test_51JUnSASADYaaUjYOZe1avagk8Qnnh5PAmHDGT6ddWNy2PdQKdRPKcvnOFwykV4zNxWNnWfLxE4ANMa4bWnq5acj000GQnGd34v'

    const onToken = token => {
        console.log('token: ', token);
        alert('Payment Successful!');
    }

    return (
        <StripeCheckout 
            label='Pay Now'
            name='Faashionistas Clothing'
            billingAddrrss
            shippingAddress
            image='https://svgshare.com/i/CUz.svg' 
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLable='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;
