import React, { useEffect, useState } from 'react';
import './MatchList.scss';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMatch, getAllMatch } from '../redux/apiRequest';

// Base64 encoded placeholder image thay vì URL bên ngoài
const PLACEHOLDER_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QwDEAAyqBNUVQAABKtJREFUaEPdml1MU1cYx/9QKpTyOQZaQNTMUUCGH1lUQucUiDNLdOrLNBsizhiXZX5kJkveNhcTE7fMl7llL0v2smS+LJlZlkVNnJlLFgVcQIlgQWCAQgulUNoCPfs4LpRLpfece+Hy/+XJOfd8/J/23HPa05YRBIGgMkNqArlhCeROoH369CmCwSCGh4fR29uL4eHh2LVYLIZ//348Hg9Onjz5PwWGhoZw48YNtLW1xQS7ZStQ7/Lj5MGdyMpMx/nz5+H1evnvRDXwer24cOFCQvGOzHR0ugNoaGjA8+fPUVJSou4INVL3PjP6LRl8LZ1Ox39XmQDb29vjikdZWVkBwCMkr4HnRVoxs9CB30ZduDfYir7ANcyfOg2TyQS32y2vAadT2gO3d7zE8UsP0RX4Nx6NJEBrA1E+b+jCZx+8hY6ODni9XojFYnkN9PT0SLZpKbbjyrEqrM3Mjvv8aSCEW/cHYbfbUVpaKq+B7u5uyfbvt5XiUFVJwvb9wTmcvdoJk8kEh8MBj8cjrYGenh7QKOg8UIG6LdJLhj2bcnD7wsvlNBaLxWvALVGYmdKzuVYmOVOcrd+Alpp1CZ/32rOweWM2AAMXMVGq15tQsj5LsnbDOvE0GrQGEDaQYxG3XLAJdoC2CQxEzTdgDZAG0gyYA2sNrAXoGlADq34V0sMurcEO0PcBWgP6L6N6V6N6E9O9qdU3ocEj1PcSqncrFTA+fYTp+Qncn5xHW+crtLW1YWBgAOFwWFkDvH8w+fn8s4fwT3qVvn1MBh4M4sjVbjS2+nDlp1/R398Ps9ms3A5sKCvH14c/RE2RXfFSRE6GPXg8OhX39/r6ehQVFfHfle9AaWkpzh6pRf2WQsWFMLpvdyARZWVlsNlsMJvN8hsoLi7G13UfYd/mXEWF1HrvYnbiueRKxWKxoLKyEjabDRaLRRkDhYWF+PbQXhwoy5M9MnfGJzE7MQJnOL7AaFitVlRVVcFut8NqtSproKCgAJfra/FJeUHK4nsnp1HXOoRj//gRCEkkCaxA9Vqbm5sLu90Om80Gu90Oi8Ui3wDt/OXLl7F3c37SIu6MveIFXvvzES4+eoa5YGrHkSaTCTabDXa7HYWFhSgsLJTHAG2Ly5cv49NKON5NTCAcDiEYDILdbhcGg0GYm5sT5ufnhYWFBWFxcVEIhUJCOBwWIpFIzLEUBqbeMqLRKCKRCEKhEF/LE1kHrnnI7qGpMRuUheyBYcCuQjWg+ztx9Sak+4ysNKrPxHoTomuiQZOgO7AB+j6gBvQ/UOl9KBQcIQN+q9BbPKH/wV4P8QasgQbtgIE7QGNk+1fE5x2Ew2H09fXxfmxvYPhViAYmJ9rR0hLN8YRCoVgGHztC9AYKhUL8CFE2aDQa9QZKrNOdUHYDdBcJh8OxHZQ+ikQiiEajEIlEvBDNVGwVEolEvFWLgRNLS0ux2b1er/H/4EFn9tnZ2b6ZmRm/SJbwvnCIRqPZWVlZZRUVFe8tLy9HIpFIdGlpKRqNRsUikUgqEolEYrHYJBKJzGKxeCkSiYSXl5cnJycnb46Ojv7kcrleq5P7P2u6T3D69wEbAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTEyLTAzVDE2OjAwOjUwKzAwOjAwlsgUdQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0xMi0wM1QxNjowMDo1MCswMDowMOeVrMkAAAAASUVORK5CYII=';

const MatchList = ({ onAddMatch }) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.login?.currentUser || [])
    const matches = useSelector((state) => state.match.Schedule?.currentMatch || []);
    const [isLoading, setIsLoading] = useState(true);
    const apiUrl = process.env.REACT_APP_API_URL || window.location.origin;

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                setIsLoading(true);
                await getAllMatch(dispatch); // Gọi hàm getAllMatch để lấy danh sách trận đấu
            } catch (error) {
                console.error("Lỗi khi lấy danh sách trận đấu:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMatches();
    }, [dispatch]);
    
    const handleDeleteMatch = async (id) => {
        try {
            if (window.confirm("Bạn có chắc chắn muốn xóa trận đấu này?")) {
                await deleteMatch(id, token?.accessToken, dispatch);
                await getAllMatch(dispatch);
            }
        } catch (error) {
            console.error("Lỗi khi xóa trận đấu:", error);
            alert("Có lỗi xảy ra khi xóa trận đấu");
        }
    }
    
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
    
    // Format ngày giờ để hiển thị
    const formatDateTime = (dateTimeString) => {
        if (!dateTimeString) return 'Chưa có thời gian';
        try {
            const date = new Date(dateTimeString);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            
            return `${day}/${month}/${year} ${hours}:${minutes}`;
        } catch (error) {
            console.log("Lỗi khi format ngày giờ:", error);
            return 'Chưa có thời gian';
        }
    };
    
    if (isLoading) {
        return (
            <div className="matchList loading">
                <h2>Danh sách lịch bóng đá</h2>
                <div className="loading-message">Đang tải...</div>
            </div>
        );
    }
    
    return (
        <div className="matchList">
            <h2>Danh sách lịch bóng đá</h2>
            <button onClick={onAddMatch} className="add-match-btn">Thêm trận đấu</button>
            {Array.isArray(matches) && matches.length > 0 ? (
                matches.map((match, index) => (
                    <div key={match._id || index} className="matchItem">
                        <div className="teamleft">
                            <img 
                                src={getFullImageUrl(match.team1Logo)} 
                                alt={match.team1} 
                                className="teamLogo"
                                onError={(e) => {
                                    e.target.src = PLACEHOLDER_IMAGE;
                                    e.target.onError = null; // Ngăn chặn vòng lặp lỗi
                                }}
                            />
                            <span className="teamNameLeft">{match.team1}</span>
                        </div>
                        <div className="matchTime">{formatDateTime(match.matchTime)}</div>
                        <div className="teamRight">
                            <span className="teamNameRight">{match.team2}</span>
                            <img 
                                src={getFullImageUrl(match.team2Logo)} 
                                alt={match.team2} 
                                className="teamLogo"
                                onError={(e) => {
                                    e.target.src = PLACEHOLDER_IMAGE;
                                    e.target.onError = null; // Ngăn chặn vòng lặp lỗi
                                }}
                            />
                        </div>
                        <div className='btn'>
                            <button className='edit'>
                                <i className="fa-solid fa-pen icons" ></i>
                            </button>
                            <button className='delete' onClick={() => handleDeleteMatch(match._id)}>
                                <i className="fa-solid fa-trash icons"></i>
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p>Không có trận đấu nào.</p>
            )}
        </div>
    );
};

export default MatchList;