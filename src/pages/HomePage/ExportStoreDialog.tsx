import {
  Button,
  DialogActionBar,
  DialogScaffold,
  DialogTopbar,
  type CloseDialogFn,
} from '@hanlogy/react-web-ui';
import { downloadStore } from '@/helpers/downloadStore';
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
    <DialogScaffold
      className="max-w-md rounded-[1.75rem] bg-white py-6 shadow-lg"
      topbar={
        <DialogTopbar className="text-xl font-medium text-gray-600">
          Export Pages
        </DialogTopbar>
      }
      bottomBar={
        <DialogActionBar>
          {isNotEmpty && <Button onClick={() => handleExport()}>Export</Button>}
          <Button className="text-gray-500" onClick={() => closeDialog()}>
            Cancel
          </Button>
        </DialogActionBar>
      }
    >
      <div className="px-6 pb-4 text-gray-600">
        {isNotEmpty ? (
          <>The exported file is a JSON file.</>
        ) : (
          <>You do not have saved pages yet.</>
        )}
      </div>
    </DialogScaffold>
  );
}
