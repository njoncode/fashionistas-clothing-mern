import React from 'react';

import  { CustomButtonContainer } from '../styles/customButton.styles';


const CustomButton = ({ children, ...props }) => {
    return (
    <CustomButtonContainer {...props}>{children}</CustomButtonContainer>
)
}
export default CustomButton;