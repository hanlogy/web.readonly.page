import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react';
import { parseSidebar } from '@/lib/markdown';
import type { SidebarItem } from '@/lib/markdown/types';
import { Link, useLocation } from '@/lib/router';
import {
  clsx,
  CollapsibleTree,
  IconButton,
  resolveUrlWithBase,
} from '@/packages/react-dom-lib';

export function Sidebar({ text, url }: { text: string; url: string }) {
  const items = parseSidebar(text);

  return (
    <div className="p-4">
      <CollapsibleTree
        itemBuilder={(item, isCollapsed, toggleIsCollapsed) => (
          <SidebarButton
            url={url}
            item={item}
            isCollapsed={isCollapsed}
            toggleIsCollapsed={toggleIsCollapsed}
          />
        )}
        keyBuilder={(e) => e.text}
        items={items}
      />
    </div>
  );
}

function SidebarButton({
  toggleIsCollapsed,
  item,
  isCollapsed,
  url,
}: {
  toggleIsCollapsed: VoidFunction;
  item: SidebarItem;
  isCollapsed: boolean;
  url: string;
}) {
  const { pathname } = useLocation();

  return (
    <div
      className={clsx('flex h-9 w-full items-center text-left text-gray-600')}
    >
      <Link
        to={{
          pathname,
          hash: resolveUrlWithBase({ base: url, url: item.link }),
        }}
        className="flex-1 pl-2 text-gray-500 hover:text-gray-700"
      >
        {item.text}
      </Link>
      {item.children.length > 0 && (
        <IconButton onClick={() => toggleIsCollapsed()}>
          {isCollapsed ? (
            <ChevronRightIcon size={20} />
          ) : (
            <ChevronDownIcon size={20} />
          )}
        </IconButton>
      )}
    </div>
  );
}
