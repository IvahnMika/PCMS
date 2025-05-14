import React from 'react';
import Layout from '../layouts/Layout';
import '../index.css';
import './css/CarInfo.css';
import fortunerImg from '../resources/Featcars/Fortuner.png';
import { useNavigate } from 'react-router-dom';

const carData = {
  name: 'Toyota Fortuner',
  manufacturer: 'Toyota',
  engine: '2.8L Diesel Turbo',
  type: 'SUV',
  features: [
    '7-seater capacity',
    '4WD capability',
    'Touchscreen infotainment',
    'Advanced safety features',
    'LED Headlamps',
    'Automatic Climate Control',
  ],
  price: '₱2,400,000',
  colors: ['#1a1a1a', '#ffffff', '#b0b0b0', '#d32f2f'], // Black, White, Silver, Red
  colorNames: ['Black', 'White', 'Silver', 'Red'],
  image: fortunerImg,
  description: 'The Toyota Fortuner is a robust and stylish SUV designed for both urban and off-road adventures. With its powerful engine, advanced safety features, and spacious 7-seater interior, it offers comfort, reliability, and versatility for families and explorers alike.'
};

const CarInfo = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="carinfo-main">
        <button
          style={{
            margin: '2rem 0 1rem 0',
            padding: '0.7rem 2.2rem',
            background: 'var(--primary-blue)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 700,
            fontSize: '1.1rem',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(141,201,225,0.08)',
            letterSpacing: '0.03em',
            transition: 'background 0.2s, transform 0.2s',
          }}
          onClick={() => navigate('/Catalog')}
        >
          ← Back to Catalog
        </button>
        <div className="carinfo-hero">
          <div className="carinfo-image-wrapper">
            <img src={carData.image} alt={carData.name} className="carinfo-image" />
          </div>
          <div className="carinfo-details">
            <h1 className="carinfo-title">{carData.name}</h1>
            <div className="carinfo-meta">
              <p><strong>Manufacturer:</strong> {carData.manufacturer}</p>
              <p><strong>Engine:</strong> {carData.engine}</p>
              <p><strong>Car Type:</strong> {carData.type}</p>
              <p><strong>Price:</strong> {carData.price}</p>
              <div className="carinfo-colors">
                <strong>Colors Available:</strong>
                <div className="carinfo-color-list">
                  {carData.colors.map((color, idx) => (
                    <div key={color} className="carinfo-color-item">
                      <span className="carinfo-color-dot" style={{ backgroundColor: color }}></span>
                      <span className="carinfo-color-name">{carData.colorNames[idx]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="carinfo-desc-text" style={{marginTop: '1.5rem'}}>{carData.description}</p>
          </div>
        </div>
        <div className="carinfo-features-row">
          <div className="carinfo-features">
            <h2 className="carinfo-features-title">Features</h2>
            <ul className="carinfo-features-list">
              {carData.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
          <div className="carinfo-features-image-wrapper">
            <img src={carData.image} alt={carData.name + ' side'} className="carinfo-features-image" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CarInfo;
