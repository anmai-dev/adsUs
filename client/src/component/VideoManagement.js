import { useState, useEffect } from 'react';
import './VideoManagement.scss';
import { useDispatch, useSelector } from 'react-redux';
import { CreateVideo, getAllVideo } from '../redux/apiRequest';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Base64 encoded placeholder image thay vì URL bên ngoài
const THUMBNAIL_PLACEHOLDER = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAADICAYAAABS39xVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5QwDEAUiQrfHtQAACLtJREFUeNrt3c1rXGUcxfHvmUySJn2JYzW11vgiCFqwUlFBsC4EV4IgJW0WrgRB3LvQP0Fw5Q6kpWYhrty4UAQVQaS+gJSqEaTUaKGtbZo2nWRex00aMEJeZubO8zLn84HZFTKce8jw5M4M6QgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8B8Szr3gZDLhAUMQhR6RpHm+H42iKM4f5Hl8NQz3FUWW1jVJY5Yq2m632717Jye/21GrHerD5eXXbVUA9JnKKK++e/lyn3fWwqOXLh2N4vl8uDK9lq/PfHSjmf4QRRfeMpsCZSXJpJuT09Mzaau1o2u93j1Jt9ZjfHdl5cg3J058NbPWfb5XR6sAsKuqo1U0M3P5+Ldra3fOzc9/lqbpsaydvjyZpidDzHc0JyfDIJ3fvG4laSm5tCS9lY3FP9mKABgMt1FfW1u7M9/d21pY2J6s1+t3z8XxJ1EUhZA1j+eH5/7lGbFZRABA31lU5Nvhu3qTzpPB7NkQpvPRYBrFVANQAZPZdUkyjVVVAFSANYZN1MwCblfXrAZS/jCjKACjZs0hCmaaJbAAeIu1WZqoKgICCwBhBQCEFQAQVgBAWAEAYQUAhBUAEFYAQFgBAGEFAIQVABBWAEBYAQBhBQCEFQAQVgBAWAEAYQUAhBUAEFYAQFgBAGEFAIQVABBWAEBYAQBhBQCEFQAQVgBAWAEAYQUAhBUAEFYAQFgBAGEFAIQVABBWAEBYAQBhBQCEFQAQVgBAWAEAYQUAhBUAEFYAQFgBAGEFAIQVABBWAEBYAQBhBQCEFQAQVgBAWAEAYQUAhBUAEFYAQFgBAGEFAIQVABBWAEBYAQBhBQCEFQAQVgAwLDWzAEBx02OT6nTa9w7jvbuHsU8VEFgYupfe/l5hfP+BXL24X8fPXJLeev3Gjf19BO1WoLOvPKbWKzM6fPiw+Mu9AwHVnZqSJD196JBO7ztQfH2KpBr5hcpYLpejWq0mjcVmFeAeVoXs2rVLd999t9rtNmM5BGYWxsbGNDk5SSRXDGFVQd1uV51OR0mSMJYVEUWRarUa41glhFUFxXGsVqvFSFZIkiTcv6oYwqqiJienJDGSVUFUVRNhVVFhbExSYCQrIA5McFURVhVmZmIkK4CoqibCquI4LVQDUVVNhBUAEFYV12w2GckKaLdajGRFEVYVlqaptpkoDQNRVV2EVUVtb29rc3OTU0JFEFXVRVhVULfb1Y8//qh6vc5IVgRRVW2EVQXF8a2vwKrX65wWKoCoqjbCqmLSNNXGxob+/PNPTgkVQVRVH2FVIWmaanV1Vaurq5qYmGA0K8Ls1v9mPZIPPfSQ1tfXpVZr+N/34b4B6I+trS11Oh1NTEwwmhXCY3Kqj8CqiDRN9dFHH2l9fZ2oqhBOB+OBwKqQG8Gl6elpRrUi4jjW2NjYzf8TVOPA6b8ier2eNjc3eQqoQpIk+ctFxXGssbExTU1NqdPpaHJykmgaAQRWBXS7XT5DVTFxHKter+vAgQNKkkRjY2OEVcVxSqiAra0tnwEw8jgljCgCq9q4/zgeOCUAIKwAgLACAMIKAKrP7MjFixcv9nq93KoAepbloZk1T5061deJk2TJVgVAn6mM2/r6+ov1ev0bWxUAPac78kvfnz37ge2shccWF+9LmvHCzJmzzazxXb3eeNFUA1CK3uKJE1/Ntdv/fOvll9+1VQHQZzejamFhIWf8gJHH07qjgIeZRwdRNSIIrBFAVI0OwmrEEVWjhbAaYUTV6CGsRhRRNZoIqxFEVI0uwmrEEFWjjbAaIUTVaCOsRgRRNfoIqxFAVI0HwqriuJc1PniqpuIIqgrhacAScKc9GIZvDQ9hVTFEVbkIq5IQVOUjrEpAUFUDYTVkBFV1EFZDRFBVyyDCKrfVAAyUmeLBTGB+GGvxjP4QEVTVNIiwiqwGYKB6ZoMJrG1bDcDAZGYDOYX7eXr6G1sNwEBsz88/l9lqkqQH+vmJwMeeeOIHST9L+tlWBUDfWdJqvTFT/J7Tw4+vrDxS1+VXnbMugD7L6/Urj8/OrhSPn1tevnfj3NLSSxOt1r1xHO+MY5u+vXPn9ZdmZ380s7zAugBoU2lS03ffnD59Xma5JEVmptOnT9/8+eLi4h1pVn/IGo2nQq93ZwhhtzLbIak2kBUA3JLVa+u1Wm1DZpuSNi7Pzf34z7OqiqyqqCiACoiKrYoAAICKKLKq8mYWP+FmFlCeIqvqba52nnj3Kn/aBQjD5HlNH58+quXJh5/TG2+8P9BdFVm1tHTs84mW7T5z7rPjr+3bd9/rZvULZrYhKRvsqgBuV9bs2PL83NcLi4uRpLxo/OXZ2U5e797/+ptv37g8O/vdWK326MLi4oy60U+S6pLWB7cqAAV9ndb1wsaG1CTFkhJJSSSpr6dyi6xKkuT7EMLJPEkOBUlRp3Mi1GovRXH8ibJsa8CrArg9eS1L3pL0qqSOJJNkkuKuH98uYJFV9Xq9I+lpSTe/KT7PMn21vb39u/L8Y5ndMcBVAaxHcXbbzs88/rycNKXOzFc6ePC8Dh58KU/Tk+9L71n/Vv2ryKp6vd77QVKSJJfqdfsz7fVOSVpT1vvd7FeLV/6qf2qmZeCrAtjOhvv9+Vy9tZ90S5plyq/+mueHe91u703p+eVCK4/j+L1Dh07+dPLkh9LVU7mk7Oz589Lpk09fvnDht88lLV57/KFrC/y51+8/3lpLVqXnX8jSx/a102S6W7Zw67TsexDQZ7fb2fm34eN/AGWRbUeqm4+QAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTEyLTAzVDE2OjA1OjM0KzAwOjAwrNuXCAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0xMi0wM1QxNjowNTozNCswMDowMN2GL7QAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAAElFTkSuQmCC';

