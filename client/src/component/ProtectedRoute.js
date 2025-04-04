import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    // Lấy thông tin người dùng từ Redux store
    const user = useSelector((state) => state.auth.login?.currentUser);

    // Nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
    if (!user) {
        return <Navigate to="/login" />;
    }

    // Nếu người dùng không phải là admin, chuyển hướng đến trang chủ
    if (!user.admin) {
        return <Navigate to="/home" />;
    }

    // Nếu người dùng là admin, render children (trang admin)
    return children;
};

export default ProtectedRoute;