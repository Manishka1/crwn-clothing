import React from 'react';

import CustomButtons from '../custom-button/custom-button.component';

import './cart-dropdown.styles.scss';

const CartDropdown = () => (
    <div className='cart-dropdown'>
        <div className='cart-items' />
        <CustomButtons>GO TO CHECKOUT</CustomButtons>
    </div>
);

export default CartDropdown;
