import React, { useState, useEffect } from 'react';
import './LinkManage.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createLink } from '../redux/apiRequest';
import { useDispatch } from 'react-redux';

const LinkManage = () => {
  const [links, setLinks] = useState([]);
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch all links when component mounts
  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:8000/api/links');
      setLinks(response.data);
    } catch (err) {
      setError('Không thể tải danh sách liên kết');
      console.error('Lỗi khi tải liên kết:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess('');
    setIsLoading(true);

    // Validation
    if (!url) {
      setError("Vui lòng nhập URL liên kết");
      setIsLoading(false);
      return;
    }

    // Create FormData
    const formData = new FormData();
    formData.append('url', url);
    formData.append('title', title);
    formData.append('description', description);

    console.log("Form data in component:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const result = await createLink(formData, dispatch);
      console.log("Link created successfully:", result);
      setSuccess('Liên kết đã được tạo thành công!');
      setUrl('');
      setTitle('');
      setDescription('');
      // Refresh the links list
      fetchLinks();
    } catch (error) {
      console.error('Lỗi khi thêm liên kết:', error);
      setError('Không thể tạo liên kết. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="link-manage-container">
      <h1>Quản lý liên kết</h1>
      
      {/* Form to add new link */}
      <div className="form-container">
        <h2>Thêm liên kết mới</h2>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="url">
              URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              id="url"
              name="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="title">
              Tiêu đề
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Tiêu đề liên kết"
              disabled={isLoading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">
              Mô tả
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mô tả về liên kết"
              rows="3"
              disabled={isLoading}
            ></textarea>
          </div>
          
          <div className="button-group">
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Đang xử lý..." : "Thêm liên kết"}
            </button>
          </div>
        </form>
      </div>
      
      {/* Display existing links */}
      <div className="table-container">
        <h2>Danh sách liên kết</h2>
        
        {isLoading && <p className="loading-message">Đang tải dữ liệu...</p>}
        
        {!isLoading && links.length === 0 && (
          <p className="empty-message">Chưa có liên kết nào</p>
        )}
        
        {!isLoading && links.length > 0 && (
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Tiêu đề</th>
                  <th>URL</th>
                  <th>Mô tả</th>
                  <th>Ngày tạo</th>
                </tr>
              </thead>
              <tbody>
                {links.map((link) => (
                  <tr key={link._id}>
                    <td>{link.title || 'Không có tiêu đề'}</td>
                    <td>
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.url}
                      </a>
                    </td>
                    <td>{link.description || 'Không có mô tả'}</td>
                    <td>
                      {new Date(link.createdAt).toLocaleDateString('vi-VN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkManage;
