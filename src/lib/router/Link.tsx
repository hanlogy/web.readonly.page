import type { PropsWithChildren, MouseEvent } from 'react';
import type { Location } from './definitions';
import { locationToUrl } from './helpers';
import { useNavigate } from './hooks';

export function Link({ children, to }: PropsWithChildren<{ to: Location }>) {
  const navigate = useNavigate();

  const handleLink = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={locationToUrl(to)} onClick={handleLink}>
      {children}
    </a>
  );
}
