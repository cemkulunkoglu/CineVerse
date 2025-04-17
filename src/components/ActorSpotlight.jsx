import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ActorSpotlight.css';

const ActorSpotlight = () => {
    const [actor, setActor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActor = async () => {
            try {
                const apiKey = import.meta.env.VITE_TMDB_API_KEY;
                
                // Popüler oyuncuları çek
                const response = await fetch(
                    `https://api.themoviedb.org/3/person/popular?api_key=${apiKey}&language=tr-TR&page=1`
                );
                const data = await response.json();
                
                // Rastgele bir oyuncu seç
                const randomIndex = Math.floor(Math.random() * data.results.length);
                const selectedActor = data.results[randomIndex];
                
                // Seçilen oyuncunun detaylarını çek
                const actorDetailsResponse = await fetch(
                    `https://api.themoviedb.org/3/person/${selectedActor.id}?api_key=${apiKey}&language=tr-TR&append_to_response=movie_credits`
                );
                const actorDetails = await actorDetailsResponse.json();
                
                setActor(actorDetails);
                setLoading(false);
            } catch (err) {
                console.error('Oyuncu bilgileri yüklenirken hata:', err);
                setLoading(false);
            }
        };

        fetchActor();
    }, []);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    if (!actor) return null;

    // En popüler 3 filmi al
    const topMovies = actor.movie_credits.cast
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 3);

    return (
        <section className="actor-spotlight-section">
            <h2 className="section-title">Haftanın Oyuncusu</h2>
            <div className="actor-spotlight-container">
                <div className="actor-profile">
                    <div className="actor-image">
                        <img 
                            src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} 
                            alt={actor.name}
                        />
                    </div>
                    <div className="actor-info">
                        <h3>{actor.name}</h3>
                        <div className="actor-meta">
                            <span className="birthday">
                                🎂 {new Date(actor.birthday).toLocaleDateString('tr-TR')}
                            </span>
                            {actor.deathday && (
                                <span className="deathday">
                                    ✝️ {new Date(actor.deathday).toLocaleDateString('tr-TR')}
                                </span>
                            )}
                        </div>
                        <p className="biography">{actor.biography}</p>
                    </div>
                </div>
                
                <div className="top-movies">
                    <h4>Öne Çıkan Filmleri</h4>
                    <div className="movies-list">
                        {topMovies.map(movie => (
                            <Link 
                                key={movie.id} 
                                to={`/movie/${movie.id}`}
                                className="movie-item"
                            >
                                <img 
                                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
                                    alt={movie.title}
                                />
                                <span>{movie.title}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ActorSpotlight; 