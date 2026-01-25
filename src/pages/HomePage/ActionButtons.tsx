import {
  CirclePlusIcon,
  EllipsisVerticalIcon,
  MonitorDownIcon,
  MonitorUpIcon,
} from 'lucide-react';
import { useNavigate } from '@/lib/router/hooks';
import {
  Button,
  clsx,
  DropdownMenu,
  IconButton,
  useDialog,
} from '@/packages/react-dom-lib';
import { ExportStoreDialog } from './ExportStoreDialog';
import { ImportStoreDialog } from './ImportStoreDialog';

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
] as const;

export function ActionButtons() {
  const navigate = useNavigate();
  const { openDialog } = useDialog();

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
          switch (e) {
            case 'export':
              openDialog(({ closeDialog }) => (
                <ExportStoreDialog closeDialog={closeDialog} />
              ));
              break;
            case 'import':
              openDialog(({ closeDialog }) => (
                <ImportStoreDialog closeDialog={closeDialog} />
              ));
              break;
          }
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
