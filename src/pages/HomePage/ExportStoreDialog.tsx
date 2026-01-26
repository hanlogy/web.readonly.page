import { downloadStore } from '@/helpers/downloadStore';
import {
  Button,
  Dialog,
  DialogActionBar,
  type CloseDialogFn,
} from '@/packages/react-dom-lib';
import { useStoreState } from '@/states/store';

export function ExportStoreDialog({
  closeDialog,
}: {
  closeDialog: CloseDialogFn;
}) {
  const { resources } = useStoreState();
  const isNotEmpty = resources.length > 0;

  const handleExport = () => {
    downloadStore({
      resources,
    });
    closeDialog();
  };

  return (
    <Dialog
      title="Export Pages"
      bottomBar={
        <DialogActionBar>
          {isNotEmpty && <Button onClick={() => handleExport()}>Export</Button>}
          <Button className="text-gray-500" onClick={() => closeDialog()}>
            Cancel
          </Button>
        </DialogActionBar>
      }
    >
      {isNotEmpty ? (
        <>The exported file is a JSON file.</>
      ) : (
        <>You do not have saved pages yet.</>
      )}
    </Dialog>
  );
}
