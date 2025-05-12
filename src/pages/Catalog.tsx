import '../index.css';
import { AutoScroll, HtmlLoader } from '../index1.js';
import { useNavigate } from 'react-router-dom';
import Layout from '../layouts/Layout'
import carImg from '../resources/imgs/car.png';
import inventoryImg from '../resources/imgs/inventory.png';
import recommendationImg from '../resources/imgs/recommendation.png';
import lingcopinesImg from '../resources/imgs/lingcopines.jpg';
import linaImg from '../resources/imgs/lina.jpg';
import listangcoImg from '../resources/imgs/listangco.jpg';
import lobrioImg from '../resources/imgs/lobrio.jpg';
import lopezImg from '../resources/imgs/lopez.jpg';
import filterIcon from '../resources/imgs/filter.png';
import React, { useState, useRef, useEffect } from 'react';

type CatalogItem = { title: string; image: string };

function Catalog() {
        const navigate = useNavigate();
    const [selected, setSelected] = useState<CatalogItem | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const filterRef = useRef<HTMLDivElement>(null);
    const [selectedType, setSelectedType] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');

    // Example catalog items
    const catalogItems: CatalogItem[] = [
      { title: 'Car', image: carImg },
      { title: 'Inventory', image: inventoryImg },
      { title: 'Recommendation', image: recommendationImg },
      { title: 'Lingcopines', image: lingcopinesImg },
      { title: 'Lina', image: linaImg },
      { title: 'Listangco', image: listangcoImg },
      { title: 'Lobrio', image: lobrioImg },
      { title: 'Lopez', image: lopezImg },
    ];

    const carModels: {
      [brand: string]: {
        [type: string]: string[];
      };
    } = {
      Toyota: {
        Hatchback: ['Yaris', 'Aqua'],
        Sedan: ['Corolla', 'Camry'],
        SUV: ['RAV4', 'Fortuner'],
        Any: ['Corolla', 'Camry', 'Yaris', 'Aqua', 'RAV4', 'Fortuner'],
      },
      Honda: {
        Hatchback: ['Fit', 'Jazz'],
        Sedan: ['Civic', 'Accord'],
        SUV: ['CR-V', 'HR-V'],
        Any: ['Civic', 'Accord', 'Fit', 'Jazz', 'CR-V', 'HR-V'],
      },
      Ford: {
        Hatchback: ['Fiesta'],
        Sedan: ['Focus', 'Fusion'],
        SUV: ['Escape', 'Explorer'],
        Any: ['Fiesta', 'Focus', 'Fusion', 'Escape', 'Explorer'],
      },
      // ... add more brands and types as needed
    };

    // Get model options based on selected brand and type
    const getModelOptions = () => {
      if (!selectedBrand || !carModels[selectedBrand]) return [];
      if (selectedType && carModels[selectedBrand][selectedType]) {
        return carModels[selectedBrand][selectedType];
      }
      return carModels[selectedBrand]['Any'] || [];
    };

    // Close dropdown on outside click
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
          setShowFilter(false);
        }
      }
      if (showFilter) {
        document.addEventListener('mousedown', handleClickOutside);
      } else {
        document.removeEventListener('mousedown', handleClickOutside);
      }
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [showFilter]);

    // Modal component
    const Modal: React.FC<{ item: CatalogItem; onClose: () => void }> = ({ item, onClose }) => (
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
      }} onClick={onClose}>
        <div style={{ background: '#fff', borderRadius: 16, padding: 32, minWidth: 320, minHeight: 320, position: 'relative', boxShadow: '0 4px 32px rgba(0,0,0,0.2)' }} onClick={e => e.stopPropagation()}>
          <button onClick={onClose} style={{ position: 'absolute', top: 8, right: 16, fontSize: 24, background: 'none', border: 'none', cursor: 'pointer' }}>&times;</button>
          <div
            style={{
              width: 320,
              height: 220,
              background: '#fff',
              borderRadius: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              boxShadow: '0 2px 12px rgba(184, 184, 184, 0.08)',
              overflow: 'hidden',
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'cover',
                borderRadius: 20,
                boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
              }}
            />
          </div>
          <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.5rem', color: '#333' }}>{item.title}</div>
        </div>
      </div>
    );

    return (
        <Layout>
          <main>
            <div
              style={{
                width: '100vw',
                minHeight: 'calc(100vh - 60px)',
                background: 'var(--primary-color-l3)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                padding: 0,
                margin: 0,
              }}
            >
              {/* Filter Button and Dropdown */}
              <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '1rem 2rem 0 2rem', position: 'relative', zIndex: 10 }}>
                <button
                  onClick={() => setShowFilter(v => !v)}
                  style={{
                    background: '#fff',
                    border: '1px solid #ccc',
                    borderRadius: '50%',
                    width: 48,
                    height: 48,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    cursor: 'pointer',
                    transition: 'background 0.2s, box-shadow 0.2s',
                    padding: 0
                  }}
                  title="Filter cars"
                  aria-label="Filter cars"
                >
                  <img src={filterIcon} alt="Filter" style={{ width: 28, height: 28, objectFit: 'contain' }} />
                </button>
                {showFilter && (
                  <div ref={filterRef} style={{
                    position: 'absolute',
                    top: 60,
                    right: 0,
                    background: '#fff',
                    border: '1px solid #ccc',
                    borderRadius: 12,
                    boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
                    padding: '1.5rem',
                    minWidth: 240,
                    zIndex: 100,
                    width: '90vw',
                    maxWidth: 320,
                  }}>
                    <div style={{ fontWeight: 'bold', marginBottom: 12, fontSize: '1.1rem', color: '#333' }}>Filter Cars</div>
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ fontWeight: 500, color: '#555' }}>Type:</label>
                      <select
                        style={{ width: '100%', marginTop: 4, padding: 6, borderRadius: 6, border: '1px solid #ccc' }}
                        value={selectedType}
                        onChange={e => {
                          setSelectedType(e.target.value);
                          setSelectedModel(''); // reset model
                        }}
                      >
                        <option value="">Any</option>
                        <option value="Sedan">Sedan</option>
                        <option value="Hatchback">Hatchback</option>
                        <option value="SUV">SUV (Sport Utility Vehicle)</option>
                        <option value="Crossover">Crossover</option>
                        <option value="Coupe">Coupe</option>
                        <option value="Convertible">Convertible</option>
                        <option value="Wagon">Wagon (Estate)</option>
                        <option value="Pickup Truck">Pickup Truck</option>
                        <option value="Van">Van</option>
                        <option value="Minivan">Minivan</option>
                        <option value="Roadster">Roadster</option>
                        <option value="Sports Car">Sports Car</option>
                        <option value="Luxury Car">Luxury Car</option>
                        <option value="Electric Car">Electric Car (EV)</option>
                        <option value="Hybrid Car">Hybrid Car</option>
                      </select>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ fontWeight: 500, color: '#555' }}>Brand:</label>
                      <select
                        style={{ width: '100%', marginTop: 4, padding: 6, borderRadius: 6, border: '1px solid #ccc' }}
                        value={selectedBrand}
                        onChange={e => {
                          setSelectedBrand(e.target.value);
                          setSelectedModel(''); // reset model
                        }}
                      >
                        <option value="">Any</option>
                        <option value="Toyota">Toyota</option>
                        <option value="Honda">Honda</option>
                        <option value="Ford">Ford</option>
                        <option value="Chevrolet">Chevrolet</option>
                        <option value="BMW">BMW</option>
                        <option value="Mercedes-Benz">Mercedes-Benz</option>
                        <option value="Volkswagen">Volkswagen</option>
                        <option value="Hyundai">Hyundai</option>
                        <option value="Nissan">Nissan</option>
                        <option value="Kia">Kia</option>
                        <option value="Audi">Audi</option>
                        <option value="Tesla">Tesla</option>
                        <option value="Lexus">Lexus</option>
                        <option value="Subaru">Subaru</option>
                        <option value="Porsche">Porsche</option>
                      </select>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ fontWeight: 500, color: '#555' }}>Model:</label>
                      <select
                        style={{ width: '100%', marginTop: 4, padding: 6, borderRadius: 6, border: '1px solid #ccc' }}
                        value={selectedModel}
                        onChange={e => setSelectedModel(e.target.value)}
                        disabled={!selectedBrand}
                      >
                        <option value="">Any</option>
                        {getModelOptions().map((model: string) => (
                          <option key={model} value={model}>{model}</option>
                        ))}
                      </select>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ fontWeight: 500, color: '#555' }}>Fuel Type:</label>
                      <select style={{ width: '100%', marginTop: 4, padding: 6, borderRadius: 6, border: '1px solid #ccc' }}>
                        <option value="">Any</option>
                        <option value="Gasoline">Gasoline</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Electric">Electric</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="LPG">LPG</option>
                        <option value="CNG">CNG</option>
                      </select>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ fontWeight: 500, color: '#555' }}>Transmission:</label>
                      <select style={{ width: '100%', marginTop: 4, padding: 6, borderRadius: 6, border: '1px solid #ccc' }}>
                        <option value="">Any</option>
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                        <option value="CVT">CVT</option>
                        <option value="Dual-Clutch">Dual-Clutch</option>
                        <option value="Semi-Automatic">Semi-Automatic</option>
                      </select>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ fontWeight: 500, color: '#555' }}>Primary Color:</label>
                      <select style={{ width: '100%', marginTop: 4, padding: 6, borderRadius: 6, border: '1px solid #ccc' }}>
                        <option value="">Any</option>
                        <option value="Black">Black</option>
                        <option value="White">White</option>
                        <option value="Silver">Silver</option>
                        <option value="Red">Red</option>
                        <option value="Blue">Blue</option>
                        <option value="Green">Green</option>
                        <option value="Yellow">Yellow</option>
                        <option value="Orange">Orange</option>
                        <option value="Brown">Brown</option>
                        <option value="Gold">Gold</option>
                        <option value="Gray">Gray</option>
                        <option value="Purple">Purple</option>
                      </select>
                    </div>
                    <button
                      style={{
                        marginTop: 12,
                        width: '100%',
                        padding: 8,
                        borderRadius: 6,
                        background: '#333',
                        color: '#fff',
                        border: 'none',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'background 0.18s, transform 0.12s',
                      }}
                      onMouseOver={e => {
                        e.currentTarget.style.background = '#222';
                        e.currentTarget.style.transform = 'scale(1.03)';
                      }}
                      onMouseOut={e => {
                        e.currentTarget.style.background = '#333';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                      onMouseDown={e => {
                        e.currentTarget.style.background = '#111';
                        e.currentTarget.style.transform = 'scale(0.98)';
                      }}
                      onMouseUp={e => {
                        e.currentTarget.style.background = '#222';
                        e.currentTarget.style.transform = 'scale(1.03)';
                      }}
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>
              {/* Catalog Grid */}
              <div
                className="main_div_wrapper"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '1rem',
                  width: '100%',
                  maxWidth: '1400px',
                  margin: '0 auto',
                  padding: '1rem',
                  boxSizing: 'border-box',
                  minHeight: 'calc(100vh - 120px)',
                }}
              >
                {catalogItems.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: '100%',
                      aspectRatio: '1 / 1',
                      background: 'linear-gradient(180deg, #fff 70%, #f6f7fb 100%)',
                      borderRadius: 20,
                      boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'transform 0.18s, box-shadow 0.18s, opacity 0.7s',
                      opacity: 0,
                      animation: `fadeIn 0.7s ease ${idx * 0.1}s forwards`,
                      position: 'relative',
                    }}
                    onClick={() => { setSelected(item); setShowModal(true); }}
                    onMouseOver={e => {
                      e.currentTarget.style.transform = 'scale(1.04)';
                      e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.16)';
                    }}
                    onMouseOut={e => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.10)';
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: 180,
                        background: '#f3f4f8',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderTopLeftRadius: 20,
                          borderTopRightRadius: 20,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        }}
                      />
                          </div>
                    <div style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '1.5rem 1rem 1.5rem 1rem',
                      background: 'rgba(255,255,255,0.95)',
                    }}>
                      <div style={{
                        textAlign: 'center',
                        fontWeight: 800,
                        fontSize: '1.5rem',
                        color: '#222',
                        letterSpacing: '0.5px',
                        textShadow: '0 1px 2px rgba(0,0,0,0.04)'
                      }}>
                        {item.title}
                          </div>
                          </div>
                  </div>
                ))}
              </div>
              {/* Modal */}
              {showModal && selected && <Modal item={selected} onClose={() => setShowModal(false)} />}
              </div>
          </main>
          {/* Fade-in animation keyframes */}
          <style>{`
            @keyframes fadeIn {
              to { opacity: 1; }
            }
            @media (max-width: 1200px) {
              .main_div_wrapper {
                grid-template-columns: repeat(3, 1fr) !important;
              }
            }
            @media (max-width: 900px) {
              .main_div_wrapper {
                grid-template-columns: repeat(2, 1fr) !important;
              }
            }
            @media (max-width: 600px) {
              .main_div_wrapper {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
        </Layout>
    );
  }

export default Catalog;