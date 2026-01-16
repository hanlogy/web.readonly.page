import { Page } from '@/packages/react-dom-lib';
import { ActionButtons } from './ActionButtons';
import { Logo } from './Logo';

export function HomePage() {
  return (
    <Page
      centerTitle={false}
      title={<Logo />}
      actions={<ActionButtons />}
    ></Page>
  );
}
