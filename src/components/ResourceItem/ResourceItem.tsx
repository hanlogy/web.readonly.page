import { BookTextIcon, FileIcon } from 'lucide-react';
import type { Resource } from '@/definitions/types';
import { Link } from '@/lib/router';
import { Actions } from './Actions';

export function ResourceItem({ resource }: { resource: Resource }) {
  const { name, url, type, description } = resource;
  const buildLink = (label: string) => (
    <Link to={{ pathname: type, hash: url }}>{label}</Link>
  );

  return (
    <div className="relative flex rounded-xl border border-gray-100 bg-gray-100 p-4 hover:border-gray-300">
      <div className="absolute top-3 right-3">
        <Actions resource={resource} />
      </div>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-200 sm:h-12 sm:w-12">
        {type === 'collection' ? (
          <BookTextIcon />
        ) : (
          <FileIcon className="h-5 sm:h-6" />
        )}
      </div>
      <div className="ml-3 flex min-w-0 flex-1 flex-col sm:ml-4">
        <div className="text-gray-800o mb-1 pr-10 text-lg leading-6 font-medium">
          {buildLink(name)}
        </div>
        <div className="overflow-hidden text-sm text-ellipsis whitespace-nowrap text-gray-500">
          {buildLink(url)}
        </div>
        <div className="mt-1 flex-1 leading-6 text-gray-400">{description}</div>
      </div>
    </div>
  );
}
