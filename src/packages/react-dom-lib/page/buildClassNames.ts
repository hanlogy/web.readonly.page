import clsx from 'clsx';

type T = Record<number, string>;

const pt: T = {
  16: 'pt-16',
};

const pb: T = {
  16: 'pb-16',
  32: 'pb-32',
};

const mdPb: T = {
  16: 'md:pb-16',
};

const bottom: T = {
  16: 'bottom-16',
};

// NOTE: Be careful. To keep it flexible, we have not added the unsafe area
// to the padding yet. Make sure to wrap the content inside `SafeArea`.
const largeScreenBarPosition = 'md:left-46 md:max-w-6xl xl:left-56';

export const buildBodyClassName = ({
  hasBottomBar,
  hasAppBar,
  appBarHeight,
  bottomBarHeight,
  navHeight,
  inRoot,
}: {
  hasBottomBar: boolean;
  hasAppBar: boolean;
  inRoot: boolean;
  appBarHeight: number;
  bottomBarHeight: number;
  navHeight: number;
}) => {
  return clsx(
    'grid min-h-dvh bg-white',
    { [pt[appBarHeight]]: hasAppBar },
    inRoot
      ? {
          [pb[bottomBarHeight]]: hasBottomBar,
        }
      : hasBottomBar
        ? [pb[bottomBarHeight + navHeight], mdPb[bottomBarHeight]]
        : [pb[navHeight], 'md:pb-0']
  );
};

export const buildAppBarClassName = ({ inRoot }: { inRoot: boolean }) => {
  return clsx('fixed top-0 right-0 left-0 z-99 bg-white', {
    [largeScreenBarPosition]: !inRoot,
  });
};

export const buildBottomBarClassName = ({
  inRoot,
  navHeight,
}: {
  inRoot: boolean;
  navHeight: number;
}) => {
  return clsx(
    'fixed right-0 left-0 z-99 bg-white',
    inRoot
      ? ['bottom-0']
      : [largeScreenBarPosition, bottom[navHeight], 'md:bottom-0']
  );
};
