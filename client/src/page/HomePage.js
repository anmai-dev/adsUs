import React, { useEffect, useState } from 'react';
import './HomePage.scss';
import PostPage from './PostPage';
import Schedule from './Schedule';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Base64 encoded placeholder image
const THUMBNAIL_PLACEHOLDER = 'data:image/png;base64,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';

const HomePage = () => {
    const [highlightVideos, setHighlightVideos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Lấy danh sách video highlight
        const fetchHighlightVideos = async () => {
            try {
                const response = await axios.get("/api/video");
                console.log("Highlight videos:", response.data);
                setHighlightVideos(response.data.slice(0, 5)); // Chỉ lấy 5 video đầu tiên
            } catch (error) {
                console.error("Lỗi khi tải video highlight:", error);
            }
        };

        fetchHighlightVideos();
    }, []);

    const handleViewVideo = (video) => {
        navigate('/video-detail', { state: { video } });
    };

    return (
        <div className="homePage">
            <div className="mainContent">
                <section className="scheduleSection">
                    <Schedule />
                </section>
                <section className="contentSection">
                    <div className="postsContainer">
                        <div className="sectionTitle">Tin tức mới nhất</div>
                        <PostPage />
                    </div>
                    <div className="videoHighlights">
                        <div className="sectionTitle">Video Highlights</div>
                        <div className="videoList">
                            {highlightVideos.length > 0 ? (
                                highlightVideos.map((video) => (
                                    <div key={video._id} className="videoItem" onClick={() => handleViewVideo(video)}>
                                        <img 
                                            src={video.thumbnail || THUMBNAIL_PLACEHOLDER} 
                                            alt={video.title}
                                            className="thumbnail"
                                            onError={(e) => {
                                                e.target.src = THUMBNAIL_PLACEHOLDER;
                                                e.target.onError = null;
                                            }}
                                        />
                                        <h3>{video.title}</h3>
                                    </div>
                                ))
                            ) : (
                                <div className="no-videos">
                                    <p>Không có video highlight.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HomePage;