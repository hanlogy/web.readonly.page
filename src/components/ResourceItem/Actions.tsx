import {
  clsx,
  DropdownMenu,
  IconButton,
  useDialog,
} from '@hanlogy/react-web-ui';
import {
  Edit2Icon,
  EllipsisVerticalIcon,
  Share2Icon,
  TrashIcon,
} from 'lucide-react';
import type { Resource } from '@/definitions/types';
import { useNavigate } from '@/lib/router';
import { deleteResource } from '@/repositories/localDB';
import { useStoreDispatch } from '@/states/store';
import { ShareResourceDialog } from '../ShareResourceDialog';
import { useConfirmDialog } from '../dialogs/confirmDialog';

const options = [
  {
    label: 'Share',
    value: 'share',
    icon: <Share2Icon className="h-4 w-4" />,
  },
  {
    label: 'Edit',
    value: 'edit',
    icon: <Edit2Icon className="h-4 w-4" />,
  },
  {
    label: 'Delete',
    value: 'delete',
    icon: <TrashIcon className="h-4 w-4" />,
  },
] as const;

export function Actions({ resource }: { resource: Resource }) {
  const navigate = useNavigate();
  const { openDialog } = useDialog();
  const dispatch = useStoreDispatch();
  const openConfirmDialog = useConfirmDialog();
  const { id, name } = resource;

  const handleSelect = async (e: (typeof options)[number]['value']) => {
    switch (e) {
      case 'edit':
        navigate({
          pathname: 'resource-editor',
          hash: id,
        });
        break;
      case 'delete': {
        const confirmed = await openConfirmDialog({
          title: 'Delete page',
          message: `"${name}" will be removed form list`,
        });
        if (confirmed === true) {
          await deleteResource(id);
          dispatch({
            type: 'deleteResource',
            payload: id,
          });
        }
        break;
      }
      case 'share': {
        openDialog(({ closeDialog }) => (
          <ShareResourceDialog
            resource={
              resource.type === 'file'
                ? {
                    type: 'file',
                    url: resource.url,
                  }
                : {
                    type: 'collection',
                    baseUrl: resource.baseUrl,
                    file: resource.entryFile,
                  }
            }
            closeDialog={closeDialog}
          />
        ));
        break;
      }
    }
  };

  return (
    <DropdownMenu
      className="rounded-lg border border-gray-200 bg-white p-1 shadow-lg"
      options={options}
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
            className="w-full cursor-pointer rounded-sm px-5 py-2 text-left hover:bg-gray-200"
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
  );
}
