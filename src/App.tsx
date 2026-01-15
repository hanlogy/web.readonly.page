import { Route } from '@/lib/router';
import { HomePage } from '@/pages/HomePage';
import { ReaderPage } from '@/pages/ReaderPage';
import { ResourceEditorPage } from './pages/ResourceEditorPage';

function App() {
  return (
    <>
      <div className="p-4 sm:p-8">
        <Route path="/" element={<HomePage />} />
        <Route path="/url" element={<ReaderPage />} />
        <Route path="/resource-editor" element={<ResourceEditorPage />} />
      </div>
    </>
  );
}

export default App;
