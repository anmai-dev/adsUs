import React from 'react';
import './VideoItem.scss';

const VideoItem = ({ image, title }) => {
    return (
        <div className='videoItem'>
            <img src={image} alt={title} className='videoItemImage' />
            <h3 className='videoItemTitle'>{title}</h3>
        </div>
    );
}

export default VideoItem;