const VideoManagement = () => {
    const token = useSelector((state) => state.auth.login?.currentUser);
    const [videos, setVideos] = useState([]);
    const [title, setTitle] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [videoURL, setVideoURL] = useState('');
    const [useURL, setUseURL] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const dispatch = useDispatch();
    const Navigate = useNavigate();

    // Fetch videos when component mounts
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                setIsLoading(true);
                console.log("Fetching videos...");
                await getAllVideo(dispatch);
                console.log("Videos fetched successfully");
                // Note: We're not setting videos here as we're using Redux store
            } catch (error) {
                console.error("Error fetching videos:", error);
                setError("Không thể tải danh sách video");
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchVideos();
    }, [dispatch]);

    // Handle delete video
    const handleDeleteVideo = (index) => {
        const newVideos = videos.filter((_, i) => i !== index);
        setVideos(newVideos);
    };

    // Handle form submission
    const handleOnsubmitVideo = async (e) => {
        e.preventDefault();
        setError(null);
        setUploadProgress(0);

        if (!title || !thumbnail) {
            setError("Vui lòng nhập tiêu đề và chọn thumbnail.");
            return;
        }
        if (!useURL && !videoFile) {
            setError("Vui lòng chọn file video.");
            return;
        }
        if (useURL && !videoURL) {
            setError("Vui lòng nhập URL video.");
            return;
        }

        // Kiểm tra kích thước file video
        if (!useURL && videoFile) {
            // 100MB trong bytes
            const MAX_FILE_SIZE = 100 * 1024 * 1024;
            if (videoFile.size > MAX_FILE_SIZE) {
                setError(`Kích thước file video quá lớn. Tối đa 100MB. File hiện tại: ${(videoFile.size / 1024 / 1024).toFixed(2)}MB`);
                return;
            }
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('thumbnail', thumbnail);
        formData.append('useURL', useURL);
        if (useURL) {
            formData.append('videoURL', videoURL); // Nếu dùng URL
        } else {
            formData.append('video', videoFile); // Nếu tải lên file
        }

        console.log("Form data:");
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        try {
            setIsLoading(true);
            setIsUploading(true);
            console.log("Creating video...");
            
            // Sử dụng axios trực tiếp để theo dõi tiến trình
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    token: `Bearer ${token?.accessToken}`
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    console.log(`Upload progress: ${percentCompleted}%`);
                    setUploadProgress(percentCompleted);
                }
            };
            
            const baseURL = window.location.origin; // e.g., http://localhost:3000
            const response = await axios.post(`${baseURL}/api/video`, formData, config);
            
            console.log("Video created successfully:", response.data);
            alert("Thêm video thành công!");
            
            // Reset form
            setTitle('');
            setThumbnail(null);
            setVideoFile(null);
            setVideoURL('');
            setUseURL(false);
            setUploadProgress(0);
            
            // Refresh video list
            await getAllVideo(dispatch);
        } catch (error) {
            console.error("Error creating video:", error);
            
            // Hiển thị thông báo lỗi chi tiết hơn
            if (error.response) {
                // Lỗi từ server
                setError(`Lỗi: ${error.response.status} - ${error.response.data.message || 'Lỗi từ server'}`);
            } else if (error.request) {
                // Lỗi không nhận được response
                setError("Lỗi kết nối: Không nhận được phản hồi từ server. Mạng có thể bị ngắt kết nối.");
            } else {
                // Lỗi khác
                setError("Lỗi: " + error.message);
            }
        } finally {
            setIsLoading(false);
            setIsUploading(false);
        }
    };

    const handleManageVideo = () => {
        Navigate('/admin/list-videos');
    };

    // Thêm hàm xử lý click để xem chi tiết video
    const handleViewVideo = (video) => {
        console.log("Chuyển đến trang chi tiết video:", video);
        Navigate('/video-detail', { state: { video } });
    };

    // Extract video data from Redux store
    const videoList = useSelector((state) => state.Video.getAllVideo?.currentVideo) || [];
    console.log("Video list from Redux store:", videoList);

    // Thêm hàm lấy đường dẫn đầy đủ
    const getFullPath = (relativePath) => {
        if (!relativePath) return THUMBNAIL_PLACEHOLDER;
        
        // Nếu đã là URL đầy đủ (bao gồm URL Cloudinary), trả về nguyên vẹn
        if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
            // Đây có thể là URL Cloudinary
            console.log("Đường dẫn đầy đủ (có thể là Cloudinary):", relativePath);
            return relativePath;
        }
        
        const apiUrl = process.env.REACT_APP_API_URL || window.location.origin;
        
        // Đảm bảo đường dẫn bắt đầu bằng dấu /
        let normalizedPath = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;
        
        // Xử lý đặc biệt cho các đường dẫn trong uploads/thumbnails
        if (normalizedPath.includes('uploads/thumbnails') || normalizedPath.includes('uploads/videos')) {
            // Loại bỏ bất kỳ tiền tố admin nào
            normalizedPath = normalizedPath.replace(/\/admin\//, '/');
            
            // Log để debug
            console.log(`Đường dẫn sau khi xử lý: ${apiUrl}${normalizedPath}`);
            
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

    return (
        <div className="videoManagement">
            <h2>Quản lý video</h2>
            
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleOnsubmitVideo} encType='multipart/form-data'>
                <div className="form">
                    <input
                        type="text"
                        placeholder="Tiêu đề"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={isLoading}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setThumbnail(e.target.files[0])}
                        disabled={isLoading}
                    />
                    <div className="videoSource">
                        <label>
                            <input
                                type="radio"
                                name="videoSource"
                                checked={!useURL}
                                onChange={() => setUseURL(false)}
                                disabled={isLoading}
                            />
                            Tải lên video
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="videoSource"
                                checked={useURL}
                                onChange={() => setUseURL(true)}
                                disabled={isLoading}
                            />
                            URL video
                        </label>
                    </div>
                    {!useURL && (
                        <input
                            type="file"
                            accept="video/*"
                            onChange={(e) => setVideoFile(e.target.files[0])}
                            disabled={isLoading}
                        />
                    )}
                    {useURL && (
                        <input
                            type="text"
                            placeholder="URL video"
                            value={videoURL}
                            onChange={(e) => setVideoURL(e.target.value)}
                            disabled={isLoading}
                        />
                    )}
                    <button type='submit' disabled={isLoading}>
                        {isLoading ? "Đang xử lý..." : "Thêm video"}
                    </button>
                </div>
            </form>
            
            <div className="manage-button">
                <button onClick={handleManageVideo} disabled={isLoading}>Quản Lí Video</button>
            </div>

            {isLoading && <div className="loading-spinner">Đang tải...</div>}

            {isUploading && (
                <div className="upload-progress">
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                    <p>{uploadProgress}% Đã tải lên</p>
                    <p className="upload-warning">Vui lòng không đóng cửa sổ hoặc tải lại trang khi đang tải lên.</p>
                </div>
            )}

            {/* <div className="videoList">
                {videoList.length > 0 ? (
                    videoList.map((video, index) => (
                        <div key={video._id || index} className="videoItem">
                            <img 
                                src={getFullPath(video.thumbnail)} 
                                alt={video.title} 
                                className="thumbnail"
                                onClick={() => handleViewVideo(video)}
                                style={{ cursor: 'pointer' }}
                                onError={(e) => {
                                    console.error(`Error loading thumbnail: ${video.thumbnail}`);
                                    e.target.src = THUMBNAIL_PLACEHOLDER;
                                    e.target.onError = null;
                                }}
                            />
                            <h3 onClick={() => handleViewVideo(video)} style={{ cursor: 'pointer' }}>{video.title}</h3>
                            <div className="video-actions">
                                <button className="view-button" onClick={() => handleViewVideo(video)}>Xem</button>
                                <button className="delete-button" onClick={() => handleDeleteVideo(index)}>Xóa</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-videos">
                        <p>Không có video nào. Vui lòng thêm video mới.</p>
                    </div>
                )}
            </div> */}
        </div>
    );
};

export default VideoManagement;