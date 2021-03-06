import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import '../styles/checkoutPage.scss';

import { selectCartItems, selectCartTotal } from '../redux/cart/cart.selectors';
import { addItemToCartAction, clearItemFromCartAction, removeItemFromCartAction } from '../redux/cart/cart.actions'

import CheckoutItem from './CheckoutItem';
import StripeCheckoutButton from '../components/stripeButton/StripeCheckoutButton';

const CheckoutPage= ({ cartItems, total, addItemToCart, clearItemFromCart, removeItemFromCart }) => {
    console.log('😎 cartItems: ', cartItems)

    const handleReduceItemFromCart = (cartItem) => {
        if(cartItem.quantity > 1) {
            clearItemFromCart(cartItem)
        } else removeItemFromCart(cartItem)
    }

    return (
    <div className='checkout-page'>
        <div className='checkout-header'>
            <div className='header-block'>
                <span>Product</span>
            </div>
            <div className='header-block'>
                <span>Description</span>
            </div>
            <div className='header-block'>
                <span>Quantity</span>
            </div>
            <div className='header-block'>
                <span>Price</span>
            </div>
            <div className='header-block'>
                <span>Remove</span>
            </div>
        </div>
        {cartItems.map(cartItem => (
            <CheckoutItem key={cartItem.id} cartItem={cartItem} />
        ))}
        <div className='total'>TOTAL: ${total}</div>
        <div className='test-warning'>
            *Please use the following test credit card for payments*
            <br/>
            4242 4242 4242 4242 - Exp: 01/20 - CVV: 123
        </div>
        <StripeCheckoutButton price={total}/>
    </div>
)}

const mapDispatchToProps = dispatch => ({
    addItemToCart: item => dispatch(addItemToCartAction(item)),
    clearItemFromCart: item => dispatch(clearItemFromCartAction(item)),
    removeItemFromCart: item => dispatch(removeItemFromCartAction(item))
})

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);