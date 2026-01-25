import type { Resource } from '@/definitions/types';
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
    const type = e.type as string;

    const common = {
      id: e.id as string,
      name: e.name as string,
      description: e.description as string,
      requiresAuth: e.requiresAuth as boolean,
      createdAt: toDate(e.createdAt),
      updatedAt: toDate(e.updatedAt),
    };
    if (type === 'file') {
      return { ...common, type, url: e.url as string };
    } else if (type === 'collection') {
      return {
        ...common,
        type,
        baseUrl: e.baseUrl as string,
        entryFile: e.entryFile as string,
      };
    }
    throw new Error(`Unknown resource type: ${type}`);
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
