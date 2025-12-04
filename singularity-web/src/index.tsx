import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import WalletContextProvider from './components/WalletContextProvider';
import '@solana/wallet-adapter-react-ui/styles.css'; // Import wallet modal styles

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <WalletContextProvider>
      <App />
    </WalletContextProvider>
  </React.StrictMode>
);
