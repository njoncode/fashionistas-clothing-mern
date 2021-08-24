import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectCartItems } from '../redux/cart/cartSelectors'
import { toggleCartHiddenAction } from '../redux/cart/cartActions';
import CustomButton from './CustomButton';
import '../styles/cartDropdown.scss';
import CartItem from './CartItem';
import { createStructuredSelector } from 'reselect';

const CartDropdown = ({ cartItems, history, dispatch }) => {
    // connect passes dispatch into our components as a prop by default if we do not supply mapDispatchToProps as a second parameter to connect.
    return (
        <div className='cart-dropdown'>
            <div className='cart-items'>
                {cartItems.length 
                ? (cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem} />))
                : (<span className='empty-message'>Your cart is empty.</span>)
                }
            </div>
            <CustomButton onClick={ () => {
                history.push('/checkout') 
                dispatch(toggleCartHiddenAction())
            }}
            >
                GO TO CHECKOUT
            </CustomButton>
        </div>
)}

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
});

export default withRouter(connect(mapStateToProps)(CartDropdown));