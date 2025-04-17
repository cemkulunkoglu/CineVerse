import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3 className="footer-title">CineVerse</h3>
                    <p className="footer-description">
                        CineVerse, sinema dünyasının kapılarını aralamak isteyen herkes için hazırlandı. Yenilikçi, dinamik ve tamamen film odaklı.
                    </p>
                    <div className="social-links">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                            <i className="fab fa-x-twitter"></i>
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                            <i className="fab fa-youtube"></i>
                        </a>
                    </div>
                </div>

                <div className="footer-section">
                    <h4>Hızlı Bağlantılar</h4>
                    <ul className="footer-links">
                        <li><Link to="/">Ana Sayfa</Link></li>
                        <li><Link to="/movies">Filmler</Link></li>
                        <li><Link to="/upcoming">Yakında Gelecekler</Link></li>
                        <li><Link to="/actors">Oyuncular</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Kategoriler</h4>
                    <ul className="footer-links">
                        <li><Link to="/genre/action">Aksiyon</Link></li>
                        <li><Link to="/genre/drama">Drama</Link></li>
                        <li><Link to="/genre/comedy">Komedi</Link></li>
                        <li><Link to="/genre/horror">Korku</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>İletişim</h4>
                    <ul className="contact-info">
                        <li>
                            <i className="fas fa-envelope"></i>
                            <a href="mailto:info@cineverse.com">info@cineverse.com</a>
                        </li>
                        <li>
                            <i className="fas fa-phone"></i>
                            <a href="tel:+902121234567">+90 (212) 123 45 67</a>
                        </li>
                        <li>
                            <i className="fas fa-map-marker-alt"></i>
                            <span>İstanbul, Türkiye</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-info">
                    <p>&copy; {currentYear} CineVerse. Tüm hakları saklıdır.</p>
                    <p>
                        Powered by{' '}
                        <a
                            href="https://www.themoviedb.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            TMDB
                        </a>
                    </p>
                </div>
                <div className="footer-links">
                    <Link to="/privacy">Gizlilik Politikası</Link>
                    <Link to="/terms">Kullanım Koşulları</Link>
                    <Link to="/contact">Bize Ulaşın</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 