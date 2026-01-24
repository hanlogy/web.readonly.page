import { useEffect, useState, type ReactNode } from 'react';
import { HouseIcon, Share2Icon } from 'lucide-react';
import type { ResourceType } from '@/definitions/types';
import { useNavigate } from '@/lib/router';
import { Button, IconButton, Page } from '@/packages/react-dom-lib';
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
          <div className="fixed top-16 bottom-0 left-0 w-76 border-r border-r-gray-200">
            <Sidebar baseUrl={baseUrl} text={sidebarContent} />
          </div>
          <div className="ml-76">{mainView}</div>
        </>
      ) : (
        mainView
      )}
    </Page>
  );
}
