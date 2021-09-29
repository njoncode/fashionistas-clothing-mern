import React from 'react';
import { ReactComponent as ShoppingIcon } from '../assets/shoppingBag.svg';
import '../styles/cartIcon.scss';
import {connect} from 'react-redux';
import {toggleCartHiddenAction} from '../redux/cart/cart.actions'
import { selectCartItemsCount } from '../redux/cart/cart.selectors';
import { createStructuredSelector } from 'reselect';

const CartIcon = ({ toggleCartHidden, itemsCount }) => (

    <div className='cart-icon' onClick={() => toggleCartHidden()}>
        <ShoppingIcon className='shopping-icon' /> 
        <span className='item-count'>{itemsCount}</span>
    </div>
);

const mapStateToProps = createStructuredSelector({
    itemsCount: selectCartItemsCount
});

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHiddenAction())
})

export default connect(
    mapStateToProps, 
    mapDispatchToProps
    )(CartIcon);