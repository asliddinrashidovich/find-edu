import { useRef, useState } from "react";
import { FaRegImage } from "react-icons/fa";

interface ImageUploadProps {
  onFileSelect: (file: File | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onFileSelect }) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      onFileSelect(selectedFile);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreviewUrl(null);
    onFileSelect(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const validateFile = (file: File) => {
    const allowedTypes = ["image/png", "image/jpeg"];
    const maxSize = 5 * 1024 * 1024; // 5MB
    return allowedTypes.includes(file.type) && file.size <= maxSize;
  };

  const formatSize = (size: number) => {
    return size < 1024
      ? `${size} B`
      : size < 1024 * 1024
      ? `${(size / 1024).toFixed(1)} KB`
      : `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-2">
      {file && previewUrl ? (
        <div className="flex items-start gap-4">
          <div className="relative w-20 h-20">
            <img
              src={previewUrl}
              alt="preview"
              className="w-full h-full object-cover rounded-lg"
            />
            <button
              onClick={handleRemove}
              className="absolute w-[30px] h-[30px] -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              title="Remove"
            >✕</button>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">{file.name}</p>
            <p className="text-sm text-gray-500">{formatSize(file.size)}</p>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-red-300 bg-red-50 rounded-xl p-6 text-center cursor-pointer hover:bg-red-100 transition"
        >
          <input
            type="file"
            accept="image/png, image/jpeg"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="flex flex-col items-center gap-2">
            <FaRegImage  className="text-[30px] text-gray-500"/>
            <p className="font-medium text-gray-700">Yuklash uchun bosing yoki faylni sudrab keling</p>
            <p className="text-sm text-gray-500">PNG, JPG — 5MB gacha</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
