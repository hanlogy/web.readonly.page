import { useEffect, useState, type ReactNode } from 'react';
import { HouseIcon, MenuIcon, Share2Icon, XIcon } from 'lucide-react';
import type { ResourceType } from '@/definitions/types';
import { useNavigate } from '@/lib/router';
import {
  Button,
  clsx,
  FlexCenter,
  IconButton,
  Page,
} from '@/packages/react-dom-lib';
import { createHttpClient } from '@/packages/ts-lib/http';
import { MarkdownViewer } from './MarkdownViewer';
import { Sidebar } from './Sidebar';
import { getSidebarUrl } from './getSidebarUrl';

export function PageView({
  type,
  baseUrl,
  fileExtension,
  documentUrl,
}: {
  type: ResourceType;
  baseUrl: string;
  fileExtension: string;
  documentUrl: string;
}) {
  const navigate = useNavigate();
  const [mainContent, setMainContent] = useState<string>();
  const [sidebarShown, setSidebarShown] = useState(false);
  const [sidebarContent, setSidebarContent] = useState<string>();

  useEffect(() => {
    (async () => {
      const http = createHttpClient();

      if (type === 'collection') {
        const sidebarUrl = getSidebarUrl(baseUrl);
        const { body: sidebarBody } = await http.get({
          url: sidebarUrl,
        });

        if (typeof sidebarBody === 'string') {
          setSidebarContent(sidebarBody);
        }
      }

      const { body: mainBody } = await http.get({ url: documentUrl });

      if (typeof mainBody === 'string') {
        setMainContent(mainBody);
      }
    })();
  }, [documentUrl, setMainContent, baseUrl, type]);

  let mainView: ReactNode;

  if (!mainContent) {
    mainView = <></>;
  } else if (fileExtension === 'md') {
    mainView = <MarkdownViewer baseUrl={baseUrl} text={mainContent} />;
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
          <Button className="text-gray-600" icon={<Share2Icon size={18} />}>
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
