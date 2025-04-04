import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import "./PostDetail.scss";

const PostDetail = () => {
    const location = useLocation();
    const { post } = location.state;

    useEffect(() => {
        // Tạo một thẻ <div> tạm thời để phân tích nội dung bài viết
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = post.content;

        // Lấy tất cả các thẻ <script> từ nội dung bài viết
        const scripts = tempDiv.getElementsByTagName('script');
        const addedScripts = [];

        // Thêm từng script vào DOM
        for (let script of scripts) {
            const newScript = document.createElement('script');
            newScript.type = 'text/javascript';
            if (script.src) {
                newScript.src = script.src;
            } else {
                newScript.text = script.textContent;
            }
            document.body.appendChild(newScript);
            addedScripts.push(newScript); // Lưu lại các script đã thêm
        }

        // Dọn dẹp script khi component unmount
        return () => {
            for (let script of addedScripts) {
                if (script.parentNode) { // Kiểm tra xem script có còn trong DOM không
                    document.body.removeChild(script);
                }
            }
        };
    }, [post.content]);

    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <div className="postDetail">
            {/* <img src={post.image} alt={post.title} /> */}
            <h2>{post.title}</h2>
            <ReactMarkdown
                    children={post.content}
                    remarkPlugins={[remarkGfm]} // Chạy GFM để hỗ trợ cú pháp Markdown mở rộng
                    rehypePlugins={[rehypeRaw]} // Cho phép sử dụng các thẻ HTML trong markdown
                />
        </div>
    );
};

export default PostDetail;