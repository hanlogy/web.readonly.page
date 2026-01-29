import type { ResourceType } from '@/definitions/types';
import {
  ButtonGroup,
  clsx,
  TextInput,
  type FormFieldRegister,
} from '@/packages/react-dom-lib';

const typeItems = [
  { label: 'Single file', value: 'file' },
  { label: 'Collection', value: 'collection' },
] as const;

export function ResourceInput({
  type,
  register,
  onChangeType,
}: {
  type: ResourceType;
  register: FormFieldRegister<{
    baseUrl?: string;
    entryFile?: string;
    url?: string;
  }>;
  onChangeType: (type: ResourceType) => void;
}) {
  return (
    <>
      <div className="mx-auto max-w-100">
        <ButtonGroup
          buttonBuilder={({ isSelected, item, isFirst, isLast }) => {
            return (
              <button
                type="button"
                onClick={() => {
                  onChangeType(item.value);
                }}
                className={clsx('border border-gray-200 py-2', {
                  'bg-gray-200 text-gray-800': isSelected,
                  'text-gray-500': !isSelected,
                  'rounded-tl-full rounded-bl-full': isFirst,
                  'rounded-tr-full rounded-br-full': isLast,
                })}
              >
                {item.label}
              </button>
            );
          }}
          value={type}
          items={typeItems}
        />
      </div>
      {type === 'collection' ? (
        <>
          <div>
            <TextInput
              label="Root URL"
              helper="Folder where _sidebar.md is located"
              controller={register('baseUrl', {
                validator: ({ baseUrl }) => {
                  if (!baseUrl?.trim()) {
                    return 'Root URL is required';
                  }
                  if (/#/.test(baseUrl)) {
                    return "Root URL must not contain '#'.";
                  }
                },
              })}
            />
          </div>
          <div>
            <TextInput
              label="Start page path"
              helper="Relative to Root URL, e.g. README.md or ./README.md"
              controller={register('entryFile', {
                validator: ({ entryFile }) => {
                  if (!entryFile?.trim()) {
                    return 'Start page is required';
                  }
                  if (/#/.test(entryFile)) {
                    return "Start page path must not contain '#'.";
                  }
                },
              })}
            />
          </div>
        </>
      ) : (
        <div>
          <TextInput
            label="Document URL"
            controller={register('url', {
              validator: ({ url }) => {
                if (!url?.trim()) {
                  return 'URL is required';
                }
                if (/#/.test(url)) {
                  return "URL must not contain '#'.";
                }
              },
            })}
          />
        </div>
      )}
    </>
  );
}
