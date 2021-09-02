import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
 import { createStructuredSelector } from 'reselect';

import '../styles/header.scss'

import {ReactComponent as Logo} from '../assets/crown.svg'
import { auth } from '../firebase/firebaseUtils';
import CartIcon from './CartIcon';
import CartDropdown from './CartDropdown';
import { selectCartHidden } from '../redux/cart/cartSelectors';
import { selectCurrentUser } from '../redux/user/userSelector';


const Header = ({ currentUser, hidden }) => (
   <div className='header'>
       <Link className='logo-container' to='/'>
           <Logo className='logo' />
       </Link>
    <div className='options'>
        <Link className='option' to='/shop'>SHOP</Link>
        <Link className='option' to='/contact'>CONTACT</Link>
        <CartIcon/>
        {
             currentUser ?
             <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
             :
             <Link className='option' to='/signin'>SIGN IN</Link>
        }
    </div>
    {hidden ? null : <CartDropdown />}
   </div>
)

const mapStatetoProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStatetoProps)(Header);



