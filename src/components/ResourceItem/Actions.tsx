import {
  Edit2Icon,
  EllipsisVerticalIcon,
  Share2Icon,
  TrashIcon,
} from 'lucide-react';
import type { Resource } from '@/definitions/types';
import { useNavigate } from '@/lib/router';
import {
  clsx,
  DropdownMenu,
  IconButton,
  useDialog,
} from '@/packages/react-dom-lib';
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

  return (
    <DropdownMenu
      onSelect={async (e) => {
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
      options={options}
    />
  );
}
