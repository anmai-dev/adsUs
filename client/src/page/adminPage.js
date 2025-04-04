import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import "./adminPage.scss";

const AdminPage = () => {
    const [showSystemManagement, setShowSystemManagement] = useState(false);
    const location = useLocation();

    const toggleSystemManagement = () => {
        setShowSystemManagement(!showSystemManagement);
    };

    return (
        <div className="adminpage">
           
            <div className='quanli'>
                <div className="sidebar">
                    <ul>
                        <li>
                            <Link 
                                to="/admin/users" 
                                className={location.pathname === '/admin/users' ? 'active' : ''}
                            >
                                Quản lý người dùng
                            </Link>
                        </li>
                        <li className="system-management-title" onClick={toggleSystemManagement}>
                            Quản lý hệ thống
                            {showSystemManagement && (
                                <ul className="sub-menu">
                                    <li>
                                        <Link 
                                            to="/admin/manage-schedule"
                                            className={location.pathname === '/admin/manage-schedule' ? 'active' : ''}
                                        >
                                            Quản lý lịch đá bóng
                                        </Link>
                                    </li>
                                    <li>
                                        <Link 
                                            to="/admin/manage-posts"
                                            className={location.pathname === '/admin/manage-posts' ? 'active' : ''}
                                        >
                                            Quản lý bài báo
                                        </Link>
                                    </li>
                                    <li>
                                        <Link 
                                            to="/admin/manage-videos"
                                            className={location.pathname === '/admin/manage-videos' ? 'active' : ''}
                                        >
                                            Quản lý video
                                        </Link>
                                    </li>
                                    <li>
                                        <Link 
                                            to="/admin/manage-links"
                                            className={location.pathname === '/admin/manage-links' ? 'active' : ''}
                                        >
                                            Quản lý liên kết
                                        </Link> 
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </div>
                <div className="content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminPage;