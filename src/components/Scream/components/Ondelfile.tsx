export interface FileHeaderProps {
  file: File;
  onDelete: (file: File) => void;
}

export function FileHeader({ file, onDelete }: FileHeaderProps) {
  return (
    <button onClick={() => onDelete(file)}>
      <i className="ti-close" />
    </button>
  );
}
