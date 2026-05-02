import React, { useState } from 'react';
import { FaFire } from 'react-icons/fa';
import api from '../api/axios';
import { 
    CandleContainer, 
    CandleIconWrapper, 
    Form, 
    Input, 
    Button 
} from './VirtualCandle.styles';

const VirtualCandle = ({ memorialSlug, initialCount = 0 }) => {
    const [count, setCount] = useState(initialCount);
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successAnim, setSuccessAnim] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await api.post(`/memorials/${memorialSlug}/tributes`, {
                visitor_name: name,
                tribute_type: 'candle',
                message: message
            });
            setCount(prev => prev + 1);
            setSuccessAnim(true);
            setTimeout(() => setSuccessAnim(false), 2000);
            setShowForm(false);
            setName('');
            setMessage('');
        } catch (error) {
            console.error("Erro ao acender vela", error);
            alert("Erro ao acender a vela.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <CandleContainer>
            <CandleIconWrapper onClick={() => !showForm && setShowForm(true)}>
                <FaFire />
                {successAnim && <span className="floating-text">+1 Vela Acesa</span>}
            </CandleIconWrapper>
            <h4 style={{ color: '#2D3748', marginBottom: '0.2rem' }}>Acender uma Vela</h4>
            <p style={{ color: '#718096', fontSize: '0.85rem' }}>{count} velas acesas no memorial</p>

            {showForm && (
                <Form onSubmit={handleSubmit}>
                    <Input 
                        placeholder="Seu nome" 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        required 
                    />
                    <Input 
                        placeholder="Mensagem curta (opcional)" 
                        value={message} 
                        onChange={e => setMessage(e.target.value)} 
                        maxLength={100}
                    />
                    <Button type="submit" disabled={isSubmitting || !name}>
                        {isSubmitting ? 'Acendendo...' : 'Acender Vela'}
                    </Button>
                    <button 
                        type="button" 
                        onClick={() => setShowForm(false)}
                        style={{ fontSize: '0.8rem', color: '#A0AEC0', marginTop: '0.2rem' }}
                    >
                        Cancelar
                    </button>
                </Form>
            )}
        </CandleContainer>
    );
};

export default VirtualCandle;
