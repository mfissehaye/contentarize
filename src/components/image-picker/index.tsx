import { useState } from "react";
import Modal from "./modal";
import SearchIcon from "./search-icon";

export default function ImagePicker({
  value,
  isVideo,
  onImageSelected,
}: {
  value: string;
  isVideo?: boolean;
  onImageSelected: (url: string) => void;
}) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <div className="ctz-rounded ctz-border ctz-h-44 ctz-bg-gray-100 ctz-relative">
        {value &&
          (!isVideo ? (
            <img
              src={value}
              alt="Selected"
              className="ctz-object-cover ctz-w-full ctz-h-full"
            />
          ) : (
            <video
              autoPlay
              muted
              loop
              key={value}
              id="video-background"
              className="ctz-w-full ctz-h-full ctz-object-cover"
            >
              <source src={value} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ))}
        <div className="ctz-absolute ctz-inset-0 ctz-flex ctz-justify-center ctz-items-center">
          <button
            type="button"
            className="ctz-border ctz-rounded-md ctz-p-3 ctz-bg-gray-200 ctz-hover:bg-gray-300 ctz-transition-colors"
            onClick={() => setShowModal(true)}
          >
            <SearchIcon />
          </button>
        </div>
      </div>

      {showModal && (
        <Modal
          isVideo={isVideo}
          onImageSelected={onImageSelected}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
