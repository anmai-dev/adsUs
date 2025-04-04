import "./Navbar.scss";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { logoutSuccess } from '../redux/authSlice';

const Navbar = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        document.body.style.overflow = 'auto';
    };

    const handleLogout = () => {
        closeMenu();
        dispatch(logoutSuccess());
        navigate("/login");
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMenuOpen && !event.target.closest('.nav-items') && !event.target.closest('.menu-icon')) {
                closeMenu();
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isMenuOpen]);

    return (
        <div className="navbar">
            <div className="container">
                <div className="nav-left">
                    <Link to="/home" className="logo">24H-FB
                    </Link>

                    <div className={`nav-items ${isMenuOpen ? 'active' : ''}`}>
                        <Link to="/posts" className="nav-item" onClick={closeMenu}>News</Link>
                        <Link to="/link" className="nav-item" onClick={closeMenu}>Link</Link>
                        <Link to="/videos" className="nav-item" onClick={closeMenu}>Entertainment</Link>
                        <Link to="/schedule" className="nav-item" onClick={closeMenu}>FootBall </Link>
                        {user && user.admin && (
                            <Link to="/admin" className="nav-item" onClick={closeMenu}>Quản lý hệ thống</Link>
                        )}
                        {user ? (
                            <>
                                <div className="info">Welcome, {user.username}</div>
                                <div className="logout" onClick={handleLogout}>Logout</div>
                            </>
                        ) : (
                            <Link to="/login" className="nav-item" onClick={closeMenu}>Login</Link>
                        )}
                    </div>

                    <div className={`menu-icon ${isMenuOpen ? 'active' : ''}`} onClick={(e) => {
                        e.stopPropagation();
                        toggleMenu();
                    }}>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;