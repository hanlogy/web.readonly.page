import { Route } from '@/lib/router';
import { HomePage } from '@/pages/HomePage';
import { ReaderPage } from '@/pages/ReaderPage';
import { ResourceEditorPage } from './pages/ResourceEditorPage';

function App() {
  return (
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="/url" element={<ReaderPage />} />
      <Route path="/resource-editor" element={<ResourceEditorPage />} />
    </>
  );
}

export default App;
