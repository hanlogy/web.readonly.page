import { type PropsWithChildren, type ReactNode, useState } from 'react';
import {
  buildAppBarClassName,
  buildBodyClassName,
  buildBottomBarClassName,
} from './buildClassNames';

type AppBarHeight = 16;
type BottomBarHeight = 16;
type NavHeight = 16;

interface Props extends PropsWithChildren {
  appBar?: ReactNode;
  bottomBar?: ReactNode;
  appBarHeight?: AppBarHeight;
  bottomBarHeight?: BottomBarHeight;
}

// The bottom navigation bar when on small screens
const NAV_HEIGHT: NavHeight = 16;

/**
 * **NOTE:** \
 * Scaffold does not build in `SafeArea`
 */
export function Scaffold({
  children,
  appBar,
  bottomBar,
  appBarHeight = 16,
  bottomBarHeight = 16,
}: Props) {
  // If it is placed in #root directly
  const [inRoot, setInRoot] = useState(false);

  const setRef = (node: HTMLDivElement | null) => {
    if (!node) {
      return;
    }

    setInRoot(node.parentElement?.id === 'root');
  };

  const hasAppBar = !!appBar;
  const hasBottomBar = !!bottomBar;

  return (
    <div ref={setRef} data-role="scaffold-component">
      {appBar && (
        <div className={buildAppBarClassName({ inRoot })}>{appBar}</div>
      )}
      <div
        data-role="scaffold-body-container"
        className={buildBodyClassName({
          hasAppBar,
          hasBottomBar,
          appBarHeight,
          bottomBarHeight,
          navHeight: NAV_HEIGHT,
          inRoot,
        })}
      >
        {
          // `children` should handle the safe area.
          // Warning:
          // `Scaffold` component does not handle the safe area to allow more
          // flexibility in the implementation.
          children
        }
      </div>
      {bottomBar && (
        <div
          className={buildBottomBarClassName({ inRoot, navHeight: NAV_HEIGHT })}
        >
          <div className="w-full">{bottomBar}</div>
        </div>
      )}
    </div>
  );
}
