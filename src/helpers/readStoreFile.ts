import type { Resource, ResourceType } from '@/definitions/types';
import { isJsonArray, isJsonRecord } from '@/packages/ts-lib';
import type { JsonValue } from '@/packages/ts-lib/types';

export async function readStoreFile(
  file: File
): Promise<{ resources: Resource[] }> {
  const text = await file.text();
  let parsed: unknown;

  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error('Invalid JSON file.');
  }

  if (!isJsonRecord(parsed)) {
    throw new Error('Invalid JSON file.');
  }

  return {
    resources: parseResources(parsed['resources']),
  };
}

function parseResources(data: JsonValue): Resource[] {
  if (!isJsonArray(data)) {
    throw new Error('Invalid resources data.');
  }

  return data.map((e) => {
    if (!isJsonRecord(e)) {
      throw new Error('Invalid resources data.');
    }

    return {
      id: e.id as string,
      type: e.type as ResourceType,
      name: e.name as string,
      url: e.url as string,
      description: e.description as string,
      requiresAuth: e.requiresAuth as boolean,
      createdAt: toDate(e.createdAt),
      updatedAt: toDate(e.updatedAt),
    };
  });
}

function toDate(value: JsonValue): Date {
  if (typeof value !== 'string') {
    throw new Error(`Invalid date input.`);
  }

  const d = new Date(value);
  if (Number.isNaN(d.getTime())) {
    throw new Error(`Invalid date input.`);
  }
  return d;
}
