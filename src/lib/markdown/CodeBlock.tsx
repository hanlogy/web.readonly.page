import {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactElement,
} from 'react';
import { ClipboardCheckIcon, ClipboardIcon } from 'lucide-react';
import { clsx } from '@/packages/react-dom-lib';

export function CodeBlock({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLElement>) {
  const contentRef = useRef<HTMLSpanElement | null>(null);
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    const text = contentRef.current?.textContent ?? '';
    if (!text) {
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  }, []);

  return (
    <pre className={className} {...rest}>
      {Children.map(children, (child) => {
        if (!isValidElement(child) || child.type !== 'code') {
          return child;
        }

        const codeNode = child as ReactElement<HTMLAttributes<HTMLElement>>;
        const { props } = codeNode;

        return cloneElement(codeNode, {
          className: clsx(props.className, 'relative'),
          children: (
            <>
              <span ref={contentRef}>{props.children}</span>
              <button
                onClick={onCopy}
                className="absolute top-0 right-0 cursor-pointer text-gray-400 hover:text-gray-200"
              >
                {copied ? (
                  <ClipboardCheckIcon className="text-green-600" size={22} />
                ) : (
                  <ClipboardIcon size={22} />
                )}
              </button>
            </>
          ),
        });
      })}
    </pre>
  );
}
