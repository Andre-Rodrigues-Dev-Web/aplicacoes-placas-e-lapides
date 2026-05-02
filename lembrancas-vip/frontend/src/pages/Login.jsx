import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import {
    FaShieldAlt, FaLeaf, FaCog, FaInstagram, FaTiktok, FaYoutube, FaWhatsapp, FaEye, FaEyeSlash
} from 'react-icons/fa';
import {
    LoginContainer,
    FormSide,
    FormCard,
    LogoWrapper,
    FormTitle,
    FormSubtitle,
    InputGroup,
    FormOptions,
    LoginButton,
    FormFooter,
    VisualSide,
    VideoBG,
    Overlay,
    VisualContent,
    FeatureList,
    FeatureCard,
    ActionWrapper,
    ErrorMsg
} from './Login.styles';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { login, signed } = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (signed) {
            navigate('/painel');
        }
    }, [signed, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const success = await login(email, password);
        if (success) {
            navigate('/painel');
        } else {
            setError('Dados incorretos ou conta não encontrada. Verifique e tente novamente.');
        }
    };

    return (
        <LoginContainer>
            {/* LADO ESQUERDO: FORMULÁRIO */}
            <FormSide>
                <FormCard>
                    <LogoWrapper>
                        <img src="/logo.png" alt="LembrançasVIP" />
                    </LogoWrapper>

                    <FormTitle>Painel Administrativo</FormTitle>
                    <FormSubtitle>Informe seus dados para acessar e administrar o memorial.</FormSubtitle>

                    {error && <ErrorMsg>{error}</ErrorMsg>}

                    <form onSubmit={handleSubmit}>
                        <InputGroup>
                            <label>Código QR ou Email</label>
                            <input
                                type="text"
                                placeholder="Informe seu código ou email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </InputGroup>

                        <InputGroup>
                            <label>Senha</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Informe sua senha"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: '15px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'none',
                                        border: 'none',
                                        color: '#94A3B8',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </InputGroup>

                        <FormOptions>
                            <label className="checkbox-group" onClick={() => setShowPassword(!showPassword)}>
                                <input type="checkbox" checked={showPassword} readOnly />
                                Mostrar senha
                            </label>
                            <Link to="#" className="forgot-link">Esqueceu sua senha?</Link>
                        </FormOptions>

                        <LoginButton type="submit">Entrar</LoginButton>
                    </form>

                    <FormFooter>
                        Ao entrar, você concorda com o uso responsável do memorial.
                    </FormFooter>
                </FormCard>
            </FormSide>

            {/* LADO DIREITO: VISUAL COM VÍDEO */}
            <VisualSide>
                <VideoBG autoPlay loop muted playsInline>
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-sun-shining-through-the-leaves-of-a-tree-1002-large.mp4" type="video/mp4" />
                </VideoBG>
                <Overlay />

                <VisualContent>
                    <h2>Administre com facilidade</h2>
                    <p>Mantenha a homenagem sempre atualizada com fotos, vídeos e mensagens, com uma experiência respeitosa.</p>

                    <FeatureList>
                        <FeatureCard>
                            <div className="icon-box"><FaShieldAlt /></div>
                            <div className="text">
                                <h4>Acesso protegido</h4>
                                <p>Controle seguro de dados e preferências do memorial.</p>
                            </div>
                        </FeatureCard>

                        <FeatureCard>
                            <div className="icon-box"><FaLeaf /></div>
                            <div className="text">
                                <h4>Experiência respeitosa</h4>
                                <p>Visual discreto e adequado ao tema, sem excessos.</p>
                            </div>
                        </FeatureCard>

                        <FeatureCard>
                            <div className="icon-box"><FaCog /></div>
                            <div className="text">
                                <h4>Configurações rápidas</h4>
                                <p>Personalização, história, fotos, vídeos e módulos especiais.</p>
                            </div>
                        </FeatureCard>
                    </FeatureList>

                    <ActionWrapper>
                        <Link to="/" className="site-btn">Acessar nosso site</Link>
                        <div className="social-links">
                            <a href="#"><FaInstagram /></a>
                            <a href="#"><FaTiktok /></a>
                            <a href="#"><FaYoutube /></a>
                            <a href="#"><FaWhatsapp /></a>
                        </div>
                    </ActionWrapper>
                </VisualContent>
            </VisualSide>
        </LoginContainer>
    );
};

export default Login;
