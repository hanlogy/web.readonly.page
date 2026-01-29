import { useState, useTransition } from 'react';
import { NavigateBackButton } from '@/components/NavigateBackButton';
import { ResourceInput } from '@/components/ResourceInput';
import type { ResourceType, Resource } from '@/definitions/types';
import { usePath, useNavigateBack } from '@/lib/router';
import {
  Button,
  CheckboxInput,
  MultilineTextInput,
  Page,
  TextInput,
  useForm,
} from '@/packages/react-dom-lib';
import { upsertResource } from '@/repositories/localDB';
import { useStoreDispatch, useStoreState } from '@/states/store';

interface FormData {
  readonly name: string;
  readonly url?: string;
  readonly baseUrl?: string;
  readonly entryFile?: string;
  readonly description?: string;
  readonly requiresAuth: boolean;
}

export function ResourceEditorPage() {
  const navigateBack = useNavigateBack();
  const { hash } = usePath();
  const { register, handleSubmit, setInitialValues } = useForm<FormData>();
  const [isPending, startTransition] = useTransition();
  const { resources } = useStoreState();
  const dispatch = useStoreDispatch();
  const resourceId = hash.replace(/^#*/, '');
  const existingResource = resourceId
    ? resources.find((e) => e.id === resourceId)
    : undefined;
  const [type, setType] = useState<ResourceType>(
    existingResource?.type ?? 'file'
  );

  const onSubmit = (formData: FormData) => {
    startTransition(async () => {
      let finalData: Resource;
      const now = new Date();

      // TODO: Improve type safe later.
      if (existingResource) {
        finalData = {
          id: existingResource.id,
          createdAt: existingResource.createdAt,
          ...formData,
          type,
          updatedAt: now,
        } as Resource;
      } else {
        finalData = {
          ...formData,
          type,
          id: crypto.randomUUID(),
          createdAt: now,
          updatedAt: now,
        } as Resource;
      }

      await upsertResource(finalData);
      dispatch({
        type: 'upsertResource',
        payload: finalData,
      });
      navigateBack({
        pathname: '/',
      });
    });
  };

  const title = resourceId ? 'Edit page' : 'Add page';
  if (existingResource) {
    setInitialValues(existingResource);
  }

  return (
    <Page
      title={title}
      navigateBackButton={
        <NavigateBackButton path={{ pathname: '/' }} useCloseButton />
      }
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto mt-4 max-w-2xl space-y-8"
      >
        <div>
          <TextInput
            label="Name"
            controller={register('name', {
              validator: ({ name }) => {
                if (!name?.trim()) {
                  return 'Name is required';
                }
              },
            })}
          />
        </div>
        <ResourceInput type={type} onChangeType={setType} register={register} />
        <div>
          <MultilineTextInput
            rows={4}
            label="Description"
            controller={register('description')}
          />
        </div>
        <div className="hidden">
          <CheckboxInput
            label="Requires auth"
            controller={register('requiresAuth')}
          />
        </div>
        <div className="flex justify-center">
          <Button
            disabled={isPending}
            type="submit"
            size="medium"
            className="min-w-40 bg-amber-300 disabled:bg-gray-300"
          >
            Save
          </Button>
        </div>
      </form>
    </Page>
  );
}
