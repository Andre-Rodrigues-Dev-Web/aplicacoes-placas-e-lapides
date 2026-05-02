import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import {
    Container,
    Main,
    Card,
    Title,
    Subtitle,
    Input,
    Button,
    SuccessMsg,
    LoginLink,
    LgpdCheckbox
} from './Register.styles';
import { FaShieldAlt } from 'react-icons/fa';

const Register = () => {
    const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [lgpdConsent, setLgpdConsent] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!lgpdConsent) {
            return setError('Você precisa concordar com os Termos e a Política de Privacidade.');
        }
        if (form.password !== form.confirmPassword) {
            return setError('As senhas não coincidem.');
        }
        if (form.password.length < 6) {
            return setError('A senha deve ter pelo menos 6 caracteres.');
        }

        setLoading(true);
        try {
            await api.post('/auth/register', {
                name: form.name,
                email: form.email,
                phone: form.phone,
                password: form.password,
            });
            setSuccess('Conta criada com sucesso! Redirecionando para o login...');
            setTimeout(() => navigate('/entrar'), 2000);
        } catch (err) {
            const msg = err.response?.data?.message || 'Erro ao criar conta. O e-mail pode já estar em uso.';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Main>
                <Card>
                    <Title>Criar sua conta</Title>
                    <Subtitle>Comece a preservar memórias eternas hoje</Subtitle>

                    {error && <ErrorMsg>{error}</ErrorMsg>}
                    {success && <SuccessMsg>{success}</SuccessMsg>}

                    <form onSubmit={handleSubmit}>
                        <Input
                            name="name"
                            type="text"
                            placeholder="Seu nome completo"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            name="email"
                            type="email"
                            placeholder="Seu e-mail"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            name="phone"
                            type="tel"
                            placeholder="Seu telefone (opcional)"
                            value={form.phone}
                            onChange={handleChange}
                        />
                        <Input
                            name="password"
                            type="password"
                            placeholder="Senha (mínimo 6 caracteres)"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirme sua senha"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        <LgpdCheckbox>
                            <input 
                                type="checkbox" 
                                id="lgpd-register" 
                                required 
                                checked={lgpdConsent}
                                onChange={(e) => setLgpdConsent(e.target.checked)}
                            />
                            <label htmlFor="lgpd-register">
                                <FaShieldAlt style={{color: '#086fae', marginRight: '5px'}}/>
                                Concordo com os <Link to="/termos">Termos de Uso</Link> e a <Link to="/privacidade">Política de Privacidade</Link>. Entendo que meus dados serão processados para a prestação do serviço.
                            </label>
                        </LgpdCheckbox>

                        <Button type="submit" disabled={loading || !lgpdConsent} style={{ opacity: lgpdConsent ? 1 : 0.6 }}>
                            {loading ? 'Criando conta...' : 'Criar conta grátis'}
                        </Button>
                    </form>

                    <LoginLink>
                        Já tem uma conta? <Link to="/entrar">Faça login</Link>
                    </LoginLink>
                </Card>
            </Main>
        </Container>
    );
};

export default Register;
