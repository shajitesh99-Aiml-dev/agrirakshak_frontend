import React, { useState } from 'react';
import { Camera, Trash2, ShieldCheck } from 'lucide-react';
import { UploadedImageItem } from '../types/caseFormTypes';
import { CASE_VALIDATION } from '../validation/caseValidation';
import FileUpload from '../../../components/ui/FileUpload';
import { useI18n } from '../../../i18n';

interface CropImageUploaderProps {
  images: UploadedImageItem[];
  onAddImage: (item: UploadedImageItem) => void;
  onRemoveImage: (id: string) => void;
  errorMessage?: string;
}

export const CropImageUploader: React.FC<CropImageUploaderProps> = ({
  images,
  onAddImage,
  onRemoveImage,
  errorMessage,
}) => {
  const [fileError, setFileError] = useState<string | null>(null);
  const { t } = useI18n();

  const handleFileSelect = (file: File | null) => {
    setFileError(null);
    if (!file) return;

    if (images.length >= CASE_VALIDATION.MAX_IMAGES) {
      setFileError(`You can attach up to ${CASE_VALIDATION.MAX_IMAGES} photos per report.`);
      return;
    }

    const validationErr = CASE_VALIDATION.validateFile(file);
    if (validationErr) {
      setFileError(validationErr);
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    const newItem: UploadedImageItem = {
      id: `img-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      file,
      previewUrl,
      name: file.name,
      size: file.size,
    };

    onAddImage(newItem);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between pb-2 border-b border-[#EAEFE9]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-medium bg-primary-light flex items-center justify-center text-primary">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif text-base sm:text-lg font-bold text-text-dark">
              {t('farmer.report.photosHeading')}
            </h3>
            <p className="font-serif text-xs text-text-muted">
              {t('farmer.report.photosDesc')}
            </p>
          </div>
        </div>
        <span className="text-xs font-semibold text-text-muted">
          {images.length} / {CASE_VALIDATION.MAX_IMAGES}
        </span>
      </div>

      {/* Helpful leaf photography tips */}
      <div className="bg-[#F8FAF7] rounded-medium p-4 border border-[#DFE8DF] space-y-2">
        <h4 className="text-xs font-bold text-dark-green uppercase tracking-wider">
          {t('farmer.report.uploadTipsTitle')}
        </h4>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-text-muted font-serif">
          <li className="flex items-start gap-1.5">
            <span className="font-bold text-primary">1.</span>
            <span>{t('farmer.report.tip1')}</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="font-bold text-primary">2.</span>
            <span>{t('farmer.report.tip2')}</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="font-bold text-primary">3.</span>
            <span>{t('farmer.report.tip3')}</span>
          </li>
        </ul>
      </div>

      {/* File Upload Zone */}
      {images.length < CASE_VALIDATION.MAX_IMAGES ? (
        <FileUpload
          label={t('farmer.report.photosHeading')}
          accept="image/jpeg,image/png,image/webp"
          onFileSelect={handleFileSelect}
          errorMessage={fileError || errorMessage}
          helperText="Attach 1 to 4 clear leaf or fruit photos (Max 10MB each)"
        />
      ) : (
        <div className="p-4 rounded-medium bg-primary-light/40 border border-primary/30 text-center font-serif text-xs text-dark-green">
          Maximum of {CASE_VALIDATION.MAX_IMAGES} photos attached. Remove an image to replace it.
        </div>
      )}

      {/* Uploaded Thumbnails Preview */}
      {images.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-text uppercase tracking-wider">
            {t('farmer.report.step3Title')} ({images.length})
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {images.map((item, index) => (
              <div
                key={item.id}
                className="relative group rounded-medium overflow-hidden border border-[#D5E2D5] bg-card shadow-soft aspect-square"
              >
                <img
                  src={item.previewUrl}
                  alt={`Crop thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => onRemoveImage(item.id)}
                      className="p-1 rounded-full bg-semantic-error text-white hover:scale-110 transition-transform"
                      aria-label={t('common.delete')}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-[10px] text-white truncate font-sans">
                    {formatFileSize(item.size)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DPDP Privacy Disclaimer */}
      <div className="flex items-start gap-2 text-[11px] text-text-muted font-serif pt-1">
        <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        <span>{t('farmer.report.photoPrivacyNotice')}</span>
      </div>
    </div>
  );
};

export default CropImageUploader;
