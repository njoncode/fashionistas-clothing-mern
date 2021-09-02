export const addItemToCart = (cartItems, cartItemToAdd) => {
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
        // Check if the cartItem to be removed (cartItemToRemove) is in the cartItems
        const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id)
        
        if(existingCartItem.quantity === 1 ) {
            return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
        }
    
        return cartItems.map(cartItem => 
            cartItem.id === cartItemToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
    };



