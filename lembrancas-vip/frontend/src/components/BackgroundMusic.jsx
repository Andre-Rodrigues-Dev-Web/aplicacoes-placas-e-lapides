import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaMusic } from 'react-icons/fa';
import { AudioControlPanel, PlayButton, InfoText } from './BackgroundMusic.styles';

const BackgroundMusic = ({ audioUrl, title = "Trilha Sonora da Saudade" }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        if (!audioUrl) return;
        
        audioRef.current = new Audio(audioUrl);
        audioRef.current.loop = true;
        audioRef.current.volume = 0.5; // Inicia com volume ameno

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, [audioUrl]);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            // Promise para evitar erros de restrição do navegador
            audioRef.current.play().catch(e => console.error("Auto-play prevenido pelo navegador:", e));
        }
        setIsPlaying(!isPlaying);
    };

    if (!audioUrl) return null;

    return (
        <AudioControlPanel>
            <FaMusic color="#CBD5E0" size={20} />
            <InfoText>
                <span className="title">{title}</span>
                <span className="subtitle">{isPlaying ? 'Tocando agora' : 'Pausado'}</span>
            </InfoText>
            <PlayButton onClick={togglePlay} title={isPlaying ? "Pausar" : "Tocar"}>
                {isPlaying ? <FaPause /> : <FaPlay style={{ marginLeft: '3px' }} />}
            </PlayButton>
        </AudioControlPanel>
    );
};

export default BackgroundMusic;
