import styled from 'styled-components';
import { Link } from 'react-router-dom';

/**
 * To share styles that might be duplicated, we import in the specific css keyword.
 * And this allows us to write css blocks that we can just include into our styles & we will get that css almost like a shared function. 
 */


export const HeaderContainer = styled.div`
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;    
`;

// Styling the custom component - Link  using a styled-component
// Extending styled-components into component
export const LogoContainer = styled(Link)`
    height: 100%;
    width: 70px;
    padding: 25px;
`;

export const Options = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`; 

export const OptionLink = styled(Link)`
    padding: 10px 15px;
    cursor: pointer;
`;
