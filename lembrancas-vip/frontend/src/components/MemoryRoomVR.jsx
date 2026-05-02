import React, { useRef, useState, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
    Text,
    Float,
    PerspectiveCamera,
    Stars,
    useTexture,
} from '@react-three/drei';
import * as THREE from 'three';
import styled, { keyframes } from 'styled-components';
import { getImageUrl } from '../services/productService';

/* ─── Styled Wrapper ────────────────────────────────────────────── */
const fadeIn = keyframes`from { opacity:0; transform:scale(0.97); } to { opacity:1; transform:scale(1); }`;

const Overlay = styled.div`
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: #0a0a18;
    animation: ${fadeIn} 0.5s ease;
    display: flex;
    flex-direction: column;
`;

const CanvasWrapper = styled.div`
    flex: 1;
    position: relative;
`;

const CloseBtn = styled.button`
    position: absolute;
    top: 1.2rem;
    right: 1.2rem;
    z-index: 10;
    background: rgba(255,255,255,0.12);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.2);
    color: white;
    border-radius: 50%;
    width: 46px;
    height: 46px;
    font-size: 1.2rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.25s;
    &:hover { background: rgba(255,255,255,0.25); transform: scale(1.1); }
`;

const HUD = styled.div`
    position: absolute;
    bottom: 1.8rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 1rem;
    z-index: 10;
`;

const HUDBtn = styled.button`
    background: rgba(255,255,255,0.1);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.25);
    color: white;
    padding: 0.65rem 1.4rem;
    border-radius: 50px;
    font-size: 0.88rem;
    font-weight: 700;
    cursor: pointer;
    letter-spacing: 0.5px;
    transition: all 0.25s;
    display: flex;
    align-items: center;
    gap: 8px;
    &:hover { background: rgba(255,255,255,0.22); transform: translateY(-2px); }
`;

const NameOverlay = styled.div`
    position: absolute;
    top: 1.2rem;
    left: 1.2rem;
    z-index: 10;
    color: white;
    text-shadow: 0 2px 8px rgba(0,0,0,0.5);
    font-family: 'Nunito', sans-serif;

    h2 {
        font-size: 1.3rem;
        font-weight: 800;
        margin: 0 0 0.15rem;
    }
    span { font-size: 0.85rem; opacity: 0.7; letter-spacing: 1px; }
`;

const TriggerBtn = styled.button`
    ${({ theme }) => theme.mixins?.glassButton ?? ''}
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 1rem 2rem;
    font-size: 1rem;
    border-radius: 14px;
    margin-top: 2rem;
    background: linear-gradient(135deg, #1a1a3e 0%, #2d1b69 100%);
    border: 1px solid rgba(255,255,255,0.15);
    box-shadow: 0 8px 32px rgba(99, 59, 219, 0.3);
    color: white;
    cursor: pointer;
    font-weight: 800;
    letter-spacing: 0.5px;
    transition: all 0.3s;
    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 16px 40px rgba(99, 59, 219, 0.45);
    }
`;

/* ─── Floating Photo Frame ──────────────────────────────────────── */
function PhotoFrame({ url, position, rotation, scale = 1, onClick, isActive }) {
    const meshRef = useRef();
    const texture = useTexture(url);
    const [hovered, setHovered] = useState(false);

    // Keep aspect ratio from texture
    const aspect = texture.image
        ? texture.image.width / texture.image.height
        : 1;
    const w = 2.8 * scale;
    const h = (w / aspect) * scale;

    useFrame((state) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.y = rotation + Math.sin(state.clock.elapsedTime * 0.3 + position[0]) * 0.05;
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[2]) * 0.12;
    });

    return (
        <group
            ref={meshRef}
            position={position}
            scale={isActive ? 1.18 : hovered ? 1.08 : 1}
            onClick={onClick}
            onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
            onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
        >
            {/* Golden frame border */}
            <mesh>
                <boxGeometry args={[w + 0.18, h + 0.18, 0.06]} />
                <meshStandardMaterial color={isActive ? '#f0d060' : '#c8a83a'} metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Photo */}
            <mesh position={[0, 0, 0.04]}>
                <planeGeometry args={[w, h]} />
                <meshStandardMaterial map={texture} />
            </mesh>
            {/* Glow when active */}
            {isActive && (
                <pointLight color="#f0d060" intensity={1.5} distance={5} />
            )}
        </group>
    );
}

