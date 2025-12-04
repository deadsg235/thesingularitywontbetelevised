import React, { useRef, useEffect, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

const MatrixBackground: React.FC = () => { // Removed isConnected prop
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { connected } = useWallet(); // Get connection status from useWallet hook

  const currentColor = connected ? '#FF4500' : '#0F0'; // Red-orange for connected, green for disconnected

  const draw = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      drops: number[],
      fontSize: number,
      characters: string
    ) => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Fading effect
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = currentColor; // Dynamically change color
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    },
    [currentColor]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let columns = Math.floor(width / 20);
    let drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const fontSize = 20;
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:",./<>?`~';

    const intervalId = setInterval(() => {
      draw(ctx, width, height, drops, fontSize, characters);
    }, 33);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
      drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = 1;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', handleResize);
    };
  }, [draw]); // Rerun effect if draw function changes (i.e., currentColor changes)

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
        display: 'block',
      }}
    />
  );
};

export default MatrixBackground;
