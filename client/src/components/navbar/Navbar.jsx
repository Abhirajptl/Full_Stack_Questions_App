import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = ({ onSearch }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSearch = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        onSearch(query); // Pass search input to Home.jsx
    };

    return (
        <nav className="navbar">
            <div className="navbar__logo">
                <span className="navbar__logo-text">QuestionBank</span>
                <button className="navbar__menu-button" onClick={toggleMenu}>
                    ☰
                </button>
            </div>
            <div className={`navbar__content ${isMenuOpen ? 'active' : ''}`}>
                <ul className="navbar__links">
                    <li><Link to="/" className="navbar__link">Home</Link></li>
                    <li><Link to="/createpost" className="navbar__link">Create Post</Link></li>
                </ul>
                <div className="navbar__search">
                    <input 
                        type="text" 
                        placeholder="Search by topic..." 
                        className="navbar__search-input" 
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <button className="navbar__search-button">🔍</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;


