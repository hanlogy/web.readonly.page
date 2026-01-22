import {
  CirclePlusIcon,
  EllipsisVerticalIcon,
  EraserIcon,
  MonitorDownIcon,
  MonitorUpIcon,
} from 'lucide-react';
import { useNavigate } from '@/lib/router/hooks';
import {
  Button,
  clsx,
  DropdownMenu,
  IconButton,
} from '@/packages/react-dom-lib';

const dropdownOptions = [
  {
    label: 'Export Pages',
    value: 'export',
    icon: <MonitorDownIcon className="h-4 w-4" />,
  },
  {
    label: 'Import Pages',
    value: 'import',
    icon: <MonitorUpIcon className="h-4 w-4" />,
  },
  {
    label: 'Clear Pages',
    value: 'erase',
    icon: <EraserIcon className="h-4 w-4" />,
  },
] as const;

export function ActionButtons() {
  const navigate = useNavigate();

  const gotoAddEntryPage = () => {
    navigate({ pathname: '/resource-editor' });
  };

  const addIcon = <CirclePlusIcon className="h-full w-full" />;

  return (
    <div className="flex text-gray-700">
      <div className="contents sm:hidden">
        <IconButton onClick={gotoAddEntryPage}>{addIcon}</IconButton>
      </div>
      <div className="hidden sm:contents">
        <Button size="small" icon={addIcon} onClick={gotoAddEntryPage}>
          Add page
        </Button>
      </div>
      <DropdownMenu
        onSelect={(e) => {
          console.log(e);
        }}
        button={(show, isShown) => {
          return (
            <IconButton
              className={clsx({
                'bg-gray-200': isShown,
              })}
              onClick={() => show()}
            >
              <EllipsisVerticalIcon className="h-5 w-5" />
            </IconButton>
          );
        }}
        alignment="bottomRight"
        options={dropdownOptions}
      />
    </div>
  );
}
