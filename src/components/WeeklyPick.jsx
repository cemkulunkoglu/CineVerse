import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/WeeklyPick.css';

const WeeklyPick = () => {
    const [weeklyPick, setWeeklyPick] = useState(null);

    useEffect(() => {
        const fetchWeeklyPick = async () => {
            try {
                const apiKey = import.meta.env.VITE_TMDB_API_KEY;
                const response = await fetch(
                    `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&language=tr-TR`
                );
                const data = await response.json();
                const randomIndex = Math.floor(Math.random() * data.results.length);
                setWeeklyPick(data.results[randomIndex]);
            } catch (err) {
                console.error('Haftanın önerisi yüklenirken hata:', err);
            }
        };

        fetchWeeklyPick();
    }, []);

    return (
        <section className="weekly-pick-section">
            <h2 className="section-title">Haftanın Önerisi</h2>
            {weeklyPick && (
                <div className="weekly-pick-container">
                    <div className="weekly-pick-poster">
                        <img 
                            src={`https://image.tmdb.org/t/p/w500${weeklyPick.poster_path}`} 
                            alt={weeklyPick.title}
                        />
                    </div>
                    <div className="weekly-pick-info">
                        <h3>{weeklyPick.title}</h3>
                        <div className="movie-meta">
                            <span className="rating">
                                ⭐ {weeklyPick.vote_average.toFixed(1)}
                            </span>
                            <span className="year">
                                {new Date(weeklyPick.release_date).getFullYear()}
                            </span>
                        </div>
                        <p className="overview">{weeklyPick.overview}</p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default WeeklyPick; 