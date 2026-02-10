import { Route } from '@/lib/router';
import { HomePage } from '@/pages/home';
import { ReaderPage } from '@/pages/read';
import { ResourceEditorPage } from './pages/resource-editor';

function App() {
  return (
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="/read" element={<ReaderPage />} />
      <Route path="/resource-editor" element={<ResourceEditorPage />} />
    </>
  );
}

export default App;
