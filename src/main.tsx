import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Router } from '@/lib/router';
import { DialogProvider } from '@/packages/react-dom-lib';
import App from './App';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DialogProvider>
      <Router>
        <App />
      </Router>
    </DialogProvider>
  </StrictMode>
);
