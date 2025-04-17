import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import '../styles/GenreExplorer.css';

const GenreExplorer = () => {
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [genreMovies, setGenreMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const apiKey = import.meta.env.VITE_TMDB_API_KEY;
                const response = await fetch(
                    `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=tr-TR`
                );
                const data = await response.json();
                setGenres(data.genres);
                if (data.genres.length > 0) {
                    setSelectedGenre(data.genres[0].id);
                }
                setLoading(false);
            } catch (err) {
                console.error('Türler yüklenirken hata:', err);
                setLoading(false);
            }
        };

        fetchGenres();
    }, []);

    useEffect(() => {
        const fetchMoviesByGenre = async () => {
            if (!selectedGenre) return;

            try {
                const apiKey = import.meta.env.VITE_TMDB_API_KEY;
                const response = await fetch(
                    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=tr-TR&with_genres=${selectedGenre}&sort_by=popularity.desc&page=1`
                );
                const data = await response.json();
                setGenreMovies(data.results.slice(0, 15));
            } catch (err) {
                console.error('Türe göre filmler yüklenirken hata:', err);
            }
        };

        fetchMoviesByGenre();
    }, [selectedGenre]);

    const handleGenreSelect = (genreId) => {
        setSelectedGenre(genreId === selectedGenre ? null : genreId);
    };

    const selectedGenreName = genres.find(g => g.id === selectedGenre)?.name;

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    return (
        <section className="genres-section">
            <div className="container">
                <h2 className="section-title">Türlere Göre Keşfet</h2>
                <div className="genre-filters">
                    {genres.map(genre => (
                        <button
                            key={genre.id}
                            className={`genre-button ${selectedGenre === genre.id ? 'active' : ''}`}
                            onClick={() => handleGenreSelect(genre.id)}
                        >
                            {genre.name}
                        </button>
                    ))}
                </div>
                {selectedGenre && genreMovies.length > 0 && (
                    <>
                        <h3 className="genre-title">{selectedGenreName} Filmleri</h3>
                        <div className="movies-grid">
                            {genreMovies.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default GenreExplorer; 