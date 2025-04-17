import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/MovieCard.css';

const MovieCard = ({ movie }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}&language=tr-TR`
        );

        if (!response.ok) {
          throw new Error('Fragman yüklenirken bir hata oluştu');
        }

        const data = await response.json();
        const trailer = data.results.find(video => video.type === 'Trailer');
        if (trailer) {
          setTrailerKey(trailer.key);
        }
      } catch (err) {
        console.error('Fragman yüklenemedi:', err);
      }
    };

    if (isHovered) {
      fetchTrailer();
    }
  }, [movie.id, isHovered]);

  return (
    <div
      className="movie-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/movie/${movie.id}`}>
        <div className="movie-poster">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            loading="lazy"
          />
          {isHovered && trailerKey && (
            <div className="trailer-overlay">
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}`}
                title={`${movie.title} Fragmanı`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>
        <div className="movie-info">
          <h3>{movie.title}</h3>
          <div className="movie-meta">
            <span className="rating">
              ⭐ {movie.vote_average.toFixed(1)}
            </span>
            <span className="release-date">
              {new Date(movie.release_date).toLocaleDateString('tr-TR')}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard; 