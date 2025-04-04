import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbars.scss';

const Navbars = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="navbar">
            <div className="navbar__container">
                <div className="navbar__logo">
                    <img
                        src="https://storage.googleapis.com/a1aa/image/qRQjDIqJ-3g9yoxuxo2-qdwRo3iUMHikQycdzclGlrI.jpg"
                        alt="Thể Thao 247 logo"
                        className="navbar__logo-img"
                    />
                    <img
                        src="https://storage.googleapis.com/a1aa/image/pO8l0Ka5hc8DLKCcpfyF4KgHEk5BlrBQ4ICpaULTlpQ.jpg"
                        alt="Vòng Loại Asian Cup 2027 logo"
                        className="navbar__logo-img ml-4"
                    />
                </div>
                <div className="navbar__actions">
                    <span className="navbar__advertisement">
                        <i className="fas fa-bullseye"></i> QUẢNG CÁO
                    </span>
                    <button className="navbar__button">Gửi bài</button>
                    <button className="navbar__button">Đăng ký</button>
                    <button className="navbar__button">Đăng nhập</button>
                </div>
            </div>
            <nav className="navbar__menu">
                <div className={`navbar__menu-container ${isMenuOpen ? 'active' : ''}`}>
                    <Link to="/lich-thi-dau" className="navbar__menu-item">#LỊCH THI ĐẤU</Link>
                    <Link to="/bong-da-viet-nam" className="navbar__menu-item">#BÓNG ĐÁ VIỆT NAM</Link>
                    <Link to="/ngoai-hang-anh" className="navbar__menu-item">#NGOẠI HẠNG ANH</Link>
                    <Link to="/cup-c1" className="navbar__menu-item">#CÚP C1</Link>
                    <Link to="/bong-da-quoc-te" className="navbar__menu-item">#BÓNG ĐÁ QUỐC TẾ</Link>
                    <Link to="/nhan-dinh" className="navbar__menu-item">#NHẬN ĐỊNH</Link>
                    <Link to="/chuyen-nhuong" className="navbar__menu-item">#CHUYỂN NHƯỢNG</Link>
                    <Link to="/the-thao" className="navbar__menu-item">#THỂ THAO</Link>
                    <Link to="/esports" className="navbar__menu-item">#ESPORTS</Link>
                    <Link to="/xe" className="navbar__menu-item">#XE</Link>
                    <Link to="/xu-huong" className="navbar__menu-item">#XU HƯỚNG</Link>
                </div>
                <button className="navbar__menu-toggle" onClick={toggleMenu}>
                    <i className="fas fa-bars"></i>
                </button>
            </nav>
        </header>
    );
};

export default Navbars;