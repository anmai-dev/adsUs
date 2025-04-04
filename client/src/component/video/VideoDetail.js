import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import "./VideoDetail.scss";

// Base64 encoded placeholder image 
const THUMBNAIL_PLACEHOLDER = 'data:image/png;base64,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';

const VideoDetail = () => {
    const location = useLocation();
    const { video } = location.state || {};
    const [isFullscreen, setIsFullscreen] = useState(false);
    const videoRef = useRef(null);

    // Hàm lấy đường dẫn đầy đủ
    const getFullPath = (relativePath) => {
        if (!relativePath) return null;
        
        // Nếu đã là URL đầy đủ (bao gồm URL Cloudinary), trả về nguyên vẹn
        if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
            // Đây có thể là URL Cloudinary
            console.log("Đường dẫn đầy đủ (có thể là Cloudinary):", relativePath);
            return relativePath;
        }
        
        const apiUrl = process.env.REACT_APP_API_URL || window.location.origin;
        
        // Đảm bảo đường dẫn bắt đầu bằng dấu /
        let normalizedPath = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;
        
        // Xử lý đặc biệt cho các đường dẫn trong uploads
        if (normalizedPath.includes('uploads/thumbnails') || normalizedPath.includes('uploads/videos')) {
            // Loại bỏ bất kỳ tiền tố admin nào
            normalizedPath = normalizedPath.replace(/\/admin\//, '/');
            console.log(`Đường dẫn uploads sau khi xử lý: ${apiUrl}${normalizedPath}`);
            return `${apiUrl}${normalizedPath}`;
        }
        
        // Kiểm tra xem chúng ta có đang ở trang admin không
        const currentPath = window.location.pathname;
        if (currentPath.includes('/admin')) {
            // Đảm bảo URL không bị thêm /admin/ ở đầu
            const finalUrl = `${apiUrl}${normalizedPath}`;
            console.log(`URL trong trang admin: ${finalUrl}`);
            return finalUrl;
        }
        
        const finalUrl = `${apiUrl}${normalizedPath}`;
        console.log(`URL thông thường: ${finalUrl}`);
        return finalUrl;
    };

    const handleFullscreenChange = () => {
        if (!document.fullscreenElement &&
            !document.webkitFullscreenElement &&
            !document.mozFullScreenElement &&
            !document.msFullscreenElement) {
            setIsFullscreen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);
        document.addEventListener('MSFullscreenChange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
            document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
            document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
        };
    }, []);

    const toggleFullscreen = () => {
        if (!isFullscreen) {
            if (videoRef.current.requestFullscreen) {
                videoRef.current.requestFullscreen();
            } else if (videoRef.current.webkitRequestFullscreen) {
                videoRef.current.webkitRequestFullscreen();
            } else if (videoRef.current.mozRequestFullScreen) {
                videoRef.current.mozRequestFullScreen();
            } else if (videoRef.current.msRequestFullscreen) {
                videoRef.current.msRequestFullscreen();
            }
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            setIsFullscreen(false);
        }
    };

    if (!video) {
        return <div>Video không tồn tại</div>;
    }

    // Xác định loại video và xử lý URL
    const getVideoSource = () => {
        if (!video.useURL) {
            return {
                type: 'direct',
                url: getFullPath(video.videoFile)
            };
        }

        const url = video.videoURL;
        if (!url) return null;

        // Player API (phimapi, etc.)
        if (url.includes('player.phimapi.com') || url.includes('player/?url=')) {
            return {
                type: 'player',
                url: url
            };
        }

        // Opstream và các URL streaming khác
        if (url.includes('opstream15.com') || url.includes('vip.opstream')) {
            // Thử nhúng trực tiếp URL gốc trước
            return {
                type: 'player',
                url: url // Nhúng trực tiếp để kiểm tra
                // Nếu không hoạt động, có thể quay lại dùng phimapi:
                // url: `https://player.phimapi.com/player/?url=${encodeURIComponent(url)}&referrer=&autoplay=1`
            };
        }

        // YouTube
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            const videoId = url.includes('youtube.com')
                ? url.split('v=')[1]?.split('&')[0]
                : url.split('youtu.be/')[1];
            return {
                type: 'youtube',
                url: `https://www.youtube.com/embed/${videoId}`
            };
        }

        // Facebook
        if (url.includes('facebook.com') || url.includes('fb.watch')) {
            return {
                type: 'facebook',
                url: url.replace('watch/?v=', 'plugins/video.php?href=') + '&show_text=false'
            };
        }

        // Vimeo
        if (url.includes('vimeo.com')) {
            const videoId = url.split('vimeo.com/')[1];
            return {
                type: 'vimeo',
                url: `https://player.vimeo.com/video/${videoId}`
            };
        }

        // Dailymotion
        if (url.includes('dailymotion.com')) {
            const videoId = url.split('/video/')[1]?.split('?')[0];
            return {
                type: 'dailymotion',
                url: `https://www.dailymotion.com/embed/video/${videoId}`
            };
        }

        // Tệp video trực tiếp (mp4, webm, ogg)
        if (url.match(/\.(mp4|webm|ogg)$/i)) {
            return {
                type: 'direct',
                url: url
            };
        }

        // M3U8 streaming
        if (url.includes('.m3u8')) {
            return {
                type: 'player',
                url: `https://player.phimapi.com/player/?url=${encodeURIComponent(url)}`
            };
        }

        // URL không được hỗ trợ
        return {
            type: 'player',
            url: `https://player.phimapi.com/player/?url=${encodeURIComponent(url)}`
        };
    };

    const videoSource = getVideoSource();

    if (!videoSource) {
        return <div>Không tìm thấy nguồn video cho URL: {video.videoURL}</div>;
    }

    const renderVideo = () => {
        switch (videoSource.type) {
            case 'direct':
                return (
                    <video
                        controls
                        src={videoSource.url}
                        title={video.title || 'Video'}
                        style={{ width: "100%", height: "auto" }}
                        controlsList="nodownload"
                        poster={getFullPath(video.thumbnail)}
                        onError={(e) => {
                            console.error(`Không thể tải video: ${videoSource.url}`);
                            e.target.poster = THUMBNAIL_PLACEHOLDER;
                        }}
                    >
                        Trình duyệt của bạn không hỗ trợ thẻ video.
                    </video>
                );
            case 'player':
                return (
                    <iframe
                        src={videoSource.url}
                        title={video.title || 'Video'}
                        frameBorder="0"
                        scrolling="no"
                        allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                        style={{ width: "100%", height: "500px" }}
                        onError={() => console.log(`Không thể tải iframe từ ${videoSource.url}`)}
                    ></iframe>
                );
            case 'youtube':
            case 'vimeo':
            case 'dailymotion':
                return (
                    <iframe
                        src={videoSource.url}
                        title={video.title || 'Video'}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ width: "100%", height: "500px" }}
                    ></iframe>
                );
            case 'facebook':
                return (
                    <iframe
                        src={videoSource.url}
                        title={video.title || 'Video'}
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        allowFullScreen
                        style={{ width: "100%", height: "500px" }}
                    ></iframe>
                );
            default:
                return <div>Định dạng video không được hỗ trợ: {videoSource.url}</div>;
        }
    };

    return (
        <div className={`video-detail ${isFullscreen ? 'fullscreen' : ''}`}>
            <h1>{video.title || 'Không có tiêu đề'}</h1>
            <div className="video-container" ref={videoRef}>
                <div className="video-wrapper">
                    {renderVideo()}
                </div>
                {videoSource.type === 'direct' && (
                    <div className="video-controls">
                        <button onClick={toggleFullscreen}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                            </svg>
                            {isFullscreen ? 'Thoát toàn màn hình' : 'Toàn màn hình'}
                        </button>
                    </div>
                )}
            </div>
            <div className="video-info">
                <h2>{video.title}</h2>
            </div>
        </div>
    );
};

export default VideoDetail;