import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './LinkDetail.scss';

const LinkDetail = () => {
  const { id } = useParams();
  const [link, setLink] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchLinkDetail = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/links/${id}`);
        console.log("Link detail:", response.data);
        setLink(response.data);
      } catch (error) {
        console.error("Error loading link details:", error);
        setError("Could not load link details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLinkDetail();
  }, [id]);

  const copyToClipboard = () => {
    if (link && link.url) {
      navigator.clipboard.writeText(link.url)
        .then(() => {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
        })
        .catch(err => {
          console.error('Could not copy: ', err);
        });
    }
  };

  const handleAccessLink = () => {
    setShowDetails(true);
  };

  return (
    <div className="link-detail-container">
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading link details...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p>{error}</p>
        </div>
      ) : !link ? (
        <div className="empty-container">
          <p>Link not found</p>
        </div>
      ) : (
        <div className="link-detail-card">
          <div className="link-detail-header">
            <h1>{link.title || 'Untitled Link'}</h1>
            
            {!showDetails ? (
              <div className="link-actions">
                <button 
                  className="access-button"
                  onClick={handleAccessLink}
                >
                  Access Link
                </button>
              </div>
            ) : (
              <div className="link-actions">
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="visit-button"
                >
                  Open Link
                </a>
                <button 
                  className={`copy-button ${copySuccess ? 'success' : ''}`}
                  onClick={copyToClipboard}
                >
                  {copySuccess ? 'Copied!' : 'Copy Link'}
                </button>
              </div>
            )}
          </div>
          
          {showDetails && (
            <div className="link-detail-content">
              <div className="link-url">
                <h3>URL:</h3>
                <p>{link.url}</p>
              </div>
              
              {link.description && (
                <div className="link-description">
                  <h3>Description:</h3>
                  <p>{link.description}</p>
                </div>
              )}
              
              <div className="link-metadata">
                <p>Created: {new Date(link.createdAt).toLocaleDateString()}</p>
                <p>Last updated: {new Date(link.updatedAt).toLocaleDateString()}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LinkDetail;
