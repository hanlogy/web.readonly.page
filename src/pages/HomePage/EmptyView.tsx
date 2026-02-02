import { useState } from 'react';
import { ResourceInput } from '@/components/ResourceInput';
import type { ResourceType } from '@/definitions/types';
import { buildReadUrl } from '@/helpers/buildReadUrl';
import { useNavigate } from '@/lib/router';
import { useUpsertResourceMutation } from '@/operations/useUpsertResourceMutation';
import { Button, useForm } from '@/packages/react-dom-lib';

interface FormData {
  readonly url?: string;
  readonly baseUrl?: string;
  readonly entryFile?: string;
}

export function EmptyView() {
  const [type, setType] = useState<ResourceType>('file');
  const { register, handleSubmit } = useForm<FormData>();
  const navigate = useNavigate();
  const { upsertResource } = useUpsertResourceMutation({ type });

  const onSubmit = async (formData: FormData) => {
    await upsertResource({
      name: 'unnamed',
      requiresAuth: false,
      ...formData,
    });

    let resource: Parameters<typeof buildReadUrl>[0];
    const { url, baseUrl, entryFile } = formData;
    if (type === 'file') {
      if (!url) {
        return;
      }
      resource = { url };
    } else {
      if (!baseUrl || !entryFile) {
        return;
      }
      resource = { base: baseUrl, file: entryFile };
    }

    navigate(buildReadUrl(resource));
  };

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center py-4 text-center lg:pt-8">
      <div className="w-full">
        <div className="mb-2 text-2xl text-gray-600">
          Read a file or a collection
        </div>
        <div className="text-sm text-gray-500">
          Runs in your browser. No tracking.
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-8">
          <ResourceInput
            type={type}
            onChangeType={setType}
            register={register}
          />
          <Button
            type="submit"
            size="small"
            className="mb-6 bg-gray-600 px-12 font-medium text-white hover:opacity-80"
          >
            Read
          </Button>
        </form>
        <a
          className="text-sm font-medium text-neutral-900 underline underline-offset-4 hover:opacity-80"
          href="https://readonly.page/read#base=docs.readonly.page/en-US/~file=privacy-policy.md"
        >
          How privacy works
        </a>
      </div>

      <Button
        size="small"
        className="mt-10 hidden! bg-gray-100 px-8 font-medium text-neutral-900 hover:opacity-80"
      >
        Add some sample pages
      </Button>
    </div>
  );
}
