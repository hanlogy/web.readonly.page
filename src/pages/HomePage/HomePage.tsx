import { ResourceItem } from '@/components/ResourceItem';
import { Button, Page } from '@/packages/react-dom-lib';
import { useStoreState } from '@/states/store';
import { ActionButtons } from './ActionButtons';
import { Logo } from './Logo';

export function HomePage() {
  const { resources } = useStoreState();

  return (
    <Page centerTitle={false} title={<Logo />} actions={<ActionButtons />}>
      {resources.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
          {resources.map((resource) => {
            return <ResourceItem key={resource.id} resource={resource} />;
          })}
        </div>
      ) : (
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
            <div className="mb-2">
              Or paste a document URL to read it directly.
            </div>
            <input
              placeholder="Paste a URL… Only support .md files now"
              className="h-12 w-full rounded-lg border border-gray-300 px-2 text-sm"
            />
            <Button
              size="small"
              className="mt-2 mb-3 bg-gray-100 px-12 font-medium text-neutral-900 hover:opacity-80"
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
            className="mt-10 bg-gray-100 px-8 font-medium text-neutral-900 hover:opacity-80"
          >
            Add some sample pages
          </Button>
        </div>
      )}
    </Page>
  );
}
