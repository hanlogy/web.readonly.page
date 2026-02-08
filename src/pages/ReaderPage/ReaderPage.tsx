import { resolveWithBaseUrl } from '@hanlogy/ts-lib';
import { ensureUrlProtocol } from '@/helpers/ensureUrlProtocol';
import { getExtensionFromUrl } from '@/helpers/getExtensionFromUrl';
import { parsePathHash } from '@/lib/router/helpers';
import { usePath } from '@/lib/router/hooks';
import { PageView } from './ReaderView';

export function ReaderPage() {
  const { hash } = usePath();
  const {
    file: fileParam,
    url: urlParam,
    base: baseParam,
  } = parsePathHash(hash);

  const notFound = () => <>Page not found</>;

  const type =
    baseParam && fileParam ? 'collection' : urlParam ? 'file' : undefined;

  if (!type) {
    return notFound();
  }

  let baseUrl: string;
  let fileExtension: string | null;
  let documentUrl: string;

  if (type === 'collection') {
    baseUrl = baseParam;
    fileExtension = getExtensionFromUrl(fileParam);
    documentUrl = resolveWithBaseUrl({ base: baseParam, ref: fileParam });
  } else {
    documentUrl = urlParam;
    baseUrl = documentUrl.slice(0, documentUrl.lastIndexOf('/') + 1);
    fileExtension = getExtensionFromUrl(documentUrl);
  }

  if (!fileExtension) {
    return notFound();
  }

  return (
    <PageView
      type={type}
      baseUrl={ensureUrlProtocol(baseUrl)}
      filePath={type === 'collection' ? fileParam : undefined}
      documentUrl={ensureUrlProtocol(documentUrl)}
      fileExtension={fileExtension}
    />
  );
}
