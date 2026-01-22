import React from 'react';

type Props = {
  onFiles: (files: FileList) => void;
  accept?: string;
  multiple?: boolean;
  label?: string;
  helperText?: string;
};

export function DropFileBox({
  onFiles,
  accept = 'application/json',
  multiple = false,
  label = 'Drag & drop a file here',
  helperText = 'or click to choose',
}: Props) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = React.useState(false);

  const pick = () => inputRef.current?.click();

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) {
      return;
    }
    onFiles(files);
  };

  const onDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const onDragOver: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const onDragLeave: React.DragEventHandler<HTMLDivElement> = () => {
    setIsDragOver(false);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={pick}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ' ? pick() : null)}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      className={[
        'cursor-pointer rounded-xl border-2 border-dashed p-6 select-none',
        'transition',
        isDragOver
          ? 'border-slate-900 bg-slate-50'
          : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50/50',
        'focus:ring-2 focus:ring-slate-400 focus:outline-none',
      ].join(' ')}
      aria-label="Upload file"
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <div className="text-sm font-semibold text-slate-900">{label}</div>
      <div className="mt-1 text-xs text-slate-600">{helperText}</div>
      <div className="mt-3 text-xs text-slate-500">
        Accepted: {accept || 'any'}
      </div>
    </div>
  );
}
