import { useState } from 'react';
import {
  Button,
  clsx,
  DialogActionBar,
  DialogScaffold,
  DialogTopbar,
  type CloseDialogFn,
} from '@hanlogy/react-web-ui';
import { ClipboardCheckIcon, ClipboardIcon } from 'lucide-react';
import { buildReadUrl } from '@/helpers/buildReadUrl';

export function ShareResourceDialog({
  closeDialog,
  resource,
}: {
  closeDialog: CloseDialogFn;
  resource:
    | { type: 'file'; url: string }
    | { type: 'collection'; baseUrl: string; file: string };
}) {
  const [copied, setCopied] = useState(false);

  let readParams: Parameters<typeof buildReadUrl>[0];
  if (resource.type === 'collection') {
    readParams = { base: resource.baseUrl, file: resource.file };
  } else {
    readParams = { url: resource.url };
  }
  const url = `${window.location.origin}` + buildReadUrl(readParams).readUrl;

  return (
    <DialogScaffold
      className="max-w-md rounded-[1.75rem] bg-white py-6 shadow-lg"
      topbar={
        <DialogTopbar className="text-xl font-medium text-gray-600">
          Share
        </DialogTopbar>
      }
      bottomBar={
        <DialogActionBar>
          <Button
            className={clsx({
              'text-gray-800': !copied,
              'text-green-800': copied,
            })}
            onClick={async () => {
              await navigator.clipboard.writeText(url);
              setCopied(true);
              setTimeout(() => setCopied(false), 1200);
            }}
            icon={
              copied ? (
                <ClipboardCheckIcon size={18} />
              ) : (
                <ClipboardIcon size={18} />
              )
            }
          >
            Copy To Clipboard
          </Button>
          <Button className="text-gray-500" onClick={() => closeDialog()}>
            Close
          </Button>
        </DialogActionBar>
      }
    >
      <div className="px-6 pb-4 text-gray-600">
        <div className="text-sm break-all text-gray-500">{url}</div>
      </div>
    </DialogScaffold>
  );
}
