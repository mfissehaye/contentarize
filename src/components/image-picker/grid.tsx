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
    <div className="ctz:grid grid-cols-5 ctz:gap-4 mt-5 ctz:max-h-60 ctz:overflow-y-auto">
      {images.map((_, i) => (
        <div key={i} className="relative">
          <button
            onClick={() => onImageSelected(_.full)}
            className="ctz:w-32 h-32 ctz:bg-gray-100 ctz:rounded-md ctz:overflow-hidden flex ctz:justify-center items-center"
          >
            <img
              src={_.thumb}
              alt="Search"
              className="ctz:object-cover ctz:w-full h-full"
            />
          </button>
          {isVideo && (
            <a
              href={_.url || "#"}
              target="_blank"
              rel="noreferrer"
              className="ctz:p-1 ctz:inline-block"
            >
              <span className="ctz:inline-flex ctz:items-center ctz:space-x-2">
                <VideoIcon className="ctz:w-5 h-5" />
                <span>Preview</span>
              </span>
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
