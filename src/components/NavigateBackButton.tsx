import { XIcon } from 'lucide-react';
import { useNavigateBack } from '@/lib/router';
import type { PartialPath } from '@/lib/router/types';
import { IconButton } from '@/packages/react-dom-lib';

export function NavigateBackButton({ path }: { path: PartialPath }) {
  const navigateBack = useNavigateBack();

  return (
    <IconButton onClick={() => navigateBack(path)}>
      <XIcon />
    </IconButton>
  );
}
