import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Videos.scss";
import { getAllVideo } from '../redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';

const Videos = () => {
    const dispatch = useDispatch();
    const video = useSelector((state) => state.Video.getAllVideo?.currentVideo); // video là mảng
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                await getAllVideo(dispatch);
                console.log("Dữ liệu video từ Redux:", video);
            } catch (error) {
                console.log("Lỗi khi tải Video", error);
            }
        };
        fetchVideo();
    }, [dispatch]);

    const handleOnClick = (item) => {
        navigate(`/video/${item._id}`, { state: { video: item } });
    };

    return (
        <div className='videosContainer'>
            <div className="container">
                <h1>Recommended Movies</h1>
                <div className="movie-section">
                    {video && video.length > 0 ? (
                        video.map((item) => (
                            <div key={item._id} className="movie" onClick={() => handleOnClick(item)}>
                                <span className="status">Hoàn Tất (16/16)</span>
                                <img src={item.thumbnail} alt={item.title} />
                                <h2>{item.title}</h2>
                            </div>
                        ))
                    ) : (
                        <p>Loading video...</p>
                    )}
                </div>

               

                <Link to="/all-movies" className="view-all">View all</Link>
            </div>
        </div>
    );
};

export default Videos;