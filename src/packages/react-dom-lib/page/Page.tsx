import type { PropsWithChildren, ReactNode } from 'react';
import { AppBar } from './AppBar';
import { AppTitle } from './AppTitle';
import { PageBody } from './PageBody';
import { Scaffold } from './Scaffold';

export function Page({
  children,
  title,
  centerTitle = true,
  actions,
  navigateBackButton,
  bottomBar,
  withVerticalPadding = true,
  withHorizontalPadding = true,
}: PropsWithChildren<{
  readonly title?: ReactNode;
  readonly actions?: ReactNode;
  readonly centerTitle?: boolean;
  readonly navigateBackButton?: string;
  readonly useCloseButton?: boolean;
  readonly bottomBar?: ReactNode;
  readonly withVerticalPadding?: boolean;
  readonly withHorizontalPadding?: boolean;
}>) {
  let appBar: ReactNode | undefined;

  if (title || actions || navigateBackButton) {
    appBar = (
      <AppBar
        actions={actions}
        leading={navigateBackButton}
        centerTitle={centerTitle}
      >
        <AppTitle>{title}</AppTitle>
      </AppBar>
    );
  }

  return (
    <Scaffold appBar={appBar} bottomBar={bottomBar}>
      <PageBody
        withVerticalPadding={withVerticalPadding}
        withHorizontalPadding={withHorizontalPadding}
      >
        {children}
      </PageBody>
    </Scaffold>
  );
}
