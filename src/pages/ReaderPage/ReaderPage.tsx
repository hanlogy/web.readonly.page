import type { ResourceType } from '@/definitions/types';
import { useParsedPath } from '@/lib/router/hooks';
import { resolveUrlWithBase } from '@/packages/react-dom-lib';
import { PageView } from './ReaderView';
import { getExtension } from './getExtension';

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
    fileExtension = getExtension(hashResources[1]);
    documentUrl = resolveUrlWithBase({
      base: hashResources[0],
      url: hashResources[1],
    });
  } else {
    baseUrl = hashResources[0].slice(0, hashResources[0].lastIndexOf('/') + 1);
    fileExtension = getExtension(hashResources[0]);
    documentUrl = hashResources[0];
  }

  if (!fileExtension) {
    return notFound();
  }

  return (
    <PageView
      type={type}
      baseUrl={baseUrl}
      documentUrl={documentUrl}
      fileExtension={fileExtension}
    />
  );
}
