import axios from "axios";

// Sử dụng môi trường biến hoặc URL mặc định
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

console.log("MatchService - API URL:", BASE_URL);

// Thêm interceptor để xử lý lỗi API toàn cục
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export const getMatch = async () => {
    try {
        // Sử dụng URL tuyệt đối và thêm tùy chọn CORS
        const url = `${BASE_URL}/api/match/`;
        console.log("Đang gửi request đến:", url);
        
        const response = await axios.get(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            withCredentials: false // Tắt withCredentials khi origin là '*'
        });
        
        console.log("Kết quả API trận đấu:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error getting matches:', error);
        console.error('Error details:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data
        });
        throw error;
    }
};