import MatrixBackground from './components/MatrixBackground';
import GitHubDocViewer from './components/GitHubDocViewer';
import HardcodedLinks from './components/HardcodedLinks'; // Import the new component
import './index.css';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';


function App() {
  return (
    <div className="App">
      <MatrixBackground />
      <header className="App-header">
        <h1>Welcome to Singularity Web</h1>
        <WalletMultiButton />
      </header>
      <div style={{ position: 'relative', zIndex: 10 }}>
        <GitHubDocViewer filePath="README.md" />
        <GitHubDocViewer filePath="ARCHITECTURE.md" />
        <GitHubDocViewer filePath="ROADMAP.md" />
        <HardcodedLinks /> {/* Add the HardcodedLinks component here */}
      </div>
    </div>
  );
}

export default App;
