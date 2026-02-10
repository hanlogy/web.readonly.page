import { useState } from 'react';
import {
  Button,
  DialogActionBar,
  DialogScaffold,
  DialogTopbar,
  IconButton,
  type CloseDialogFn,
} from '@hanlogy/react-web-ui';
import { Trash2Icon } from 'lucide-react';
import { DropFileBox } from '@/components/DropFileBox';
import { mergeResources } from '@/helpers/mergeResources';
import { readStoreFile } from '@/helpers/readStoreFile';
import { clearResources, upsertManyResources } from '@/repositories/localDB';
import { useStoreDispatch, useStoreState } from '@/states/store';

export function ImportStoreDialog({
  closeDialog,
}: {
  closeDialog: CloseDialogFn;
}) {
  const { resources } = useStoreState();
  const dispatch = useStoreDispatch();
  const [isReplace, setIsReplace] = useState(false);
  const [file, setFile] = useState<File | undefined>();

  const handleImport = async () => {
    if (!file) {
      return;
    }
    const { resources: importedResources } = await readStoreFile(file);
    const finalResources = isReplace
      ? importedResources
      : mergeResources(resources, importedResources);

    await clearResources();
    await upsertManyResources(finalResources);

    dispatch({
      type: 'importResource',
      payload: finalResources,
    });

    closeDialog();
  };

  return (
    <DialogScaffold
      className="max-w-md rounded-[1.75rem] bg-white py-6 shadow-lg"
      topbar={
        <DialogTopbar className="text-xl font-medium text-gray-600">
          Import Pages
        </DialogTopbar>
      }
      bottomBar={
        <DialogActionBar>
          <Button disabled={!file} onClick={() => handleImport()}>
            Import
          </Button>
          <Button className="text-gray-500" onClick={() => closeDialog()}>
            Cancel
          </Button>
        </DialogActionBar>
      }
    >
      <div className="px-6 text-gray-600 pb-4">
        {file ? (
          <>
            <div className="flex items-center space-x-4">
              <div className="text-gray-500">{file.name}</div>
              <IconButton
                onClick={() => setFile(undefined)}
                className="text-gray-600"
                size="xsmall"
              >
                <Trash2Icon />
              </IconButton>
            </div>
            <label className="mt-2 block text-gray-700">
              <input
                type="checkbox"
                className="mr-2"
                onChange={(e) => {
                  setIsReplace(e.currentTarget.checked);
                }}
              />
              Replace current pages
            </label>
          </>
        ) : (
          <DropFileBox
            accept="application/json"
            label="Drop the exported file here"
            multiple={false}
            onFiles={async (files) => {
              setFile(files[0]);
            }}
          />
        )}
      </div>
    </DialogScaffold>
  );
}