/* ─── Floating Particles (fireflies / stars) ────────────────────── */
function Fireflies({ count = 80 }) {
    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            arr[i * 3] = (Math.random() - 0.5) * 30;
            arr[i * 3 + 1] = Math.random() * 12 - 2;
            arr[i * 3 + 2] = (Math.random() - 0.5) * 30;
        }
        return arr;
    }, [count]);

    const meshRef = useRef();
    useFrame(({ clock }) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = clock.elapsedTime * 0.04;
        }
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial color="#ffe8a0" size={0.08} transparent opacity={0.8} sizeAttenuation />
        </points>
    );
}

/* ─── Ambient candle-light environment ─────────────────────────── */
function Scene({ photos, name, birthDate, deathDate, activeIdx, setActiveIdx }) {
    const { camera } = useThree();

    // Arrange photos in a circle around the center
    const radius = photos.length > 1 ? 5.5 : 0;
    const arranged = photos.map((url, i) => {
        const angle = (i / photos.length) * Math.PI * 2;
        return {
            url,
            position: [Math.sin(angle) * radius, 0.5, Math.cos(angle) * radius],
            rotation: -angle,
        };
    });

    // Slow camera orbit
    useFrame(({ clock }) => {
        camera.position.x = Math.sin(clock.elapsedTime * 0.08) * 2.5;
        camera.position.z = 9 + Math.cos(clock.elapsedTime * 0.08) * 1.5;
        camera.position.y = 1.6 + Math.sin(clock.elapsedTime * 0.12) * 0.3;
        camera.lookAt(0, 0.5, 0);
    });

    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.15} color="#ffe8d6" />
            <pointLight position={[0, 6, 0]} intensity={1.8} color="#ffd580" distance={20} />
            <pointLight position={[-8, 3, -6]} intensity={0.6} color="#b8e0ff" />
            <pointLight position={[8, 3, 6]} intensity={0.6} color="#ffb8b8" />

            {/* Fog for depth */}
            <fog attach="fog" args={['#0a0a18', 14, 35]} />

            {/* Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]} receiveShadow>
                <planeGeometry args={[60, 60]} />
                <meshStandardMaterial color="#0d0d22" metalness={0.4} roughness={0.8} />
            </mesh>

            {/* Name + dates text in scene */}
            <Float speed={1} rotationIntensity={0.05} floatIntensity={0.4}>
                <Text
                    position={[0, 4.2, 0]}
                    fontSize={0.58}
                    color="#ffd580"
                    anchorX="center"
                    anchorY="middle"
                    font="/fonts/Nunito-Bold.ttf"
                    outlineColor="#00000088"
                    outlineWidth={0.012}
                >
                    {name}
                </Text>
                <Text
                    position={[0, 3.5, 0]}
                    fontSize={0.28}
                    color="#c8e6ff"
                    anchorX="center"
                    anchorY="middle"
                    outlineColor="#00000055"
                    outlineWidth={0.008}
                >
                    {birthDate}  ✦  {deathDate}
                </Text>
                <Text
                    position={[0, 2.9, 0]}
                    fontSize={0.22}
                    color="rgba(255,255,255,0.45)"
                    anchorX="center"
                    anchorY="middle"
                >
                    Suas memórias vivem para sempre aqui
                </Text>
            </Float>

            {/* Photo frames */}
            {arranged.map((item, i) => (
                <PhotoFrame
                    key={i}
                    url={item.url}
                    position={item.position}
                    rotation={item.rotation}
                    isActive={activeIdx === i}
                    onClick={() => setActiveIdx(activeIdx === i ? null : i)}
                />
            ))}

            {/* Fireflies */}
            <Fireflies count={100} />

            {/* Stars */}
            <Stars radius={40} depth={50} count={3000} factor={4} saturation={0.5} fade speed={1} />
        </>
    );
}

