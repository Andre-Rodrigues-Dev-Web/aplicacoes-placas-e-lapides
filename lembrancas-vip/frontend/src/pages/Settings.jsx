import React, { useState } from 'react';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';
import api from '../api/axios';
import { FaUserEdit, FaLock } from 'react-icons/fa';
import {
    Container,
    Main,
    Title,
    Subtitle,
    SettingsCard,
    SectionTitle,
    Form,
    FormGroup,
    Input,
    SubmitButton,
    StatusMessage
} from './Settings.styles';

const Settings = () => {
    const { user, updateUser } = useAuth();
    
    // Profile State
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [profileStatus, setProfileStatus] = useState(null);
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

    // Password State
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [pwdStatus, setPwdStatus] = useState(null);
    const [isUpdatingPwd, setIsUpdatingPwd] = useState(false);

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setProfileStatus(null);
        setIsUpdatingProfile(true);

        try {
            const response = await api.post('/auth/update_profile', {
                id: user.id,
                name,
                email
            });
            updateUser(response.data.user);
            setProfileStatus({ type: 'success', text: 'Perfil atualizado com sucesso!' });
        } catch (error) {
            setProfileStatus({ type: 'error', text: error.response?.data?.message || 'Erro ao atualizar perfil.' });
        } finally {
            setIsUpdatingProfile(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setPwdStatus(null);

        if (newPassword !== confirmPassword) {
            setPwdStatus({ type: 'error', text: 'As novas senhas não coincidem.' });
            return;
        }

        if (newPassword.length < 6) {
            setPwdStatus({ type: 'error', text: 'A nova senha deve ter pelo menos 6 caracteres.' });
            return;
        }

        setIsUpdatingPwd(true);
        try {
            await api.post('/auth/update_password', {
                id: user.id,
                current_password: currentPassword,
                new_password: newPassword
            });
            setPwdStatus({ type: 'success', text: 'Senha alterada com sucesso!' });
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            setPwdStatus({ type: 'error', text: error.response?.data?.message || 'Erro ao alterar a senha.' });
        } finally {
            setIsUpdatingPwd(false);
        }
    };

    return (
        <Container>
            <Header />
            <Main>
                <Title>Configurações da Conta</Title>
                <Subtitle>Gerencie suas informações pessoais e a segurança do seu acesso.</Subtitle>

                <SettingsCard>
                    <SectionTitle><FaUserEdit /> Dados do Perfil</SectionTitle>
                    {profileStatus && (
                        <StatusMessage success={profileStatus.type === 'success'}>
                            {profileStatus.text}
                        </StatusMessage>
                    )}
                    <Form onSubmit={handleProfileSubmit}>
                        <FormGroup>
                            <label>Nome Completo</label>
                            <Input 
                                type="text" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                required 
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>E-mail</label>
                            <Input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </FormGroup>
                        <SubmitButton type="submit" disabled={isUpdatingProfile}>
                            {isUpdatingProfile ? 'Salvando...' : 'Salvar Perfil'}
                        </SubmitButton>
                    </Form>
                </SettingsCard>

                <SettingsCard>
                    <SectionTitle><FaLock /> Alterar Senha</SectionTitle>
                    {pwdStatus && (
                        <StatusMessage success={pwdStatus.type === 'success'}>
                            {pwdStatus.text}
                        </StatusMessage>
                    )}
                    <Form onSubmit={handlePasswordSubmit}>
                        <FormGroup>
                            <label>Senha Atual</label>
                            <Input 
                                type="password" 
                                value={currentPassword} 
                                onChange={(e) => setCurrentPassword(e.target.value)} 
                                required 
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Nova Senha</label>
                            <Input 
                                type="password" 
                                value={newPassword} 
                                onChange={(e) => setNewPassword(e.target.value)} 
                                required 
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Confirmar Nova Senha</label>
                            <Input 
                                type="password" 
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                required 
                            />
                        </FormGroup>
                        <SubmitButton type="submit" disabled={isUpdatingPwd}>
                            {isUpdatingPwd ? 'Alterando...' : 'Alterar Senha'}
                        </SubmitButton>
                    </Form>
                </SettingsCard>
            </Main>
        </Container>
    );
};

export default Settings;
