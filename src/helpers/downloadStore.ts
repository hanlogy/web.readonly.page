import type { Resource } from '@/definitions/types';

const FILENAME = 'readonly-page.json';

export function downloadStore({ resources }: { resources: readonly Resource[] }) {
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
  a.download = FILENAME;
  a.rel = 'noopener';

  document.body.appendChild(a);
  a.click();
  a.remove();

  // Cleanup
  URL.revokeObjectURL(url);
}
