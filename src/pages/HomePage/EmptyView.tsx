import { useState } from 'react';
import { getExtensionFromUrl } from '@/helpers/getExtensionFromUrl';
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

    if (!isUrl(trimedUrl)) {
      setUrlError('Not a valid url');
      return;
    }

    if (getExtensionFromUrl(trimedUrl) !== 'md') {
      setUrlError(
        'We can read only .md file, will support more file types later'
      );
      return;
    }

    navigate({
      pathname: 'file',
      hash: `#url=${trimedUrl}`,
    });
  };

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center p-8 text-center">
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
          className="mt-4 mb-6 bg-gray-600 px-12 font-medium text-white hover:opacity-80"
        >
          Read
        </Button>
        <p className="text-sm text-gray-500">
          Runs locally in your browser. No tracking.
        </p>
        <a
          className="text-sm font-medium text-neutral-900 underline underline-offset-4 hover:opacity-80"
          href="https://readonly.page/collection#base=https://raw.githubusercontent.com/hanlogy/about.readonly.page/refs/heads/main/docs/en-US/~file=./privacy-policy.md"
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

function isUrl(s: string): boolean {
  const regExp =
    /^(?:https?:\/\/)?(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}(?::\d{2,5})?(?:\/[^\s#]*)?(?:\?[^\s#]*)?$/i;
  return regExp.test(s.trim());
}
