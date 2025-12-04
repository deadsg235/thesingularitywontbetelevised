import React from 'react';
import MatrixBackground from './components/MatrixBackground';
import GitHubDocViewer from './components/GitHubDocViewer';
import './index.css';

function App() {
  return (
    <div className="App">
      <MatrixBackground />
      <header className="App-header">
        <h1>Welcome to Singularity Docs</h1>
      </header>
      <div style={{ position: 'relative', zIndex: 10 }}>
        <GitHubDocViewer filePath="README.md" />
        <GitHubDocViewer filePath="ARCHITECTURE.md" />
        <GitHubDocViewer filePath="ROADMAP.md" />
      </div>
    </div>
  );
}

export default App;
