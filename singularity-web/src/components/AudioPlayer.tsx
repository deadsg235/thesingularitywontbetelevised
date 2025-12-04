import React from 'react';

const AudioPlayer: React.FC = () => {
  const audioSrc = '/audio/clubbed to death - Matrix soundtrack.mp3'; // Path relative to public folder

  return (
    <div style={{ position: 'fixed', bottom: '20px', left: '20px', zIndex: 100, background: 'rgba(0,0,0,0.7)', padding: '10px', borderRadius: '5px' }}>
      <audio controls loop>
        <source src={audioSrc} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;
