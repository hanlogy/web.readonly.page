import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Router } from '@/lib/router';
import { DialogProvider, FlexCenter } from '@/packages/react-dom-lib';
import App from './App';
import { getResources } from './repositories/localDB';
import { StoreProvider } from './states/store';
import './styles/index.css';

const root = createRoot(document.getElementById('root')!);
root.render(
  <FlexCenter className="min-h-[80vh] text-gray-600">
    Initializing...
  </FlexCenter>
);

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
