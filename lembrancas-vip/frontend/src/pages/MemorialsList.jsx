import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useMemorials } from '../contexts/MemorialContext';
import { FaPlus, FaDove, FaEye } from 'react-icons/fa';
import {
    PageHeader,
    Title,
    Greeting,
    CreateButton,
    Grid,
    MemorialCard,
    CardImage,
    CardBody,
    CardName,
    CardDates,
    EmptyState
} from './Dashboard.styles';

import api from '../api/axios';
import AdminMemorialList from './admin/AdminMemorialList';

const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('pt-BR');
};

const MemorialsList = () => {
    const { user } = useAuth();
    const { memorials, loading, loadMemorials } = useMemorials();
    const [filterGeneration, setFilterGeneration] = useState('todos');

    useEffect(() => {
        if (user?.role !== 'admin') {
            loadMemorials();
        }
    }, [loadMemorials, user]);

    if (user?.role === 'admin') {
        return <AdminMemorialList />;
    }


    const filteredMemorials = filterGeneration === 'todos' 
        ? memorials 
        : memorials.filter(m => m.generation === filterGeneration);

    const backendUrl = (api.defaults.baseURL || 'http://localhost/www/aplicacoes-placas-e-lapides/lembrancas-vip/backend').replace('/index.php', '');

    return (
        <>
                <PageHeader>
                    <div>
                        <Title>Lista de Memoriais</Title>
                        <Greeting>Gerencie todos os memoriais da família.</Greeting>
                    </div>
                    <CreateButton to="/memorial/create">
                        <FaPlus /> Novo Memorial
                    </CreateButton>
                </PageHeader>

                {loading ? (
                    <p style={{ color: '#5D6B76' }}>Carregando...</p>
                ) : memorials.length === 0 ? (
                    <EmptyState>
                        <FaDove />
                        <h2>Nenhum memorial ainda</h2>
                        <p>Crie o primeiro memorial e preserve uma memória para sempre.</p>
                        <CreateButton to="/memorial/create" style={{ display: 'inline-flex', marginTop: '1.5rem' }}>
                            <FaPlus /> Criar meu primeiro memorial
                        </CreateButton>
                    </EmptyState>
                ) : (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem', alignItems: 'center', gap: '1rem' }}>
                            <label style={{ color: '#4A5568', fontWeight: 'bold' }}>Filtrar por Vínculo Familiar:</label>
                            <select 
                                value={filterGeneration} 
                                onChange={(e) => setFilterGeneration(e.target.value)}
                                style={{ padding: '0.6rem 1rem', borderRadius: '8px', border: '1px solid #CBD5E0', backgroundColor: '#fff', color: '#2D3748' }}
                            >
                                <option value="todos">Todos os Familiares</option>
                                <option value="tataravos">Tataravôs(ós)</option>
                                <option value="bisavos">Bisavôs(ós)</option>
                                <option value="avos">Avôs(ós)</option>
                                <option value="pais">Pais</option>
                                <option value="tios">Tios(as)</option>
                                <option value="irmaos">Irmãos(ãs)</option>
                                <option value="filhos">Filhos(as)</option>
                                <option value="netos">Netos(as)</option>
                                <option value="bisnetos">Bisnetos(as)</option>
                                <option value="outros">Outros</option>
                            </select>
                        </div>
                        <Grid>
                            {filteredMemorials.map(m => (
                                <MemorialCard key={m.id} to={`/memorial/${m.slug}`}>
                                    <CardImage 
                                        style={m.main_photo ? { backgroundImage: `url(${backendUrl}/${m.main_photo})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                                    >
                                        {!m.main_photo && <FaDove />}
                                    </CardImage>
                                    <CardBody>
                                        <CardName>{m.full_name}</CardName>
                                        <CardDates>
                                            {formatDate(m.birth_date)} — {formatDate(m.death_date)}
                                        </CardDates>
                                        {m.city && <CardDates style={{ marginTop: '0.25rem' }}>{m.city}{m.state ? `, ${m.state}` : ''}</CardDates>}
                                        <div style={{ marginTop: '1.5rem', padding: '0.6rem', background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(212, 175, 55, 0.05) 100%)', color: '#D4AF37', borderRadius: '12px', textAlign: 'center', fontWeight: 'bold', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'all 0.3s' }} className="view-btn">
                                            <FaEye /> Visualizar Memorial
                                        </div>
                                    </CardBody>
                                </MemorialCard>
                            ))}
                        </Grid>
                    </>
                )}
            </>
    );
};

export default MemorialsList; // Re-compile force
