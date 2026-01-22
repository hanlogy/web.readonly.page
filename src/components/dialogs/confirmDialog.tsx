import {
  Button,
  Dialog,
  DialogActionBar,
  useDialog,
} from '@/packages/react-dom-lib';

export function useConfirmDialog() {
  const { openDialog } = useDialog();

  return ({ title, message }: { title?: string; message?: string } = {}) =>
    openDialog<boolean>(({ closeDialog }) => (
      <Dialog
        title={title}
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
      </Dialog>
    ));
}
