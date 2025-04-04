import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import ReactMde from 'react-mde';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import 'react-mde/lib/styles/css/react-mde-all.css';
import './PostManagement.scss';
import { creatNewPost } from "../redux/apiRequest";

const PostManagement = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageTitle, setImageTitle] = useState('');
    const [selectedTab, setSelectedTab] = useState('write');
    const [adCode, setAdCode] = useState('');
    const [adList, setAdList] = useState([]);
    const [selectedAd, setSelectedAd] = useState('');
    const [cursorPosition, setCursorPosition] = useState(0);
    const [isCreating, setIsCreating] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Lấy accessToken từ Redux store
    const user = useSelector((state) => state.auth.login.currentUser);
    const accessToken = user?.accessToken;

    const handleContentChange = (value) => {
        setContent(value);
    };

    const handleSelect = (e) => {
        setCursorPosition(e.target.selectionStart);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageTitle(file); 
            console.log("File đã chọn:", file.name, "kích thước:", file.size, "loại:", file.type);
        } else {
            setImageTitle(null);
        }
    };

    const handleAddPost = async () => {
        if (!title || !content || !imageTitle) {
            alert("Vui lòng điền đầy đủ thông tin.");
            return;
        }
        
        if (!accessToken) {
            alert("Bạn cần đăng nhập để thêm bài viết.");
            navigate('/login');
            return;
        }

        try {
            setIsCreating(true);
            setError(null);
            
            // Tạo FormData mới để đảm bảo không có dữ liệu cũ
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            
            // Đảm bảo file được gắn đúng cách
            if (typeof imageTitle === 'object' && imageTitle instanceof File) {
                formData.append('imageTitle', imageTitle, imageTitle.name);
                console.log("File đã được thêm:", imageTitle.name, "kích thước:", imageTitle.size);
            } else {
                setError("Lỗi: File hình ảnh không hợp lệ. Vui lòng chọn lại.");
                setIsCreating(false);
                return;
            }
            
            await creatNewPost(formData, dispatch, accessToken);
            setTitle('');
            setContent('');
            setImageTitle('');
            alert("Tạo bài viết thành công!");
            navigate('/admin/list-posts');
        } catch (error) {
            console.error("Lỗi khi thêm bài viết:", error);
            setError(`Có lỗi xảy ra khi thêm bài viết: ${error.response?.data?.message || error.message}`);
            alert("Có lỗi xảy ra khi thêm bài viết. Vui lòng thử lại.");
        } finally {
            setIsCreating(false);
        }
    };

    const handleAddAd = () => {
        if (adCode) {
            setAdList([...adList, adCode]);
            setAdCode('');
        } else {
            alert("Vui lòng nhập mã quảng cáo.");
        }
    };

    const handleInsertAd = () => {
        if (selectedAd) {
            const newContent = content.slice(0, cursorPosition) + selectedAd + "\n" + content.slice(cursorPosition);
            setContent(newContent);
        } else {
            alert("Vui lòng chọn một mã quảng cáo và đặt con trỏ vào vị trí mong muốn.");
        }
    };

    useEffect(() => {
        adList.forEach(ad => {
            if (content.includes(ad)) {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = ad;
                const scripts = tempDiv.getElementsByTagName('script');
                for (let script of scripts) {
                    const newScript = document.createElement('script');
                    newScript.type = 'text/javascript';
                    if (script.src) {
                        newScript.src = script.src;
                    } else {
                        newScript.text = script.textContent;
                    }
                    document.body.appendChild(newScript);
                }
            }
        });
    }, [content, adList]);

    // Cấu hình cho ReactMde
    const loadSuggestions = async (text) => {
        return [];
    };

    // Tạo preview với hỗ trợ hình ảnh
    const generateMarkdownPreview = async (markdown) => {
        try {
            return (
                <div className="markdown-preview">
                    <ReactMarkdown
                        children={markdown}
                        remarkPlugins={[remarkGfm]} // Chạy GFM để hỗ trợ cú pháp Markdown mở rộng
                        rehypePlugins={[rehypeRaw]} // Cho phép sử dụng các thẻ HTML trong markdown
                    />
                </div>
            );
        } catch (error) {
            console.error("Error in markdown preview:", error);
            return <div className="markdown-preview">Error rendering preview: {error.message}</div>;
        }
    };

    return (
        <div className="postManagement">
            {isCreating && (
                <div className="loading-overlay">
                    <div className="loading-spinner large"></div>
                </div>
            )}
            
            <div className="page-header">
                <h2>Quản lý bài viết</h2>
                <button 
                    className="admin-button primary" 
                    onClick={() => navigate('/admin/list-posts')}
                >
                    <i className="fas fa-list"></i>
                    <span>Xem danh sách bài viết</span>
                </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="form">
                <div className="post-section">
                    <input
                        type="text"
                        placeholder="Tiêu đề"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <div className="file-input">
                        <label>Hình ảnh bài viết:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                        {imageTitle && <span className="file-selected">Đã chọn: {typeof imageTitle === 'object' ? imageTitle.name : 'File đã tải lên'}</span>}
                    </div>
                    <ReactMde
                        value={content}
                        onChange={handleContentChange}
                        selectedTab={selectedTab}
                        onTabChange={setSelectedTab}
                        generateMarkdownPreview={generateMarkdownPreview}
                        loadSuggestions={loadSuggestions}
                        childProps={{
                            writeButton: {
                                tabIndex: -1
                            }
                        }}
                        textAreaProps={{
                            onSelect: handleSelect,
                            placeholder: "Viết nội dung bài viết ở đây... \nĐể chèn ảnh, sử dụng cú pháp: ![mô tả](link ảnh)"
                        }}
                        minEditorHeight={400}
                        heightUnits="px"
                    />
                    <div className="markdown-tips">
                        <p>Tips: Để chèn ảnh, sử dụng cú pháp: ![mô tả ảnh](link ảnh)</p>
                        <p>Ví dụ: ![Ảnh bóng đá](https://example.com/image.jpg)</p>
                    </div>
                    <button 
                        className="submit-button"
                        onClick={handleAddPost}
                        disabled={isCreating || !title || !content || !imageTitle}
                    >
                        {isCreating ? 'Đang tạo...' : 'Thêm bài viết'}
                    </button>
                </div>

                <div className="ad-section">
                    <h3>Quản lý quảng cáo</h3>
                    <textarea
                        placeholder="Nhập mã quảng cáo mới"
                        value={adCode}
                        onChange={(e) => setAdCode(e.target.value)}
                        rows="4"
                    />
                    <button onClick={handleAddAd}>Thêm mã quảng cáo</button>

                    <div className="ad-insert">
                        <h4>Chọn mã quảng cáo để chèn:</h4>
                        <select
                            value={selectedAd}
                            onChange={(e) => setSelectedAd(e.target.value)}
                        >
                            <option value="">-- Chọn mã quảng cáo --</option>
                            {adList.map((ad, index) => (
                                <option key={index} value={ad}>
                                    Quảng cáo {index + 1}
                                </option>
                            ))}
                        </select>
                        <button onClick={handleInsertAd}>Chèn quảng cáo tại con trỏ</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostManagement;