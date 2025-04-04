import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ListPost.scss';
import { getAllPost, deletePost } from '../redux/apiRequest';

const ListPost = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);
    const dispatch = useDispatch();
    const postList = useSelector((state) => state.Post.getAllPost?.currentPost);

    useEffect(() => {
        if (postList) {
            setPosts(postList);
        }
    }, [postList]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setIsLoading(true);
                await getAllPost(dispatch);
            } catch (error) {
                console.log("Lỗi khi lấy dữ liệu bài báo:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPosts();
    }, [dispatch]);

    const handleDelete = async (id) => {
        try {
            setDeletingId(id);
            await deletePost(id, dispatch);
        } catch (error) {
            console.log("Lỗi khi xóa bài viết:", error);
        } finally {
            setDeletingId(null);
        }
    }

    if (isLoading) {
        return (
            <div className="list-post">
                <div className="loading-spinner large"></div>
            </div>
        );
    }

    return (
        <div className="list-post">
            {deletingId && (
                <div className="loading-overlay">
                    <div className="loading-spinner large"></div>
                </div>
            )}
            
            <div className="page-header">
                <h2>Danh sách bài viết</h2>
                <div className="header-actions">
                    <div className="search-box">
                        <i className="fas fa-search"></i>
                        <input type="text" placeholder="Tìm kiếm bài viết..." />
                    </div>
                    <select className="status-filter">
                        <option value="">Tất cả trạng thái</option>
                        <option value="published">Đã xuất bản</option>
                        <option value="draft">Bản nháp</option>
                    </select>
                </div>
            </div>

            <div className="post-table">
                <table>
                    <thead>
                        <tr>
                            <th>Tiêu đề</th>
                            <th>Ngày tạo</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts && posts.length > 0 ? (
                            posts.map(post => (
                                <tr key={post._id}>
                                    <td>
                                        <div className="post-title">
                                            <img 
                                                src={post.image || "https://picsum.photos/300/200"} 
                                                alt={post.title} 
                                            />
                                            <div>
                                                <h3>{post.title}</h3>
                                                <p>{post.content?.substring(0, 100)}...</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <span className={`status-badge ${post.status || 'draft'}`}>
                                            {post.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="edit-btn">
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button 
                                                className="delete-btn"
                                                onClick={() => handleDelete(post._id)}
                                                disabled={deletingId !== null}
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>
                                    Không có bài viết nào
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="pagination">
                <button className="page-btn" disabled>
                    <i className="fas fa-chevron-left"></i>
                </button>
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn">3</button>
                <button className="page-btn">
                    <i className="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>
    );
};

export default ListPost;
