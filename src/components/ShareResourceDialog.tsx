import { useState } from 'react';
import { ClipboardCheckIcon, ClipboardIcon } from 'lucide-react';
import { buildPathHash } from '@/lib/router/helpers';
import {
  Button,
  clsx,
  Dialog,
  DialogActionBar,
  type CloseDialogFn,
} from '@/packages/react-dom-lib';

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
  //let hash: string[] = [];
  let params: Record<string, string> = {};

  if (resource.type === 'collection') {
    params = { base: resource.baseUrl, file: resource.file };
  } else {
    params = { url: resource.url };
  }
  const url = `${window.location.origin}/read` + buildPathHash(params);

  return (
    <Dialog
      title="Share"
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
      <div className="text-sm break-all text-gray-500">{url}</div>
    </Dialog>
  );
}
