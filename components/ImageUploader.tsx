'use client';

import { useCallback, useState, useEffect } from 'react';
import { useDropzone, FileRejection, DropzoneOptions } from 'react-dropzone';
import { XCircleIcon, PhotoIcon } from '@heroicons/react/24/solid';

interface ImageUploaderProps {
  onFilesChange: (files: File[]) => void;
  initialImageUrls?: string[];
}

interface FilePreview extends File {
  preview: string;
}

export default function ImageUploader({ onFilesChange, initialImageUrls = [] }: ImageUploaderProps) {
  const [files, setFiles] = useState<FilePreview[]>([]);
  const [rejected, setRejected] = useState<FileRejection[]>([]);

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    const newFiles = acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
    
    setFiles(prevFiles => {
      const updatedFiles = [...prevFiles, ...newFiles];
      onFilesChange(updatedFiles);
      return updatedFiles;
    });

    if (fileRejections.length) {
      setRejected(previousRejections => [...previousRejections, ...fileRejections]);
    }
  }, [onFilesChange]);

  useEffect(() => {
    // Liberar memoria de los object URLs cuando el componente se desmonte
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  const removeFile = (name: string) => {
    setFiles(prevFiles => {
      const updatedFiles = prevFiles.filter(file => file.name !== name);
      onFilesChange(updatedFiles);
      return updatedFiles;
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.gif', '.webp'], 'video/*': ['.mp4', '.mov'] },
    maxSize: 10 * 1024 * 1024, // 10MB por archivo
  } as DropzoneOptions);

  return (
    <div className="space-y-4">
      <div 
        {...getRootProps()} 
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 cursor-pointer 
                    ${isDragActive ? 'border-orange-500 bg-orange-900/10' : 'border-slate-600 hover:border-orange-600'}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center text-slate-400">
          <PhotoIcon className="w-12 h-12 mb-3" />
          {isDragActive ? (
            <p className="text-lg font-semibold">Suelta los archivos aquí...</p>
          ) : (
            <>
              <p className="text-lg font-semibold">Arrastra archivos o haz clic para seleccionar</p>
              <p className="text-sm mt-1">Soporta imágenes y videos (máx. 10MB por archivo)</p>
            </>
          )}
        </div>
      </div>

      {/* Vistas Previas */}
      {(files.length > 0 || initialImageUrls.length > 0) && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {/* Muestra las imágenes ya existentes si estamos en modo edición */}
          {initialImageUrls.map((url, index) => (
            <div key={`initial-${index}`} className="relative aspect-square border border-slate-700 rounded-lg overflow-hidden">
              <img src={url} alt="Imagen existente" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                 <p className="text-white text-xs text-center p-1">Imagen actual (se reemplazará)</p>
              </div>
            </div>
          ))}

          {/* Muestra las nuevas imágenes seleccionadas */}
          {files.map(file => (
            <div key={file.name} className="relative aspect-square border border-slate-700 rounded-lg overflow-hidden group">
              <img src={file.preview} alt={file.name} className="w-full h-full object-cover" onLoad={() => URL.revokeObjectURL(file.preview)} />
              <button
                type="button"
                onClick={() => removeFile(file.name)}
                className="absolute top-1 right-1 bg-red-600/80 hover:bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <XCircleIcon className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Errores de archivos rechazados */}
      {rejected.length > 0 && (
        <div className="mt-4 text-sm text-red-500">
          <p>Algunos archivos fueron rechazados:</p>
          <ul className="list-disc pl-5">
            {rejected.map(({ file, errors }) => (
              <li key={file.name}>
                {file.name} - {errors.map(e => e.message).join(', ')}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
