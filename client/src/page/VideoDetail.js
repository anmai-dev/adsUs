import React from 'react';
import { useLocation } from 'react-router-dom';
import VideoDetailComponent from '../component/video/VideoDetail';
import './VideoDetail.scss';

const VideoDetail = () => {
    const location = useLocation();
    
    return (
        <div className="video-detail-page">
            <VideoDetailComponent />
        </div>
    );
};

export default VideoDetail; 