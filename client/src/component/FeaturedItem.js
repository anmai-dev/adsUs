import React from 'react';
import './FeaturedItem.scss';

const FeaturedItem = ({ image, title }) => {
    return (
        <div className='featuredItem'>
            <img src={image} alt={title} className='featuredItemImage' />
            <h3 className='featuredItemTitle'>{title}</h3>

        </div>
    );
}

export default FeaturedItem;