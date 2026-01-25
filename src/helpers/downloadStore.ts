import type { Resource } from '@/definitions/types';

export function downloadStore({
  resources,
}: {
  resources: readonly Resource[];
}) {
  const normalizeResources = resources.map(
    ({ createdAt, updatedAt, ...rest }) => ({
      ...rest,
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
    })
  );

  const json = JSON.stringify(
    {
      version: 1,
      createdAt: new Date().toLocaleString(),
      resources: normalizeResources,
    },
    null,
    2
  );
  const blob = new Blob([json], {
    type: 'application/json;charset=utf-8',
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = buildFileName();
  a.rel = 'noopener';

  document.body.appendChild(a);
  a.click();
  a.remove();

  // Cleanup
  URL.revokeObjectURL(url);
}

function buildFileName() {
  const dateTime = new Date()
    .toLocaleString('sv-SE', {
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    .replaceAll(':', '-')
    .replaceAll(' ', '_');

  return `ReadonlyPage_${dateTime}.json`;
}
