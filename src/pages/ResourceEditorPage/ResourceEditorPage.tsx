import { useTransition } from 'react';
import { NavigateBackButton } from '@/components/NavigateBackButton';
import {
  Button,
  CheckboxInput,
  MultilineTextInput,
  Page,
  TextInput,
  useForm,
} from '@/packages/react-dom-lib';

interface FormData {
  readonly name: string;
  readonly url: string;
  readonly description?: string;
  readonly requiresAuth: boolean;
}

export function ResourceEditorPage() {
  const { register, handleSubmit } = useForm<FormData>();
  const [isPending, startTransition] = useTransition();

  const onSubmit = (formData: FormData) => {
    startTransition(async () => {
      console.log(formData);
    });
  };
  console.log(isPending);

  return (
    <Page
      title="Add page"
      navigateBackButton={<NavigateBackButton path={{ pathname: '/' }} />}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto mt-4 max-w-2xl space-y-4"
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
        </div>
        <div>
          <MultilineTextInput
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
