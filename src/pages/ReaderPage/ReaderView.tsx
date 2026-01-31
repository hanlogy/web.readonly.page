import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { HouseIcon, MenuIcon, Share2Icon, XIcon } from 'lucide-react';
import { ShareResourceDialog } from '@/components/ShareResourceDialog';
import type { ResourceType } from '@/definitions/types';
import { buildReadUrl } from '@/helpers/buildReadUrl';
import { useNavigate } from '@/lib/router';
import {
  Button,
  clsx,
  FlexCenter,
  IconButton,
  Page,
  useDialog,
} from '@/packages/react-dom-lib';
import { resolveWithBaseUrl } from '@/packages/ts-lib';
import { createHttpClient } from '@/packages/ts-lib/http';
import { MarkdownViewer } from './MarkdownViewer';
import { Sidebar } from './Sidebar';
import { getSidebarUrl } from './getSidebarUrl';

export function PageView({
  type,
  baseUrl,
  fileExtension,
  documentUrl,
  filePath,
}: {
  type: ResourceType;
  baseUrl: string;
  fileExtension: string;
  documentUrl: string;
  filePath?: string;
}) {
  const navigate = useNavigate();
  const [mainContent, setMainContent] = useState<string>();
  const [sidebarShown, setSidebarShown] = useState(false);
  const [sidebarContent, setSidebarContent] = useState<string>();
  const { openDialog } = useDialog();
  const [error, setError] = useState<string | null>(null);

  const linkHrefBuilder = useCallback(
    (ref: string) => {
      return buildReadUrl(
        type === 'collection'
          ? { base: baseUrl, file: ref }
          : { url: resolveWithBaseUrl({ base: baseUrl, ref }) }
      ).readUrl;
    },
    [baseUrl, type]
  );

  useEffect(() => {
    setSidebarShown(false);
  }, [baseUrl, documentUrl]);

  useEffect(() => {
    (async () => {
      const http = createHttpClient();

      if (type === 'collection') {
        const sidebarUrl = getSidebarUrl(baseUrl);
        const { body: sidebarBody } = await http.get({ url: sidebarUrl });

        if (typeof sidebarBody === 'string') {
          setSidebarContent(sidebarBody);
        }
      }

      try {
        const { status, body: mainBody } = await http.get({ url: documentUrl });
        if (status < 200 || status > 299) {
          throw new Error();
        }

        if (typeof mainBody === 'string') {
          setError(null);
          setMainContent(mainBody);
        }
      } catch {
        setError(`Failed to fetch document from ${documentUrl}`);
      }
    })();
  }, [documentUrl, setMainContent, baseUrl, type]);

  let mainView: ReactNode;

  if (error) {
    mainView = (
      <div className="pt-10 text-center">
        <div className="text-red-600">{error}</div>
        <div className="mt-10 mb-5">The reasons could be:</div>
        <ul className="mx-auto w-fit list-outside list-disc space-y-2 text-left text-gray-600">
          <li>The document URL is wrong, or the file doesn't exist</li>
          <li>The server blocks cross-origin requests (CORS)</li>
          <li>The URL isn't HTTPS (SSL)</li>
          <li>Access is restricted</li>
        </ul>
      </div>
    );
  } else if (!mainContent) {
    mainView = <></>;
  } else if (fileExtension === 'md') {
    mainView = (
      <MarkdownViewer
        linkHrefBuilder={linkHrefBuilder}
        baseUrl={baseUrl}
        text={mainContent}
      />
    );
  }

  return (
    <Page
      withVerticalPadding={false}
      withHorizontalPadding={false}
      navigateBackButton={
        <IconButton onClick={() => navigate({ pathname: '/' })}>
          <HouseIcon />
        </IconButton>
      }
      actions={
        <>
          <Button
            className="text-gray-600"
            icon={<Share2Icon size={18} />}
            onClick={() => {
              openDialog(({ closeDialog }) => (
                <ShareResourceDialog
                  resource={
                    type === 'file'
                      ? {
                          type: 'file',
                          url: documentUrl,
                        }
                      : {
                          type: 'collection',
                          baseUrl: baseUrl,
                          // TODO: make it typesafe
                          file: filePath ?? '',
                        }
                  }
                  closeDialog={closeDialog}
                />
              ));
            }}
          >
            Share
          </Button>
        </>
      }
    >
      {sidebarContent ? (
        <>
          <FlexCenter className="fixed left-2 z-100 h-10 w-10 xl:hidden">
            <IconButton
              className={clsx('mt-px rounded-none text-gray-600', {
                'bg-white': sidebarShown,
                'rounded-b-sm bg-gray-100': !sidebarShown,
              })}
              onClick={() => setSidebarShown(!sidebarShown)}
            >
              {sidebarShown ? <XIcon size={20} /> : <MenuIcon size={20} />}
            </IconButton>
          </FlexCenter>
          <div
            className={clsx(
              'fixed top-16 bottom-0 left-0 w-76 border-r border-r-gray-200 bg-white pt-8 xl:block! xl:pt-0',
              {
                hidden: !sidebarShown,
              }
            )}
          >
            <Sidebar baseUrl={baseUrl} text={sidebarContent} />
          </div>
          <div className="xl:ml-76">{mainView}</div>
        </>
      ) : (
        mainView
      )}
    </Page>
  );
}
