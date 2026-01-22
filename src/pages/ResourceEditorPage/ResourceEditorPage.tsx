import { useTransition } from 'react';
import { NavigateBackButton } from '@/components/NavigateBackButton';
import type { Resource } from '@/definitions/types';
import { useLocation, useNavigateBack } from '@/lib/router';
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
  readonly url: string;
  readonly description?: string;
  readonly isCollection: boolean;
  readonly requiresAuth: boolean;
}

export function ResourceEditorPage() {
  const navigateBack = useNavigateBack();
  const { hash: resourceId } = useLocation();
  const { register, handleSubmit, setInitialValues } = useForm<FormData>();
  const [isPending, startTransition] = useTransition();
  const { resources } = useStoreState();
  const dispatch = useStoreDispatch();
  const existingResource = resourceId
    ? resources.find((e) => e.id === resourceId)
    : undefined;

  const onSubmit = (formData: FormData) => {
    startTransition(async () => {
      let finalData: Resource;
      const { isCollection, ...formDataRest } = formData;
      const type = isCollection ? 'collection' : ('file' as const);
      const now = new Date();
      if (existingResource) {
        finalData = {
          ...existingResource,
          ...formDataRest,
          type,
          updatedAt: now,
        };
      } else {
        finalData = {
          ...formData,
          type,
          id: crypto.randomUUID(),
          createdAt: now,
          updatedAt: now,
        };
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
    setInitialValues({
      ...existingResource,
      isCollection: existingResource.type === 'collection',
    });
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
        <div>
          <TextInput
            label="URL"
            controller={register('url', {
              validator: ({ url }) => {
                if (!url?.trim()) {
                  return 'URL is required';
                }
              },
            })}
          />
          <div className="pl-3">
            <CheckboxInput
              label="Is a collection"
              controller={register('isCollection')}
            />
          </div>
        </div>
        <div>
          <MultilineTextInput
            rows={4}
            label="Description"
            controller={register('description')}
          />
        </div>
        <div>
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
