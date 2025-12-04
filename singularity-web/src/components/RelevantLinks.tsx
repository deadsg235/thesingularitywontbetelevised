import React from 'react';
import GitHubDocViewer from './GitHubDocViewer';

const RelevantLinks: React.FC = () => {
  return (
    <div style={{ color: 'white', maxWidth: '800px', margin: '20px auto', padding: '20px', background: 'rgba(0,0,0,0.8)', borderRadius: '8px', zIndex: 10, position: 'relative' }}>
      <h2>Relevant Links</h2>
      <GitHubDocViewer filePath="LINKS.md" />
    </div>
  );
};

export default RelevantLinks;
