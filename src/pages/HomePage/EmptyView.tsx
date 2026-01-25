import { useState } from 'react';
import { useNavigate } from '@/lib/router';
import { Button } from '@/packages/react-dom-lib';

export function EmptyView() {
  const [url, setUrl] = useState<string>('');
  const navigate = useNavigate();
  const [urlError, setUrlError] = useState<string | null>(null);

  const handleReadUrl = () => {
    setUrlError(null);
    const trimedUrl = url.trim();
    if (!trimedUrl) {
      return;
    }
    if (trimedUrl.startsWith('http://')) {
      setUrlError('Only support https');
      return;
    }

    if (!trimedUrl.startsWith('https://')) {
      setUrlError('URL must start with https://');
      return;
    }

    if (!trimedUrl.endsWith('.md')) {
      setUrlError('Speicify a .md file');
      return;
    }

    navigate({
      pathname: 'file',
      hash: `#${trimedUrl}`,
    });
  };

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center p-8 text-center">
      <div className="mb-10">
        <div className="mb-4 text-xl font-medium text-gray-600">
          No saved pages yet
        </div>
        <p className="text-sm text-neutral-600">
          Click "Add page" (top right) to save your first page
        </p>
      </div>
      <div className="w-full">
        <div className="mb-3">Or paste a document URL to read it directly.</div>
        <input
          onChange={(e) => setUrl(e.currentTarget.value)}
          placeholder="Paste a URL… Only support .md files now"
          className="h-12 w-full rounded-lg border border-gray-300 px-2 text-sm"
        />
        {urlError && <div className="mt-2 text-red-600">{urlError}</div>}
        <Button
          type="button"
          onClick={() => handleReadUrl()}
          size="small"
          className="mt-4 mb-6 bg-gray-100 px-12 font-medium text-neutral-900 hover:opacity-80"
        >
          Read
        </Button>
        <p className="text-sm text-gray-500">
          Runs locally in your browser. No tracking.
        </p>
        <a
          className="text-sm font-medium text-neutral-900 underline underline-offset-4 hover:opacity-80"
          target="_blank"
          href="http://about.readonly.page/en-US/privacy"
        >
          How privacy works
        </a>
      </div>

      <Button
        size="small"
        className="mt-10 hidden! bg-gray-100 px-8 font-medium text-neutral-900 hover:opacity-80"
      >
        Add some sample pages
      </Button>
    </div>
  );
}
