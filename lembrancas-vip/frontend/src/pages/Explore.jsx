import React, { useState, useEffect } from 'react';
import { SectionTitle, SectionSubtitle, GridContainer, ProductCard, CTAButton } from './Home.styles';
import { getImageUrl } from '../services/productService';
import { FaSearch } from 'react-icons/fa';
import api from '../api/axios';

import { SearchBar } from './Explore.styles';

const Explore = () => {
  const [memorials, setMemorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMemorials = async () => {
      try {
        setLoading(true);
        const response = await api.get('/memorials');
        setMemorials(response.data);
        setError(null);
      } catch (err) {
        console.error('Erro ao buscar memoriais:', err);
        setError('Não foi possível carregar os memoriais. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchMemorials();
  }, []);

  const filteredMemorials = memorials.filter(m => 
    m.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (m.city && m.city.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.getFullYear();
  };

  return (
    <div style={{ paddingBottom: '5rem' }}>
      <SectionTitle>Explorar Memoriais</SectionTitle>
      <SectionSubtitle>Conheça as histórias preservadas em nossa plataforma</SectionSubtitle>
      
      <SearchBar>
        <input 
          type="text" 
          placeholder="Buscar por nome ou cidade..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button><FaSearch /></button>
      </SearchBar>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#718096' }}>Carregando memoriais...</div>
      ) : error ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#E53E3E' }}>{error}</div>
      ) : (
        <GridContainer>
          {filteredMemorials.length > 0 ? (
            filteredMemorials.map((m) => (
              <ProductCard key={m.id}>
                <div style={{ height: '250px', overflow: 'hidden', borderRadius: '15px', marginBottom: '1.5rem', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img 
                    src={getImageUrl(m.main_photo)} 
                    alt={m.full_name} 
                    style={{ height: '100%', width: '100%', objectFit: 'contain' }} 
                  />
                </div>
                <h3 style={{ height: 'auto', marginBottom: '0.5rem' }}>{m.full_name}</h3>
                <p style={{ color: '#718096', marginBottom: '0.5rem' }}>
                  {formatDate(m.birth_date)} - {formatDate(m.death_date)}
                </p>
                <p style={{ color: '#A0AEC0', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                  {m.city}{m.state ? ` / ${m.state}` : ''}
                </p>
                <CTAButton to={`/memorial/${m.slug}`}>Visitar Memorial</CTAButton>
              </ProductCard>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: '#718096' }}>
              Nenhum memorial encontrado para "{searchTerm}".
            </div>
          )}
        </GridContainer>
      )}
    </div>
  );
};

export default Explore;
