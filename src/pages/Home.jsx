import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import FeaturedCarousel from '../components/FeaturedCarousel';
import GenreExplorer from '../components/GenreExplorer';
import WeeklyPick from '../components/WeeklyPick';
import ActorSpotlight from '../components/ActorSpotlight';
import FilmWorld from '../components/FilmWorld';
import '../styles/Home.css';

const Home = () => {
    const [popularMovies, setPopularMovies] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('popular');

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const apiKey = import.meta.env.VITE_TMDB_API_KEY;

                // Her kategoriden 2 sayfa veri çekelim
                const fetchTwoPages = async (endpoint) => {
                    const [page1, page2] = await Promise.all([
                        fetch(`${endpoint}&page=1`),
                        fetch(`${endpoint}&page=2`)
                    ]);

                    const data1 = await page1.json();
                    const data2 = await page2.json();

                    return [...data1.results.slice(0, 12), ...data2.results.slice(0, 3)];
                };

                // En iyi filmleri çekelim
                const fetchTopRated = async () => {
                    const response = await fetch(
                        `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=tr-TR&page=1`
                    );
                    const data = await response.json();
                    return data.results.slice(0, 15);
                };

                // Öne çıkan filmler için özel sorgu
                const fetchFeatured = async () => {
                    const response = await fetch(
                        `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=tr-TR&page=1`
                    );
                    const data = await response.json();
                    return data.results.slice(0, 5);
                };

                // Tüm API çağrılarını paralel yapalım
                const [popularMovies, trendingMovies, upcomingMovies, topRatedMovies] = await Promise.all([
                    fetchTwoPages(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=tr-TR`),
                    fetchTwoPages(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&language=tr-TR`),
                    fetchTwoPages(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=tr-TR`),
                    fetchTopRated(),
                    fetchFeatured()
                ]);

                setPopularMovies(popularMovies);
                setTrendingMovies(trendingMovies);
                setUpcomingMovies(upcomingMovies);
                setTopRatedMovies(topRatedMovies);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    const getActiveMovies = () => {
        switch (activeTab) {
            case 'popular':
                return popularMovies;
            case 'trending':
                return trendingMovies;
            case 'upcoming':
                return upcomingMovies;
            case 'topRated':
                return topRatedMovies;
            default:
                return popularMovies;
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <h2>Hata</h2>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="home">
            <div className='container my-5'>
                <FeaturedCarousel movies={popularMovies.slice(0, 5)} />
                <WeeklyPick />
                <ActorSpotlight />
            </div>
            <FilmWorld />
            <div className='container my-5'>
                <section className="categories-section">
                    <div className="category-tabs">
                        <button
                            className={`tab ${activeTab === 'popular' ? 'active' : ''}`}
                            onClick={() => setActiveTab('popular')}
                        >
                            Popüler Filmler
                        </button>
                        <button
                            className={`tab ${activeTab === 'trending' ? 'active' : ''}`}
                            onClick={() => setActiveTab('trending')}
                        >
                            Trend Filmler
                        </button>
                        <button
                            className={`tab ${activeTab === 'upcoming' ? 'active' : ''}`}
                            onClick={() => setActiveTab('upcoming')}
                        >
                            Yakında
                        </button>
                        <button
                            className={`tab ${activeTab === 'topRated' ? 'active' : ''}`}
                            onClick={() => setActiveTab('topRated')}
                        >
                            Tüm Zamanların En İyileri
                        </button>
                    </div>
                </section>
                <section className="movies-grid">
                    {getActiveMovies().map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </section>

                <GenreExplorer />
            </div>

        </div>
    );
};

export default Home; 