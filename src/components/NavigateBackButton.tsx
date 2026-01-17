import { XIcon } from 'lucide-react';
import { useNavigateBack } from '@/lib/router';
import type { Path } from '@/lib/router/types';
import { IconButton } from '@/packages/react-dom-lib';

export function NavigateBackButton({ path }: { path: Path }) {
  const navigateBack = useNavigateBack();

  return (
    <IconButton onClick={() => navigateBack(path)}>
      <XIcon />
    </IconButton>
  );
}
