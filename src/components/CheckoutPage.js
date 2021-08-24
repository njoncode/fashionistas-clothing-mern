import React from 'react';
import { connect } from 'react-redux';
import '../styles/checkoutPage.scss';
import { createStructuredSelector } from 'reselect';
import { selectCartItems, selectCartTotal } from '../redux/cart/cartSelectors';
import { addItemToCartAction, clearItemFromCartAction, removeItemFromCartAction } from '../redux/cart/cartActions'

const CheckoutPage= ({ cartItems, cartItemsTotalPrice, addItemToCart, clearItemFromCart, removeItemFromCart }) => {
    console.log('😎 cartItems: ', cartItems)

    const handleReduceItemFromCart = (cartItem) => {
        if(cartItem.quantity > 1) {
            clearItemFromCart(cartItem)
        } else removeItemFromCart(cartItem)
    }

    return (
    <div>
        <table>

            <thead>
                    <tr>
                        <th>Product</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Remove</th>
                    </tr>
            </thead>

            <tbody>
                {cartItems.map(cartItem => (
                    <tr>
                        <td><img className='image' src={cartItem.imageUrl} alt='item'/></td>
                        <td>{cartItem.name}</td>
                        <td className='quantity'>
                            <span 
                                className='arrow-left' 
                                onClick={() => handleReduceItemFromCart(cartItem)}
                            >
                                &#10094;
                            </span>
                            <span>{cartItem.quantity}</span>
                            <span 
                                className='arrow-right'
                                onClick={() => addItemToCart(cartItem)}
                            >
                                &#10095;
                            </span>
                        </td>
                        <td>${cartItem.price}</td>
                        <td><button onClick={() => removeItemFromCart(cartItem)}>X</button></td>
                    </tr>
                    )
                )}
            </tbody>
        
            <tfoot>
                <tr>
                    <td colspan="5" className='total-price'><span className='price-content'>Total Price: </span>${cartItemsTotalPrice}</td>
                </tr>
            </tfoot>

        </table>
    </div>
)}

const mapDispatchToProps = dispatch => ({
    addItemToCart: item => dispatch(addItemToCartAction(item)),
    clearItemFromCart: item => dispatch(clearItemFromCartAction(item)),
    removeItemFromCart: item => dispatch(removeItemFromCartAction(item))
})

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    cartItemsTotalPrice: selectCartTotal
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);