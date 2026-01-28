import type { ResourceType } from '@/definitions/types';
import { ensureUrlProtocol } from '@/helpers/ensureUrlProtocol';
import { getExtensionFromUrl } from '@/helpers/getExtensionFromUrl';
import { parsePathHash } from '@/lib/router/helpers';
import { usePath } from '@/lib/router/hooks';
import { resolveWithBaseUrl } from '@/packages/ts-lib';
import { PageView } from './ReaderView';

export function ReaderPage({ type }: { type: ResourceType }) {
  const { hash } = usePath();
  const {
    file: fileParam,
    url: urlParam,
    base: baseParam,
  } = parsePathHash(hash);

  const notFound = () => <>Page not found</>;

  if (
    (type !== 'collection' && type !== 'file') ||
    (type === 'file' && !urlParam) ||
    (type === 'collection' && (!baseParam || !fileParam))
  ) {
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
