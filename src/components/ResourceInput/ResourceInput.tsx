import type { ResourceType } from '@/definitions/types';
import { getExtensionFromUrl } from '@/helpers/getExtensionFromUrl';
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
              helper="Folder containing _sidebar.md"
              controller={register('baseUrl', {
                validator: ({ baseUrl }) => {
                  const url = baseUrl?.trim() ?? '';
                  if (!url) {
                    return 'Root URL is required';
                  }

                  return validateUrl(url);
                },
              })}
            />
          </div>
          <div>
            <TextInput
              label="Start page path"
              helper="Relative to Root URL, e.g. README.md"
              controller={register('entryFile', {
                validator: ({ entryFile }) => {
                  if (!entryFile?.trim()) {
                    return 'Start page is required';
                  }
                  return validateExtension(entryFile);
                },
              })}
            />
          </div>
        </>
      ) : (
        <div>
          <TextInput
            label="File URL"
            controller={register('url', {
              validator: ({ url }) => {
                url = url?.trim() ?? '';
                if (!url) {
                  return 'File URL is required';
                }

                return validateUrl(url) || validateExtension(url);
              },
            })}
          />
        </div>
      )}
    </>
  );
}

function validateUrl(url: string): undefined | string {
  if (!url.trim()) {
    return 'Not a valid URL';
  }
}

function validateExtension(ref: string) {
  return getExtensionFromUrl(ref) === 'md'
    ? undefined
    : 'Unsupported file type. Only .md is supported for now.';
}