/* ─── Fallback photo plane (for single photo) ──────────────────── */
function SinglePhotoScene({ url, name }) {
    const texture = useTexture(url);
    const meshRef = useRef();
    useFrame(({ clock }) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.3) * 0.12;
            meshRef.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.1;
        }
    });
    return (
        <>
            <ambientLight intensity={0.3} />
            <pointLight position={[0, 5, 5]} intensity={2} color="#ffd580" />
            <Stars radius={30} count={2000} factor={3} fade />
            <Float speed={1.2} floatIntensity={0.5}>
                <mesh ref={meshRef}>
                    <planeGeometry args={[4, 5]} />
                    <meshStandardMaterial map={texture} />
                </mesh>
            </Float>
            <Text position={[0, 3.2, 0]} fontSize={0.5} color="#ffd580" anchorX="center">
                {name}
            </Text>
        </>
    );
}

/* ─── Loading fallback ──────────────────────────────────────────── */
const LoadingScene = () => (
    <mesh>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#1a1a3e" wireframe />
    </mesh>
);

/* ─── Main exported component ───────────────────────────────────── */
export default function MemoryRoomVR({ memorial, onClose }) {
    const [activeIdx, setActiveIdx] = useState(null);

    const photos = useMemo(() => {
        const list = [];
        if (memorial.main_photo) {
            list.push(getImageUrl(memorial.main_photo));
        }
        if (memorial.gallery) {
            memorial.gallery.forEach(g => {
                if (g.file_path) list.push(getImageUrl(g.file_path));
            });
        }
        return list;
    }, [memorial]);

    const name = memorial.full_name || 'Memória Eterna';
    const fmt = d => d ? new Date(d + 'T00:00:00').toLocaleDateString('pt-BR') : '—';

    // Prevent body scroll while open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    return (
        <Overlay>
            <CanvasWrapper>
                <NameOverlay>
                    <h2>✦ Sala de Memórias</h2>
                    <span>{name}</span>
                </NameOverlay>

                <CloseBtn onClick={onClose} title="Fechar">✕</CloseBtn>

                <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
                    <PerspectiveCamera makeDefault fov={65} position={[0, 1.6, 9]} />
                    <Suspense fallback={<LoadingScene />}>
                        {photos.length > 0 ? (
                            <Scene
                                photos={photos}
                                name={name}
                                birthDate={fmt(memorial.birth_date)}
                                deathDate={fmt(memorial.death_date)}
                                activeIdx={activeIdx}
                                setActiveIdx={setActiveIdx}
                            />
                        ) : (
                            <SinglePhotoScene url="/logo.png" name={name} />
                        )}
                    </Suspense>
                </Canvas>

                <HUD>
                    <HUDBtn onClick={() => setActiveIdx(null)}>
                        🎞️ Ver Todas
                    </HUDBtn>
                    {photos.length > 1 && (
                        <HUDBtn onClick={() => setActiveIdx(p => ((p ?? -1) + 1) % photos.length)}>
                        ► Próxima Foto
                        </HUDBtn>
                    )}
                    <HUDBtn style={{ opacity: 0.6, cursor: 'default' }}>
                        🖱 Clique nas fotos para destacar
                    </HUDBtn>
                </HUD>
            </CanvasWrapper>
        </Overlay>
    );
}

/* ─── Trigger button (exported for use in MemorialPage) ─────────── */
export { TriggerBtn as MemoryRoomTriggerBtn };
