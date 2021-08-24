export const addItemToCart = (cartItems, cartItemToAdd) => {
    // console.log('cartItems: ', cartItems)
    // console.log('cartItemToAdd: ', cartItemToAdd)
    const existingCartItem = cartItems.filter(item => item.name === cartItemToAdd.name)
    console.log('existing is: ', existingCartItem)
    if(existingCartItem.length){
        return cartItems.map(cartItem => 
            cartItem.name === cartItemToAdd.name 
            ? ({ ...cartItem,
                quantity: cartItem.quantity + 1
               })
            : cartItem
        ) 
    }
  
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }]
};


export const clearItemFromCart = (cartItems, cartItemToRemove) => {
    return cartItems.filter(cartItem => cartItem.name !== cartItemToRemove.name)
}


export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    return cartItems.map(cartItem => {
        if(cartItem.name === cartItemToRemove.name) {
            return ({
                ...cartItem,
                quantity: cartItem.quantity - 1
            }) 
        } else return cartItem
    })
}



