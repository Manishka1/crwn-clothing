import React from 'react';
import { Link } from 'react-router-dom';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import { connect } from 'react-redux';  
import { signOutUser } from '../../firebase/firebase.utils';  // Import the signOutUser function
import { setCurrentUser } from '../../redux/user/user.actions';  // Import the action to update Redux state

import './header.styles.scss';

const Header = ({ currentUser, setCurrentUser, hidden }) => {
    const handleSignOut = () => {
        signOutUser()  // Call the sign-out function from firebase.utils
            .then(() => {
                setCurrentUser(null);  // Update Redux state after sign-out
            });
    };

    return (
        <div className='header'>
            <Link className='logo-container' to='/'>
                <Logo className='logo' />
            </Link>
            <div className='options'>
                <Link className='option' to='/shop'>
                    SHOP
                </Link>
                <Link className='option' to='/shop'>
                    CONTACT
                </Link>
                {
                    currentUser ? (
                    <div className='option' onClick={handleSignOut}>
                        SIGN OUT
                    </div>
                    ) : (
                    <Link className='option' to='/signin'>
                        SIGN IN
                    </Link>
                    )
                }
                <CartIcon />
            </div>
            
            {hidden ? null : <CartDropdown />}
        </div>
    );
};

const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
    currentUser,
    hidden
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))  
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
