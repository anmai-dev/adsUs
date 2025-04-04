import React, { useEffect, useState } from 'react';
import './ListVideo.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideo, deleteVideo } from '../redux/apiRequest';

const ListVideo = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const [editingVideo, setEditingVideo] = useState(null);
    const videos = useSelector((state) => state.Video.getAllVideo?.currentVideo) || [];
    const token = useSelector((state) => state.auth.login?.currentUser);

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                await getAllVideo(dispatch);
            } catch (error) {
                console.log("Lỗi khi tải Video", error);
                setError('Có lỗi xảy ra khi tải danh sách video');
            }
        };
        fetchVideo();
    }, [dispatch]);

    const handleEdit = (video) => {
        setEditingVideo(video);
    };

    const handleSave = (id) => {
        setEditingVideo(null);
        // Tại đây sẽ thêm logic lưu thay đổi sau
    };

    const handleDelete = async (id) => {
        await deleteVideo(id, token?.accessToken,dispatch)
        await getAllVideo(dispatch); // Cập nhật danh sách trận đấu
    };

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="list-video-container">
            <div className="header">
                <h2>Quản lý Video</h2>
                <button className="admin-button primary">
                    <i className="fas fa-plus"></i>
                    Thêm Video Mới
                </button>
            </div>

            <div className="video-list">
                {videos.map((video) => (
                    <div key={video._id} className="video-item">
                        <div className="video-thumbnail">
                            <img 
                                src={video.thumbnail || "https://via.placeholder.com/300x200"} 
                                alt={video.title} 
                            />
                            <div className="play-button">
                                <i className="fas fa-play"></i>
                            </div>
                        </div>
                        <div className="video-info">
                            {editingVideo && editingVideo._id === video._id ? (
                                <div className="edit-form">
                                    <input
                                        type="text"
                                        value={editingVideo.title}
                                        onChange={(e) => setEditingVideo({
                                            ...editingVideo,
                                            title: e.target.value
                                        })}
                                        placeholder="Nhập tiêu đề video"
                                    />
                                    <div className="edit-actions">
                                        <button onClick={() => handleSave(video._id)} className="admin-button edit">
                                            <i className="fas fa-save"></i>
                                            Lưu
                                        </button>
                                        <button onClick={() => setEditingVideo(null)} className="admin-button delete">
                                            <i className="fas fa-times"></i>
                                            Hủy
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <h3>{video.title}</h3>
                                    <div className="video-meta">
                                        <span>
                                            <i className="fas fa-eye"></i>
                                            {video.views || 0} lượt xem
                                        </span>
                                        <span>
                                            <i className="fas fa-calendar"></i>
                                            {new Date(video.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="video-actions">
                                        <button onClick={() => handleEdit(video)} className="admin-button edit">
                                            <i className="fas fa-edit"></i>
                                            Sửa
                                        </button>
                                        <button onClick={() => handleDelete(video._id)} className="admin-button delete">
                                            <i className="fas fa-trash"></i>
                                            Xóa
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListVideo;