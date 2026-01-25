import { Fragment, type ReactNode } from 'react';

type ButtonValue = string | number | boolean;

type ButtonItemBase<V extends ButtonValue = ButtonValue> = { value: V };

export type ButtonBuilder<ItemT extends ButtonItemBase> = (args: {
  isSelected: boolean;
  isFirst: boolean;
  isLast: boolean;
  item: ItemT;
}) => ReactNode;

export function ButtonGroup<ItemT extends ButtonItemBase>({
  buttonBuilder,
  items,
  value,
}: {
  buttonBuilder: ButtonBuilder<ItemT>;
  items: readonly ItemT[];
  value: ItemT['value'];
}) {
  return (
    <div className="round grid auto-cols-fr grid-flow-col">
      {items.map((item, index) => {
        return (
          <Fragment key={String(item.value)}>
            {buttonBuilder({
              item,
              isSelected: value === item.value,
              isFirst: index === 0,
              isLast: index + 1 === items.length,
            })}
          </Fragment>
        );
      })}
    </div>
  );
}
