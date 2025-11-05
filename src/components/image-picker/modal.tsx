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
    <div className="ctz-fixed ctz-inset-0 ctz-bg-black/50 ctz-flex ctz-justify-center ctz-items-center">
      <div
        className="ctz-absolute ctz-inset-0"
        role="button"
        tabIndex={-100}
        onClick={onClose}
        onKeyDown={() => {}}
      ></div>
      <div className="ctz-bg-white ctz-p-10 ctz-rounded-md ctz-max-w-4xl ctz-mx-auto ctz-space-y-5 ctz-w-full ctz-absolute ctz-inset-0 ctz-max-h-min ctz-self-center">
        <div className="ctz-flex ctz-justify-between ctz-items-center">
          <h2 className="ctz-text-lg ctz-font-semibold">Select Image</h2>

          <Tabs activeTab={activeTab} labels={availableTabs} onSelectTab={setActiveTab} />

          <button onClick={onClose} className="ctz-text-red-500">
            Close
          </button>
        </div>
        {activeTab === "Upload" ? (
          assetSource?.uploadAsset ? (
            <Uploader onUploaded={fetchImages} uploadAsset={assetSource.uploadAsset} />
          ) : (
            <p className="ctz-text-sm ctz-text-gray-500">
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
