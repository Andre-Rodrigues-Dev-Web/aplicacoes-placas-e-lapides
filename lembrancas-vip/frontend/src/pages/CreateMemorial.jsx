import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';
import { useMemorials } from '../contexts/MemorialContext';
import api from '../api/axios';
import { Link } from 'react-router-dom';
import {
    Container,
    Main,
    FormCard,
    Title,
    SectionTitle,
    FormGroup,
    Label,
    Input,
    TextArea,
    FileInputWrapper,
    SubmitButton,
    ErrorMsg,
    QRCodeContainer
} from './CreateMemorial.styles';

const CreateMemorial = () => {
    const { user } = useAuth();
    const { loadMemorials } = useMemorials();

    const [formData, setFormData] = useState({
        full_name: '',
        birth_date: '',
        death_date: '',
        biography: '',
        short_description: '', // Usado para hobbies
        generation: 'outros'
    });

    const [mainPhoto, setMainPhoto] = useState(null);
    const [gallery, setGallery] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [createdSlug, setCreatedSlug] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleMainPhotoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setMainPhoto(e.target.files[0]);
        }
    };

    const handleGalleryChange = (e) => {
        if (e.target.files) {
            setGallery(Array.from(e.target.files));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.full_name) {
            return setError('O nome completo é obrigatório.');
        }

        setLoading(true);

        const data = new FormData();
        data.append('user_id', user.id);
        data.append('full_name', formData.full_name);
        data.append('birth_date', formData.birth_date);
        data.append('death_date', formData.death_date);
        data.append('biography', formData.biography);
        data.append('short_description', formData.short_description);
        data.append('generation', formData.generation);

        if (mainPhoto) {
            data.append('main_photo', mainPhoto);
        }

        gallery.forEach((file) => {
            data.append('gallery[]', file);
        });

        try {
            const response = await api.post('/memorials', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setCreatedSlug(response.data.slug);
            loadMemorials(); // Atualiza o painel com o novo memorial
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao criar memorial.');
        } finally {
            setLoading(false);
        }
    };

    // URL pública gerada
    const publicUrl = createdSlug ? `${window.location.origin}/memorial/${createdSlug}` : '';

    return (
        <Container>
            <Header />
            <Main>
                <FormCard>
                    <Title>Criar Novo Memorial</Title>

                    {error && <ErrorMsg>{error}</ErrorMsg>}

                    {createdSlug ? (
                        <QRCodeContainer>
                            <h3>Memorial Criado com Sucesso!</h3>
                            <QRCodeSVG value={publicUrl} size={200} />
                            <p>Este é o QR Code do Memorial. Ele já pode ser impresso ou adicionado à placa da lápide.</p>
                            <Link to={`/memorial/${createdSlug}`}>Acessar Página do Memorial</Link>
                        </QRCodeContainer>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <SectionTitle>Dados Principais</SectionTitle>

                            <FormGroup>
                                <Label>Nome Completo do Falecido *</Label>
                                <Input name="full_name" value={formData.full_name} onChange={handleChange} required />
                            </FormGroup>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <FormGroup style={{ flex: 1 }}>
                                    <Label>Data de Nascimento</Label>
                                    <Input type="date" name="birth_date" value={formData.birth_date} onChange={handleChange} />
                                </FormGroup>
                                <FormGroup style={{ flex: 1 }}>
                                    <Label>Data de Falecimento</Label>
                                    <Input type="date" name="death_date" value={formData.death_date} onChange={handleChange} />
                                </FormGroup>
                            </div>

                            <FormGroup>
                                <Label>Geração / Vínculo Familiar</Label>
                                <select
                                    name="generation"
                                    value={formData.generation}
                                    onChange={handleChange}
                                    style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #E2E8F0', width: '100%', backgroundColor: '#fff' }}
                                >
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
                            </FormGroup>

                            <FormGroup>
                                <Label>Foto Principal (Perfil)</Label>
                                <FileInputWrapper>
                                    <label>
                                        <input type="file" accept="image/*" onChange={handleMainPhotoChange} />
                                        {mainPhoto ? mainPhoto.name : 'Clique para enviar uma foto'}
                                    </label>
                                </FileInputWrapper>
                            </FormGroup>

                            <FormGroup>
                                <Label>Galeria de Fotos (Múltiplas)</Label>
                                <FileInputWrapper>
                                    <label>
                                        <input type="file" accept="image/*" multiple onChange={handleGalleryChange} />
                                        {gallery.length > 0 ? `${gallery.length} foto(s) selecionada(s)` : 'Clique para enviar fotos'}
                                    </label>
                                </FileInputWrapper>
                            </FormGroup>

                            <SectionTitle>História e Lembranças</SectionTitle>

                            <FormGroup>
                                <Label>História da Vida e Família</Label>
                                <TextArea
                                    name="biography"
                                    value={formData.biography}
                                    onChange={handleChange}
                                    placeholder="Conte sobre a trajetória de vida, os familiares..."
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Hobbies, Gostos e Profissão (Opcional)</Label>
                                <TextArea
                                    name="short_description"
                                    value={formData.short_description}
                                    onChange={handleChange}
                                    placeholder="O que essa pessoa mais amava fazer? Quais eram as suas paixões?"
                                />
                            </FormGroup>

                            <SubmitButton type="submit" disabled={loading}>
                                {loading ? 'Salvando e Gerando QR Code...' : 'Salvar Memorial'}
                            </SubmitButton>
                        </form>
                    )}
                </FormCard>
            </Main>
        </Container>
    );
};

export default CreateMemorial;
