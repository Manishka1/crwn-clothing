import React from "react";
import { Link } from "react-router-dom";
import './menu-item.styles.scss';

const MenuItem = ({ title, imageUrl, size, linkUrl }) => (
  <div className={`${size} menu-item`}>
    <Link to={linkUrl} className='menu-item-link'>
      <div className='background-image' 
           style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className='content'>
        <h1 className='title'>{title.toUpperCase()}</h1>
        <span className='subtitle'>SHOP NOW</span>
      </div>
    </Link>
  </div>
);

export default MenuItem;