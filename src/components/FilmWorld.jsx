import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/FilmWorld.css';

const FilmWorld = () => {
  const sections = [
    {
      id: 1,
      title: 'Film Dünyası',
      icon: 'fas fa-film',
      description: 'Sinema dünyasının en son haberleri, röportajlar ve özel içerikler',
      link: '/film-world'
    },
    {
      id: 2,
      title: 'Ödüllü Filmler',
      icon: 'fas fa-award',
      description: 'Oscar, Altın Küre ve diğer prestijli ödülleri kazanan filmler',
      link: '/award-winning'
    },
    {
      id: 3,
      title: 'En İyi Yönetmenler',
      icon: 'fas fa-video',
      description: 'Sinema tarihine damga vuran yönetmenler ve başyapıtları',
      link: '/directors'
    }
  ];

  return (
    <section className="film-world">
      <div className="container">
        <h2 className="section-title">Keşfet</h2>
        <div className="film-world-grid">
          {sections.map((section) => (
            <Link to={section.link} key={section.id} className="film-world-card">
              <div className="card-icon">
                <i className={section.icon}></i>
              </div>
              <div className="card-content">
                <h3>{section.title}</h3>
                <p>{section.description}</p>
              </div>
              <div className="card-arrow">
                <i className="fas fa-chevron-right"></i>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FilmWorld; 