import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/FeaturedCarousel.css';

const FeaturedCarousel = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === movies.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [movies.length]);

  if (!movies || movies.length === 0) return null;

  return (
    <div id="featuredCarousel" className="carousel slide mb-6">
      <div className="carousel-indicators">
        {movies.map((_, index) => (
          <button
            key={index}
            type="button"
            data-target="#featuredCarousel"
            className={index === currentIndex ? 'active' : ''}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      <div className="carousel-inner">
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
          >
            <div
              className="carousel-backdrop"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
              }}
            />
            <div className="container">
              <div className="carousel-caption">
                <h1>{movie.title}</h1>
                <p className="overview">{movie.overview}</p>
                <div className="meta-info">
                  <span className="rating">⭐ {movie.vote_average.toFixed(1)}</span>
                  <span className="year">
                    {new Date(movie.release_date).getFullYear()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        onClick={() =>
          setCurrentIndex(prev => (prev === 0 ? movies.length - 1 : prev - 1))
        }
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Önceki</span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        onClick={() =>
          setCurrentIndex(prev => (prev === movies.length - 1 ? 0 : prev + 1))
        }
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Sonraki</span>
      </button>
    </div>
  );
};

export default FeaturedCarousel; 