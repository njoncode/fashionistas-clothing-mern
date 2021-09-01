import cartConstants from "./cartConstants";

export const toggleCartHiddenAction = () => ({
    type: cartConstants.TOGGLE_CART_HIDDEN
})

export const addItemToCartAction = (item) => ({
    type: cartConstants.ADD_ITEM_TO_CART,
    payload: item
})


// Decrement item from cart
export const removeItemFromCartAction = (item) => ({
    type: cartConstants.CLEAR_ITEM_FROM_CART,
    payload: item
})


// Clear item from cart
export const clearItemFromCartAction = (item) => ({
    type: cartConstants.REMOVE_ITEM_FROM_CART,
    payload: item
})