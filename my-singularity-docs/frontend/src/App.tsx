import React from 'react';
import MatrixBackground from './components/MatrixBackground';
import './index.css';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import DocViewer from './components/DocViewer';
import ArchitectureVisualizer from './components/ArchitectureVisualizer';
import RoadmapVisualizer from './components/RoadmapVisualizer';


function App() {
  return (
    <div className="App">
      <MatrixBackground />
      <header className="App-header">
        <h1>Welcome to Singularity Docs</h1>
        <WalletMultiButton />
      </header>
      <DocViewer filePath="README.md" />
      <ArchitectureVisualizer />
      <RoadmapVisualizer />
    </div>
  );
}

export default App;