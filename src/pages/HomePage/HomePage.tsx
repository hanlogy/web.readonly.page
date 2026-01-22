import { ResourceItem } from '@/components/ResourceItem';
import { Page } from '@/packages/react-dom-lib';
import { useStoreState } from '@/states/store';
import { ActionButtons } from './ActionButtons';
import { Logo } from './Logo';

export function HomePage() {
  const { resources } = useStoreState();

  return (
    <Page centerTitle={false} title={<Logo />} actions={<ActionButtons />}>
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
        {resources.map((resource) => {
          return <ResourceItem key={resource.id} resource={resource} />;
        })}
      </div>
    </Page>
  );
}
