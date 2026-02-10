import {
  Button,
  clsx,
  DropdownMenu,
  IconButton,
  useDialog,
} from '@hanlogy/react-web-ui';
import {
  CirclePlusIcon,
  EllipsisVerticalIcon,
  MonitorDownIcon,
  MonitorUpIcon,
} from 'lucide-react';
import { useNavigate } from '@/lib/router/hooks';
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

  const handleSelect = async (e: (typeof dropdownOptions)[number]['value']) => {
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
  };

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
        className="rounded-lg border border-gray-200 bg-white p-1 shadow-lg"
        options={dropdownOptions}
        alignment="bottomRight"
        buttonBuilder={({ show, isShown }) => {
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
        itemBuilder={({ item, close }) => {
          return (
            <button
              className="w-full cursor-pointer rounded-sm px-5 py-2 hover:bg-gray-200"
              onClick={() => {
                handleSelect(item.value);
                close();
              }}
            >
              {item.label}
            </button>
          );
        }}
        keyBuilder={({ value }) => value}
      />
    </div>
  );
}
