import React, { useRef, useState } from 'react';
import { UploadCloud, File, X, CheckCircle2, AlertCircle, Camera } from 'lucide-react';
import Button from './Button';
import Progress from './Progress';

export interface FileUploadProps {
  label?: string;
  helperText?: string;
  accept?: string;
  maxSizeBytes?: number; // e.g. 5 * 1024 * 1024 (5MB)
  selectedFile?: File | null;
  onFileSelect?: (file: File | null) => void;
  uploadProgress?: number; // 0 to 100, or undefined if not uploading
  isUploading?: boolean;
  errorMessage?: string;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label = 'Upload Crop Photo',
  helperText = 'Supported formats: JPG, PNG, WEBP up to 10MB',
  accept = 'image/jpeg,image/png,image/webp',
  maxSizeBytes = 10 * 1024 * 1024,
  selectedFile,
  onFileSelect,
  uploadProgress,
  isUploading = false,
  errorMessage,
  className = '',
}) => {
  const [internalFile, setInternalFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const activeFile = selectedFile !== undefined ? selectedFile : internalFile;

  const validateAndSetFile = (file: File) => {
    setValidationError(null);

    if (maxSizeBytes && file.size > maxSizeBytes) {
      const maxMb = Math.round(maxSizeBytes / (1024 * 1024));
      setValidationError(`File exceeds maximum allowed size of ${maxMb}MB.`);
      return;
    }

    if (accept) {
      const acceptedTypes = accept.split(',').map((t) => t.trim().toLowerCase());
      const fileType = file.type.toLowerCase();
      const fileExt = `.${file.name.split('.').pop()?.toLowerCase()}`;

      const isAccepted = acceptedTypes.some(
        (type) => type === fileType || type === fileExt || (type.endsWith('/*') && fileType.startsWith(type.replace('/*', '')))
      );

      if (!isAccepted) {
        setValidationError(`Invalid file type. Please select a valid crop image (${accept}).`);
        return;
      }
    }

    if (selectedFile === undefined) {
      setInternalFile(file);
    }
    if (onFileSelect) {
      onFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedFile === undefined) {
      setInternalFile(null);
    }
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    if (onFileSelect) {
      onFileSelect(null);
    }
  };

  const displayError = errorMessage || validationError;

  return (
    <div className={`w-full font-serif ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-text mb-1.5">
          {label}
        </label>
      )}

      {/* Hidden native input */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        className="sr-only"
        aria-label={label}
      />

      {!activeFile ? (
        /* Dropzone / Upload area */
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative p-6 sm:p-8 rounded-md border-2 border-dashed transition-all cursor-pointer text-center flex flex-col items-center justify-center select-none shadow-neo-sm hover:translate-x-[1px] hover:translate-y-[1px] ${
            dragOver
              ? 'border-[#172117] bg-primary-light'
              : displayError
              ? 'border-semantic-error bg-[#FFEBEE]'
              : 'border-[#172117] bg-white hover:bg-[#E8F5E9]'
          }`}
        >
          <div className="w-14 h-14 rounded-full bg-[#E8F5E9] text-primary border-2 border-[#172117] shadow-[2px_2px_0px_#172117] flex items-center justify-center mb-3">
            <UploadCloud className="w-7 h-7" aria-hidden="true" />
          </div>

          <div className="font-bold text-base text-dark-green mb-1 flex items-center justify-center gap-2">
            <span>Tap to select or take crop photo</span>
          </div>

          <p className="text-xs sm:text-sm text-text-muted mb-4 max-w-xs font-serif">
            {helperText}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Camera className="w-4 h-4" />}
              onClick={(e) => {
                e.stopPropagation();
                inputRef.current?.click();
              }}
            >
              Browse Files
            </Button>
          </div>
        </div>
      ) : (
        /* Selected file display */
        <div className="p-4 rounded-md border-2 border-[#172117] bg-white shadow-neo-sm">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-md bg-[#E8F5E9] text-primary border-2 border-[#172117] shadow-[1px_1px_0px_#172117] flex items-center justify-center shrink-0">
                <File className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-text truncate">
                  {activeFile.name}
                </p>
                <p className="text-xs text-text-muted">
                  {(activeFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => inputRef.current?.click()}
                disabled={isUploading}
              >
                Replace
              </Button>
              <button
                type="button"
                onClick={handleRemove}
                disabled={isUploading}
                aria-label="Remove file"
                className="p-1.5 rounded-medium text-text-muted hover:text-semantic-error hover:bg-[#FFEBEE] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-semantic-error min-w-[36px] min-h-[36px] flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Upload Progress */}
          {uploadProgress !== undefined && (
            <div className="mt-3 pt-3 border-t border-[#EAEFE9]">
              <Progress
                value={uploadProgress}
                showValue
                label={uploadProgress === 100 ? 'Upload complete' : 'Uploading image...'}
                size="sm"
              />
            </div>
          )}

          {!uploadProgress && (
            <div className="mt-2 text-xs text-primary flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Ready for AI diagnosis</span>
            </div>
          )}
        </div>
      )}

      {displayError && (
        <p className="text-xs sm:text-sm text-semantic-error mt-1.5 flex items-center gap-1 font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{displayError}</span>
        </p>
      )}
    </div>
  );
};

export default FileUpload;
