import React from 'react';
import '../styles/customButton.scss';

const CustomButton = ({ children, isGoogleSignIn, inverted, ...otherProps }) => {
    console.log(children, isGoogleSignIn, otherProps)
    return (
    <button className= {`${inverted ? 'inverted' : ''} ${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`} {...otherProps}>
        {children}
    </button>
)
}
export default CustomButton;