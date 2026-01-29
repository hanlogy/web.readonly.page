import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Router } from '@/lib/router';
import { DialogProvider, FlexCenter } from '@/packages/react-dom-lib';
import { getResources } from '@/repositories/localDB';
import { StoreProvider } from '@/states/store';
import App from './App';
import './styles/index.css';

const container = document.getElementById('root');
if (!container) {
  throw new Error('No app root container found');
}

const root = createRoot(container);
root.render(<FlexCenter className="min-h-[80vh] text-gray-600"></FlexCenter>);

(async () => {
  try {
    const resources = await getResources();

    root.render(
      <StrictMode>
        <Router>
          <StoreProvider resources={resources}>
            <DialogProvider>
              <App />
            </DialogProvider>
          </StoreProvider>
        </Router>
      </StrictMode>
    );
  } catch {
    root.render(
      <FlexCenter className="min-h-[80vh] text-red-600">
        Failed to initialize.
      </FlexCenter>
    );
  }
})();
