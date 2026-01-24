import { useEffect, useState, type ReactNode } from 'react';
import { HouseIcon, Share2Icon } from 'lucide-react';
import { useLocation, useNavigate } from '@/lib/router';
import { Button, IconButton, Page } from '@/packages/react-dom-lib';
import { createHttpClient } from '@/packages/ts-lib/http';
import { MarkdownViewer } from './MarkdownViewer';
import { Sidebar } from './Sidebar';
import { getExtension } from './getExtension';
import { getSidebarUrl } from './getSidebarUrl';

export function ReaderPage({ type }: { type: 'file' | 'collection' }) {
  const { hash } = useLocation();
  const navigate = useNavigate();
  const [mainContent, setMainContent] = useState<string>();
  const [sidebarContent, setSidebarContent] = useState<string>();

  useEffect(() => {
    if (!hash) {
      return;
    }

    (async () => {
      const http = createHttpClient();

      if (type === 'collection') {
        const sidebarUrl = getSidebarUrl(hash);
        const { body: sidebarBody } = await http.get({
          url: sidebarUrl,
        });

        if (typeof sidebarBody === 'string') {
          setSidebarContent(sidebarBody);
        }
      }

      const { body: mainBody } = await http.get({ url: hash });

      if (typeof mainBody === 'string') {
        setMainContent(mainBody);
      }
    })();
  }, [hash, setMainContent, type]);

  let mainView: ReactNode;

  if (!hash) {
    mainView = <>Target url is missing</>;
  } else {
    const fileExtension = getExtension(hash);

    if (!mainContent) {
      mainView = <></>;
    } else if (fileExtension === 'md') {
      mainView = <MarkdownViewer url={hash} text={mainContent} />;
    }
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
      {sidebarContent && hash ? (
        <>
          <div className="fixed top-16 bottom-0 left-0 w-76 border-r border-r-gray-200">
            <Sidebar url={hash} text={sidebarContent} />
          </div>
          <div className="ml-76">{mainView}</div>
        </>
      ) : (
        mainView
      )}
    </Page>
  );
}
