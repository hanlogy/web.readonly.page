import {
  Button,
  DialogActionBar,
  DialogScaffold,
  DialogTopbar,
  useDialog,
} from '@hanlogy/react-web-ui';

export function useConfirmDialog() {
  const { openDialog } = useDialog();

  return ({ title, message }: { title?: string; message?: string } = {}) =>
    openDialog<boolean>(({ closeDialog }) => (
      <DialogScaffold
        className="max-w-md rounded-[1.75rem] bg-white py-6 shadow-lg"
        topbar={<DialogTopbar>{title}</DialogTopbar>}
        bottomBar={
          <DialogActionBar>
            <Button className="text-red-600" onClick={() => closeDialog(true)}>
              Delete
            </Button>
            <Button
              className="text-gray-500"
              onClick={() => closeDialog(false)}
            >
              Cancel
            </Button>
          </DialogActionBar>
        }
      >
        {message}
      </DialogScaffold>
    ));
}
