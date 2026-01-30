import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react';
import { parseSidebar } from '@/lib/markdown';
import type { SidebarItem } from '@/lib/markdown/types';
import { Link } from '@/lib/router';
import { buildPathHash } from '@/lib/router/helpers';
import { clsx, CollapsibleTree, IconButton } from '@/packages/react-dom-lib';

export function Sidebar({ text, baseUrl }: { text: string; baseUrl: string }) {
  const items = parseSidebar(text);

  return (
    <div className="p-4">
      <CollapsibleTree
        itemBuilder={(item, isCollapsed, toggleIsCollapsed) => (
          <SidebarButton
            baseUrl={baseUrl}
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
  baseUrl,
}: {
  toggleIsCollapsed: VoidFunction;
  item: SidebarItem;
  isCollapsed: boolean;
  baseUrl: string;
}) {
  return (
    <div
      className={clsx('flex h-9 w-full items-center text-left text-gray-600')}
    >
      {item.link ? (
        <Link
          to={{
            pathname: 'read',
            hash: buildPathHash({ base: baseUrl, file: item.link }),
          }}
          className="flex-1 pl-2 text-gray-500 hover:text-gray-700"
        >
          {item.text}
        </Link>
      ) : (
        <div className="flex-1 pl-2 text-gray-500">{item.text}</div>
      )}
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
