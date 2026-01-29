import { useCallback, useState } from 'react';
import type { Resource, ResourceType } from '@/definitions/types';
import { upsertResource as upsert } from '@/repositories/localDB';
import { useStoreDispatch } from '@/states/store';

export interface FormData {
  readonly name: string;
  readonly url?: string;
  readonly baseUrl?: string;
  readonly entryFile?: string;
  readonly description?: string;
  readonly requiresAuth: boolean;
}

export function useUpsertResourceMutation({
  initialResource,
  type,
}: {
  initialResource?: Resource;
  type: ResourceType;
}) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useStoreDispatch();

  const upsertResource = useCallback(
    async (formData: FormData) => {
      let finalData: Resource;
      const now = new Date();

      // TODO: Improve type safe later.
      if (initialResource) {
        finalData = {
          id: initialResource.id,
          createdAt: initialResource.createdAt,
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

      try {
        setError(null);
        setIsPending(true);
        await upsert(finalData);
        dispatch({
          type: 'upsertResource',
          payload: finalData,
        });
      } catch {
        setError('Something wrong');
      } finally {
        setIsPending(false);
      }
    },
    [dispatch, initialResource, type]
  );

  return {
    error,
    isPending,
    upsertResource,
  };
}
