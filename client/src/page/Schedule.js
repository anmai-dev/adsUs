import React, { useState, useEffect } from 'react';
import './Schedule.scss';
import { getMatch } from '../service/MatchService/MatchService';

// Base64 encoded placeholder image thay vì URL bên ngoài
const PLACEHOLDER_IMAGE = 'data:image/png;base64,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';

const Schedule = () => {
    const [matches, setMatches] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL || window.location.origin;

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                setIsLoading(true);
                const data = await getMatch();
                console.log("Dữ liệu trận đấu:", data);
                setMatches(data);
            } catch (error) {
                console.log("Lỗi khi lấy dữ liệu trận đấu", error);
                setError("Không thể tải dữ liệu trận đấu");
            } finally {
                setIsLoading(false);
            }
        };
        fetchMatches();
    }, []);
    
    const formatDateTime = (dateTimeString) => {
        if (!dateTimeString) return { date: 'Chưa có ngày', time: 'Chưa có giờ' };
        try {
            const date = new Date(dateTimeString);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');

            return {
                date: `${day}/${month}/${year}`,
                time: `${hours}:${minutes}`
            };
        } catch (error) {
            console.log("Lỗi khi format ngày giờ:", error);
            return { date: 'Chưa có ngày', time: 'Chưa có giờ' };
        }
    };

    const formatTeamName = (teamName) => {
        return teamName ? teamName.toUpperCase() : 'CHƯA CÓ';
    };

    // Hàm tạo đường dẫn đầy đủ cho hình ảnh - đã cập nhật để xử lý URL Cloudinary
    const getFullImageUrl = (imagePath) => {
        if (!imagePath) return PLACEHOLDER_IMAGE;
        
        // Đối với URL Cloudinary hoặc bất kỳ URL đầy đủ nào khác, trả về nguyên vẹn
        if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
            return imagePath;
        }
        
        // Đối với đường dẫn tương đối, thêm apiUrl
        const normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
        return `${apiUrl}${normalizedPath}`;
    };

    if (isLoading) {
        return <div className="loading">Đang tải lịch đấu...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className='scheduleContainer'>
            {matches.length === 0 ? (
                <div className="no-matches">Không có lịch đấu nào</div>
            ) : (
                <div className='matchList'>
                    {matches.map((match, index) => {
                        const { date, time } = formatDateTime(match.matchTime);
                        return (
                            <div key={match._id || index} className="matchItem">
                                <div className="matchDate">
                                    {date}
                                </div>
                                <div className="matchDetails">
                                    <div className="teamLeft">
                                        <img
                                            src={getFullImageUrl(match.team1Logo)}
                                            alt={formatTeamName(match.team1)}
                                            className="teamLogo"
                                            onError={(e) => {
                                                // Sử dụng ảnh placeholder từ web thay vì local file
                                                e.target.src = PLACEHOLDER_IMAGE;
                                                // Ngăn chặn lỗi lặp bằng cách xóa hàm onError sau khi xử lý
                                                e.target.onError = null;
                                            }}
                                        />
                                        <span className="teamNameLeft">
                                            {formatTeamName(match.team1)}
                                        </span>
                                    </div>
                                    <div className="matchTime">
                                        {time}
                                    </div>
                                    <div className="teamRight">
                                        <img
                                            src={getFullImageUrl(match.team2Logo)}
                                            alt={formatTeamName(match.team2)}
                                            className="teamLogo"
                                            onError={(e) => {
                                                // Sử dụng ảnh placeholder từ web thay vì local file
                                                e.target.src = PLACEHOLDER_IMAGE;
                                                // Ngăn chặn lỗi lặp bằng cách xóa hàm onError sau khi xử lý
                                                e.target.onError = null;
                                            }}
                                        />
                                        <span className="teamNameRight">
                                            {formatTeamName(match.team2)}
                                        </span>
                                    </div>
                                </div>
                                <div className="cupType">
                                    {match.cupType || 'Cup C1'}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Schedule;
