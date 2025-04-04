import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const SystemManagement = () => {
    return (
        <div className="systemManagement">
            <h2>Quản lý hệ thống</h2>
            <ul>
                <li><Link to="manage-posts">Quản lý bài viết</Link></li>
                <li><Link to="manage-videos">Quản lý video</Link></li>
                <li><Link to="manage-schedule">Quản lý lịch bóng đá</Link></li>
            </ul>
            <Outlet />
        </div>
    );
}

export default SystemManagement;