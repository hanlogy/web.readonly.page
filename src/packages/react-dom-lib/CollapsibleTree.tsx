import { useState, type Key, type ReactNode } from 'react';

type ItemBuilder<T> = (
  item: T,
  isCollapsed: boolean,
  toggleIsCollapsed: VoidFunction
) => ReactNode;

type KeyBuilder<T> = (item: T) => Key;

export function CollapsibleTree<T extends { children?: T[] }>({
  items,
  itemBuilder,
  keyBuilder,
}: {
  items: readonly T[];
  itemBuilder: ItemBuilder<T>;
  keyBuilder: KeyBuilder<T>;
}) {
  return items.map((item) => (
    <TreeNode
      key={keyBuilder(item)}
      item={item}
      itemBuilder={itemBuilder}
      keyBuilder={keyBuilder}
    />
  ));
}

function TreeNode<T extends { children?: T[] }>({
  item,
  itemBuilder,
  keyBuilder,
}: {
  item: T;
  itemBuilder: ItemBuilder<T>;
  keyBuilder: KeyBuilder<T>;
}) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  return (
    <>
      {itemBuilder(item, isCollapsed, () => {
        if (!item.children || !item.children.length) {
          return;
        }
        setIsCollapsed((prev) => !prev);
      })}
      {item.children && item.children.length > 0 && !isCollapsed && (
        <div className="pl-3">
          <CollapsibleTree
            itemBuilder={itemBuilder}
            keyBuilder={keyBuilder}
            items={item.children}
          />
        </div>
      )}
    </>
  );
}
