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
      <div className="rounded border h-44 bg-gray-100 relative">
        {value &&
          (!isVideo ? (
            <img
              src={value}
              alt="Selected"
              className="object-cover w-full h-full"
            />
          ) : (
            <video
              autoPlay
              muted
              loop
              key={value}
              id="video-background"
              className="w-full h-full object-cover"
            >
              <source src={value} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ))}
        <div className="absolute inset-0 flex justify-center items-center">
          <button
            type="button"
            className="border rounded-md p-3 bg-gray-200 hover:bg-gray-300 transition-colors"
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
