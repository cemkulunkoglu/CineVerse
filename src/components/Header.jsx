import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const dropdownRef = useRef(null); // 🔸 referans

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-text">CineVerse</span>
        </Link>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/movies" className="nav-link">Filmler</Link>
            </li>
            <li className="nav-item">
              <Link to="/upcoming" className="nav-link">Yakında Gelecekler</Link>
            </li>
            <li className="nav-item">
              <Link to="/people" className="nav-link">Oyuncular</Link>
            </li>
            <li className="nav-item">
              <Link to="/favorites" className="nav-link">Favorilerim</Link>
            </li>
          </ul>
        </nav>

        <div className="search-container">
          <input
            type="text"
            placeholder="Film veya oyuncu ara..."
            className="search-input"
          />
          <button className="search-button">
            <i className="fas fa-search"></i>
          </button>
        </div>

        <div className="dropdown" ref={dropdownRef}>
          <button
            className="dropdown-toggle"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            <i className="fas fa-user"></i>
          </button>

          {isUserMenuOpen && (
            <ul className="dropdown-menu">
              <li>
                <Link to="/login" className="dropdown-item">
                  <i className="fas fa-sign-in-alt"></i>
                  Giriş Yap
                </Link>
              </li>
              <li>
                <Link to="/register" className="dropdown-item">
                  <i className="fas fa-user-plus"></i>
                  Üye Ol
                </Link>
              </li>
            </ul>
          )}
        </div>

        <button
          className={`menu-button ${isMenuOpen ? 'menu-open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="menu-line"></span>
          <span className="menu-line"></span>
          <span className="menu-line"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
