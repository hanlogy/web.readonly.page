import { CirclePlusIcon, EllipsisIcon } from 'lucide-react';
import { useNavigate } from '@/lib/router/hooks';
import { Button, IconButton } from '@/packages/react-dom-lib';

export function ActionButtons() {
  const navigate = useNavigate();

  const gotoAddEntryPage = () => {
    navigate({ pathname: '/resource-editor' });
  };

  const addIcon = <CirclePlusIcon className="h-full w-full" />;

  return (
    <div className="flex text-gray-700">
      <div className="contents sm:hidden">
        <IconButton onClick={gotoAddEntryPage}>{addIcon}</IconButton>
      </div>
      <div className="hidden sm:contents">
        <Button size="small" icon={addIcon} onClick={gotoAddEntryPage}>
          Add page
        </Button>
      </div>
      <IconButton>
        <EllipsisIcon className="h-full w-full" />
      </IconButton>
    </div>
  );
}
