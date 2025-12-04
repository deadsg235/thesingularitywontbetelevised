import React from 'react';

const HardcodedLinks: React.FC = () => {
  const links = [
    { name: 'Singularity X (Official)', url: 'https://x.com/Singularity2305' },
    { name: 'Singularity X Community', url: 'https://x.com/i/communities/1994905861831946320' },
    { name: 'Singularity Web (Vercel App)', url: 'https://singularity-iov1.vercel.app/' },
    { name: 'Pump.fun Coin', url: 'https://pump.fun/coin/Fuj6EDWQHBnQ3eEvYDujNQ4rPLSkhm3pBySbQ79Bpump' },
    { name: 't.co Link 1', url: 'https://t.co/EiFXYGR4jY' },
    { name: 't.co Link 2', url: 'https://t.co/5X0ZeRV0bP' },
    { name: 't.co Link 3', url: 'https://t.co/r0KNGv2ZBq' },
  ];

  return (
    <div style={{ color: 'white', maxWidth: '800px', margin: '20px auto', padding: '20px', background: 'rgba(0,0,0,0.8)', borderRadius: '8px', zIndex: 10, position: 'relative' }}>
      <h2>Relevant Links</h2>
      <ul>
        {links.map((link, index) => (
          <li key={index} style={{ marginBottom: '10px' }}>
            <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: '#0000FF', textDecoration: 'underline' }}>
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HardcodedLinks;
