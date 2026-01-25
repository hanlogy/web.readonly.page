import { useContext, useEffect } from 'react';
import { PathContext, NavigateContext } from './contexts';
import { parsePathHash } from './helpers';
import type { PartialPath } from './types';

export function usePath() {
  const value = useContext(PathContext);

  if (!value) {
    throw new Error('No PathContext is provided');
  }

  return value;
}

// TODO: Parse search into Record when needed.
export function useParsedPath() {
  const { hash, ...rest } = usePath();

  return { ...rest, hash: parsePathHash(hash) };
}

export function useNavigate() {
  const value = useContext(NavigateContext);

  if (!value) {
    throw new Error('No NavigateContext is provided');
  }

  return value;
}

export function useNavigateBack() {
  const navigate = useNavigate();

  return (path: PartialPath) => {
    if (window.history.state && window.history.state.index > 0) {
      navigate(-1);
    } else {
      navigate(path, { replace: true });
    }
  };
}

export function useAnchor() {
  const {
    hash: { rawResources, params },
    ...rest
  } = useParsedPath();
  const key = 'anchor';
  const navigate = useNavigate();
  const anchorId = params[key];

  const jumpTo = (id: string) => {
    const headlineNode = document.getElementById(id);
    if (!headlineNode) {
      return;
    }

    const appBar = document.querySelector<HTMLElement>(
      '[data-role="app-bar-component"]'
    );
    const offset = appBar?.getBoundingClientRect().height ?? 0;

    const y =
      window.scrollY + headlineNode.getBoundingClientRect().top - offset - 8;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  useEffect(() => {
    if (!anchorId) {
      return;
    }
    setTimeout(() => {
      jumpTo(anchorId);
    }, 100);
  }, [anchorId]);

  return {
    anchorId,
    setAnchor: (id: string) => {
      const hashParts = [
        rawResources,
        Object.entries({ ...params, [key]: id })
          .map(([k, v]) => `${k}=${v}`)
          .join(';'),
      ].filter(Boolean);

      navigate({
        ...rest,
        hash: hashParts.length ? ['', ...hashParts].join('#') : '',
      });
    },
  };
}
