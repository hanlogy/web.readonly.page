import type { PropsWithChildren, MouseEvent } from 'react';
import { pathToUrl } from './helpers';
import { useNavigate } from './hooks';
import type { PartialPath } from './types';

export function Link({
  children,
  to,
  className,
}: PropsWithChildren<{ to: PartialPath; className?: string }>) {
  const navigate = useNavigate();

  const handleLink = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={pathToUrl(to)} onClick={handleLink} className={className}>
      {children}
    </a>
  );
}
