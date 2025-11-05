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
    <div className="ctz:space-y-3">
      <div className="ctz:grid grid-cols-5 ctz:gap-10">
        {stagedImages.map((_, i) => (
          <div key={`staged-image-${i}`} className="space-y-3">
            <div className="ctz:w-32 h-32 rounded ctz:bg-gray-100 ctz:overflow-hidden">
              <img
                src={URL.createObjectURL(_)}
                alt="Staged"
                className="ctz:w-full h-full ctz:object-cover"
              />
            </div>
            <button
              type="button"
              className="btn ctz:block ctz:w-full ctz:p-2.5 ctz:rounded-md ctz:bg-black text-white uppercase ctz:tracking-wide text-sm"
              onClick={() => upload(_)}
            >
              Upload
            </button>
          </div>
        ))}
      </div>
      <div className="ctz:p-10 rounded border ctz:border-dashed ctz:flex flex-col ctz:justify-center items-center ctz:space-y-1 ctz:bg-gray-50">
        <input
          type="file"
          className="ctz:hidden"
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
          className="ctz:inline-flex flex-col ctz:items-center"
        >
          <UploadCloudIcon className="ctz:w-10 h-10" />
          <span>Upload File</span>
        </button>
      </div>
    </div>
  );
}
