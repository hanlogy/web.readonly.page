import type { ResourceType } from '@/definitions/types';
import { ensureUrlProtocol } from '@/helpers/ensureUrlProtocol';
import { getExtensionFromUrl } from '@/helpers/getExtensionFromUrl';
import { useParsedPath } from '@/lib/router/hooks';
import { resolveWithBaseUrl } from '@/packages/ts-lib';
import { PageView } from './ReaderView';

export function ReaderPage({ type }: { type: ResourceType }) {
  const {
    hash: { resources: hashResources },
  } = useParsedPath();

  const notFound = () => <>Page not found</>;

  if (
    (type !== 'collection' && type !== 'file') ||
    !hashResources.length ||
    (type === 'collection' && hashResources.length < 2)
  ) {
    return notFound();
  }

  let baseUrl: string;
  let fileExtension: string | null;
  let documentUrl: string;

  if (type === 'collection') {
    baseUrl = hashResources[0];
    fileExtension = getExtensionFromUrl(hashResources[1]);
    documentUrl = resolveWithBaseUrl({
      base: hashResources[0],
      ref: hashResources[1],
    });
  } else {
    baseUrl = hashResources[0].slice(0, hashResources[0].lastIndexOf('/') + 1);
    fileExtension = getExtensionFromUrl(hashResources[0]);
    documentUrl = hashResources[0];
  }

  if (!fileExtension) {
    return notFound();
  }

  return (
    <PageView
      type={type}
      baseUrl={ensureUrlProtocol(baseUrl)}
      filePath={type === 'collection' ? hashResources[1] : undefined}
      documentUrl={ensureUrlProtocol(documentUrl)}
      fileExtension={fileExtension}
    />
  );
}
