import { VideoIcon } from "lucide-react";

export default function Grid({
  images,
  isVideo,
  onImageSelected,
}: {
  isVideo?: boolean;
  images: { thumb: string; full: string; url?: string }[];
  onImageSelected: (url: string) => void;
}) {
  return (
    <div className="grid grid-cols-5 gap-4 mt-5 max-h-60 overflow-y-auto">
      {images.map((_, i) => (
        <div key={i} className="relative">
          <button
            onClick={() => onImageSelected(_.full)}
            className="w-32 h-32 bg-gray-100 rounded-md overflow-hidden flex justify-center items-center"
          >
            <img
              src={_.thumb}
              alt="Search"
              className="object-cover w-full h-full"
            />
          </button>
          {isVideo && (
            <a
              href={_.url || "#"}
              target="_blank"
              rel="noreferrer"
              className="p-1 inline-block"
            >
              <span className="inline-flex items-center space-x-2">
                <VideoIcon className="w-5 h-5" />
                <span>Preview</span>
              </span>
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
