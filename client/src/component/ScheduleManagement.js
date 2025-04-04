import React, { useState } from 'react';
import './ScheduleManagement.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMatch, ScheduleMatch } from '../redux/apiRequest';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ScheduleManagement = ({ onClose, onSuccess }) => {
    const token = useSelector((state) => state.auth.login?.currentUser);
    const [team1, setTeam1] = useState('');
    const [team2, setTeam2] = useState('');
    const [team1Logo, setTeam1Logo] = useState(null);
    const [team2Logo, setTeam2Logo] = useState(null);
    const [matchTime, setMatchTime] = useState('');
    const [cupType, setCupType] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const dispatch = useDispatch();
    const Navigate = useNavigate();

    const handleSubmitMatch = async (e) => {
        e.preventDefault();
        setError(null);
        setUploadProgress(0);

        // Validation
        if (!team1 || !team2 || !matchTime) {
            setError("Vui lòng nhập đầy đủ tên đội 1, đội 2 và thời gian trận đấu");
            return;
        }

        if (!team1Logo || !team2Logo) {
            setError("Vui lòng chọn logo cho cả hai đội");
            return;
        }

        // Check file size
        const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
        if (team1Logo.size > MAX_FILE_SIZE || team2Logo.size > MAX_FILE_SIZE) {
            setError(`Logo không được vượt quá 5MB. Logo hiện tại: Đội 1: ${(team1Logo.size / 1024 / 1024).toFixed(2)}MB, Đội 2: ${(team2Logo.size / 1024 / 1024).toFixed(2)}MB`);
            return;
        }

        // Create FormData
        const formData = new FormData();
        formData.append('team1', team1);
        formData.append('team2', team2);
        formData.append('matchTime', matchTime);
        formData.append('cupType', cupType || 'Chưa có giải đấu');
        formData.append('team1Logo', team1Logo);
        formData.append('team2Logo', team2Logo);

        console.log("Form data:");
        for (let [key, value] of formData.entries()) {
            console.log(key, value instanceof File ? `File: ${value.name}, size: ${value.size}` : value);
        }

        try {
            setIsLoading(true);
            
            // Use axios directly with upload progress
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
            const response = await axios.post(`${baseURL}/api/match/create`, formData, config);
            
            console.log("Match added successfully:", response.data);
            
            await getAllMatch(dispatch);
            alert("Thêm trận đấu thành công!");
            onSuccess();
            Navigate('/admin/manage-schedule');
        } catch (error) {
            console.error('Lỗi khi thêm trận đấu:', error);
            
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
        }
    };

    return (
        <div className="scheduleManagement">
            <h2>Thêm trận đấu</h2>
            
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmitMatch} encType="multipart/form-data">
                <div className="form">
                    <div className="form-group">
                        <label>Tên đội 1:</label>
                        <input
                            type="text"
                            placeholder="Tên đội 1"
                            value={team1}
                            onChange={(e) => setTeam1(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Logo đội 1:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setTeam1Logo(e.target.files[0])}
                            disabled={isLoading}
                        />
                        {team1Logo && (
                            <div className="image-preview">
                                <img 
                                    src={URL.createObjectURL(team1Logo)} 
                                    alt="Logo đội 1"
                                    onLoad={() => URL.revokeObjectURL(team1Logo)} 
                                />
                            </div>
                        )}
                    </div>
                    
                    <div className="form-group">
                        <label>Tên đội 2:</label>
                        <input
                            type="text"
                            placeholder="Tên đội 2"
                            value={team2}
                            onChange={(e) => setTeam2(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Logo đội 2:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setTeam2Logo(e.target.files[0])}
                            disabled={isLoading}
                        />
                        {team2Logo && (
                            <div className="image-preview">
                                <img 
                                    src={URL.createObjectURL(team2Logo)} 
                                    alt="Logo đội 2"
                                    onLoad={() => URL.revokeObjectURL(team2Logo)} 
                                />
                            </div>
                        )}
                    </div>
                    
                    <div className="form-group">
                        <label>Thời gian trận đấu:</label>
                        <input
                            type="datetime-local"
                            value={matchTime}
                            onChange={(e) => setMatchTime(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Tên giải đấu:</label>
                        <input
                            type="text"
                            placeholder="Tên giải đấu (nếu có)"
                            value={cupType}
                            onChange={(e) => setCupType(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                    
                    {isLoading && (
                        <div className="upload-progress">
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: `${uploadProgress}%` }}></div>
                            </div>
                            <p>{uploadProgress}% Đã tải lên</p>
                        </div>
                    )}
                    
                    <div className="button-group">
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? "Đang xử lý..." : "Thêm trận đấu"}
                        </button>
                        <button type="button" onClick={onClose} disabled={isLoading}>
                            Hủy
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ScheduleManagement;
