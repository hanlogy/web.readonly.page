import { IconButton } from '@hanlogy/react-web-ui';
import { XIcon, ChevronLeftIcon } from 'lucide-react';
import { useNavigateBack } from '@/lib/router';
import type { PartialPath } from '@/lib/router/types';

export function NavigateBackButton({
  path,
  useCloseButton = false,
}: {
  path: PartialPath;
  useCloseButton?: boolean;
}) {
  const navigateBack = useNavigateBack();

  return (
    <IconButton onClick={() => navigateBack(path)}>
      {useCloseButton ? <XIcon /> : <ChevronLeftIcon />}
    </IconButton>
  );
}
