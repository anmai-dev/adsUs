import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./PostPage.scss";
import axios from 'axios';

const PostPage = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("/api/post/");
                console.log(response.data); // Kiểm tra dữ liệu
                setPosts(response.data);
            } catch (error) {
                console.error("Lỗi khi tải bài viết:", error);
            }
        };

        fetchPosts();
    }, []);

    const handleOnClick = (post) => {
        navigate(`/post/${post._id}`, { state: { post } });
    };

    return (
        <div>
            {posts.map(post => (
                <div key={post._id} className="post" onClick={() => handleOnClick(post)}>
                    <img src={post.image} alt={post.title} />
                    <h2>{post.title}</h2>
                </div>
            ))}
        </div>
    );
};

export default PostPage;