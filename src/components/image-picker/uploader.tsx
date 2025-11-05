import { UploadCloudIcon } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import type { AssetDescriptor } from "../../types";

export default function Uploader({
  onUploaded,
  uploadAsset,
}: {
  onUploaded: (payload: AssetDescriptor) => void;
  uploadAsset: (file: File) => Promise<AssetDescriptor>;
}) {
  const [stagedImages, setStagedImages] = useState<File[]>([]);
  const imagePickerRef = useRef<HTMLInputElement | null>(null);
  // TODO: move this out of the cms folder
  const upload = async (image: File) => {
    try {
      const asset = await uploadAsset(image);
      onUploaded(asset);
      toast.success("Asset uploaded");
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload asset");
    }
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-5 gap-10">
        {stagedImages.map((_, i) => (
          <div key={`staged-image-${i}`} className="space-y-3">
            <div className="w-32 h-32 rounded bg-gray-100 overflow-hidden">
              <img
                src={URL.createObjectURL(_)}
                alt="Staged"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              type="button"
              className="btn block w-full p-2.5 rounded-md bg-black text-white uppercase tracking-wide text-sm"
              onClick={() => upload(_)}
            >
              Upload
            </button>
          </div>
        ))}
      </div>
      <div className="p-10 rounded border border-dashed flex flex-col justify-center items-center space-y-1 bg-gray-50">
        <input
          type="file"
          className="hidden"
          multiple
          ref={imagePickerRef}
          onChange={(e) => {
            if (e.target.files) {
              setStagedImages((images) => [...images, ...e.target.files!]);
            }
          }}
        />
        <button
          type="button"
          onClick={() => imagePickerRef.current?.click()}
          className="inline-flex flex-col items-center"
        >
          <UploadCloudIcon className="w-10 h-10" />
          <span>Upload File</span>
        </button>
      </div>
    </div>
  );
}
