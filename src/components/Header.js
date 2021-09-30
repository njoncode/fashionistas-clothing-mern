import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { HeaderContainer, LogoContainer, Options, OptionLink } from '../styles/header.styles';

import {ReactComponent as Logo} from '../assets/crown.svg'
import { auth } from '../firebase/firebaseUtils';
import CartIcon from './CartIcon';
import CartDropdown from './CartDropdown';
import { selectCartHidden } from '../redux/cart/cart.selectors';
import { selectCurrentUser } from '../redux/user/userSelector';
import { signOutStartAction } from '../redux/user/user.actions';


const Header = ({ currentUser, hidden, signOutStartDispatch }) => (

   <HeaderContainer>
       <LogoContainer to='/'>
           <Logo className='logo' />
       </LogoContainer>
    <Options>
        <OptionLink className='option' to='/shop'>SHOP</OptionLink>
        <OptionLink className='option' to='/contact'>CONTACT</OptionLink>
        <CartIcon/>
        {
             currentUser ?
             <OptionLink as='div' onClick={signOutStartDispatch}>SIGN OUT</OptionLink>
             :
             <OptionLink className='option' to='/signin'>SIGN IN</OptionLink>
        }
    </Options>
    {hidden ? null : <CartDropdown />}
   </HeaderContainer>
)

const mapStatetoProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})


const mapDispatchToProps = dispatch => ({
    signOutStartDispatch: () => dispatch(signOutStartAction())
})
export default connect(mapStatetoProps, mapDispatchToProps)(Header);



