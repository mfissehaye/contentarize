import Uploader from "./uploader";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import SearchImageAndVideo from "./search-unsplash";
import Tabs from "./tabs";
import Grid from "./grid";
import { CMSContext } from "../../cms-provider";
import type { AssetDescriptor } from "../../types";

export default function Modal({
  isVideo,
  onClose,
  onImageSelected,
}: {
  isVideo?: boolean;
  onClose: () => void;
  onImageSelected: (url: string) => void;
}) {
  const { assetSource } = useContext(CMSContext);
  const [images, setImages] = useState<{ thumb: string; full: string }[]>([]);
  const [activeTab, setActiveTab] = useState<"Public" | "Upload">("Public");

  const availableTabs = useMemo(() => {
    return assetSource?.uploadAsset ? (["Public", "Upload"] as ("Public" | "Upload")[]) : ([
        "Public",
      ] as ("Public" | "Upload")[]);
  }, [assetSource]);

  // useEffect(() => {
  //   const result = import.meta.glob("/public/*");
  //   setImages(
  //     Object.keys(result).map((key) => {
  //       const path = key.replace(/\/public/, "");
  //       return { thumb: path, full: path };
  //     })
  //   );
  // }, []);

  const fetchImages = useCallback(
    async (payload?: AssetDescriptor) => {
      if (payload) {
        setImages((current) => [
          ...current,
          { thumb: payload.thumbUrl ?? payload.url, full: payload.url },
        ]);
        return;
      }

      if (!assetSource) {
        setImages([]);
        return;
      }

      const uploads = await assetSource.listAssets();
      setImages(
        uploads.map((upload) => ({
          thumb: upload.thumbUrl ?? upload.url,
          full: upload.url,
        }))
      );
    },
    [assetSource]
  );

  useEffect(() => {
    if (assetSource) {
      fetchImages();
    }
  }, [assetSource, fetchImages]);

  useEffect(() => {
    if (!assetSource && activeTab === "Upload") {
      setActiveTab("Public");
    }
  }, [assetSource, activeTab]);

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div
        className="absolute inset-0"
        role="button"
        tabIndex={-100}
        onClick={onClose}
        onKeyDown={() => {}}
      ></div>
      <div className="bg-white p-10 rounded-md max-w-4xl mx-auto space-y-5 w-full absolute inset-0 max-h-min self-center">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Select Image</h2>

          <Tabs activeTab={activeTab} labels={availableTabs} onSelectTab={setActiveTab} />

          <button onClick={onClose} className="text-red-500">
            Close
          </button>
        </div>
        {activeTab === "Upload" ? (
          assetSource?.uploadAsset ? (
            <Uploader onUploaded={fetchImages} uploadAsset={assetSource.uploadAsset} />
          ) : (
            <p className="text-sm text-gray-500">
              Uploading is disabled. Provide an assetSource.uploadAsset implementation to enable uploads.
            </p>
          )
        ) : (
          <>
            <SearchImageAndVideo
              isVideo={isVideo}
              onImagesFetched={setImages}
            />
            <Grid
              isVideo={isVideo}
              images={images}
              onImageSelected={(_) => {
                onImageSelected(_);
                onClose();
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
