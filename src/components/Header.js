import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
 import { createStructuredSelector } from 'reselect';

 import { HeaderContainer, LogoContainer, Options, OptionLink, OptionDiv } from '../styles/header.styles';
import '../styles/header.scss'

import {ReactComponent as Logo} from '../assets/crown.svg'
import { auth } from '../firebase/firebaseUtils';
import CartIcon from './CartIcon';
import CartDropdown from './CartDropdown';
import { selectCartHidden } from '../redux/cart/cartSelectors';
import { selectCurrentUser } from '../redux/user/userSelector';


const Header = ({ currentUser, hidden }) => (
   <HeaderContainer>
       <LogoContainer to='/'>
           <Logo className='logo' />
       </LogoContainer>
    <Options>
        <OptionLink className='option' to='/shop'>SHOP</OptionLink>
        <Link className='option' to='/contact'>CONTACT</Link>
        <CartIcon/>
        {
             currentUser ?
             <OptionDiv onClick={() => auth.signOut()}>SIGN OUT</OptionDiv>
             :
             <Link className='option' to='/signin'>SIGN IN</Link>
        }
    </Options>
    {hidden ? null : <CartDropdown />}
   </HeaderContainer>
)

const mapStatetoProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStatetoProps)(Header);



