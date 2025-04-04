import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './LinkPage.scss';

const LinkPage = () => {
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/links/");
        console.log("Links data:", response.data);
        setLinks(response.data);
      } catch (error) {
        console.error("Lỗi khi tải liên kết:", error);
        setError("Không thể tải danh sách liên kết");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLinks();
  }, []);

  return (
    <div className="link-page-container">
      <div className="link-page-header">
        <h1>Liên kết hữu ích</h1>
        <p>Danh sách các liên kết hữu ích từ chúng tôi</p>
      </div>

      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Đang tải liên kết...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p>{error}</p>
        </div>
      ) : links.length === 0 ? (
        <div className="empty-container">
          <p>Chưa có liên kết nào</p>
        </div>
      ) : (
        <div className="links-grid">
          {links.map((link) => (
            <div key={link._id} className="link-card">
              <div className="link-card-content">
                <h3>{link.title || 'Liên kết không có tiêu đề'}</h3>
                <p>{link.description || 'Không có mô tả'}</p>
                <div className="link-actions">
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="link-button"
                  >
                    Truy cập liên kết
                  </a>
                  <Link 
                    to={`/link/${link._id}`} 
                    className="detail-button"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LinkPage;
