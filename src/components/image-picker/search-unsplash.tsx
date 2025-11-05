import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import SearchIcon from "./search-icon";

interface FormProps {
  search: string;
  source: string;
}

export default function SearchImageAndVideo({
  isVideo,
  onImagesFetched,
}: {
  isVideo?: boolean;
  onImagesFetched: (images: { thumb: string; full: string }[]) => void;
}) {
  const { register, watch } = useForm<FormProps>({
    mode: "onChange",
  });

  const source = watch("source");
  const onSubmit = useCallback(async () => {
    const search = watch("search");
    if (!search) return;
    const images = await fetch("/api/photos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ search, source, isVideo }),
    }).then((res) => res.json());

    onImagesFetched(images);
  }, [source, onImagesFetched, watch, isVideo]);

  useEffect(() => {
    if (source) onSubmit();
  }, [source, onSubmit]);

  return (
    <div className="ctz-flex ctz-gap-x-3">
      <div className="ctz-relative ctz-grow">
        <input
          type="text"
          {...register("search")}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onSubmit();
            }
          }}
          placeholder="Or search the web ..."
          className="ctz-w-full ctz-p-3 ctz-border ctz-rounded-md ctz-focus:ring-0 ctz-focus:outline-none"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="ctz-absolute ctz-top-1/2 ctz--translate-y-1/2 ctz-right-3 ctz-inline-block"
        >
          <SearchIcon />
        </button>
      </div>
      <div className="ctz-bg-primary/10 ctz-px-3 ctz-rounded ctz-flex ctz-items-center">
        <select
          {...register("source", { required: true })}
          className="ctz-bg-transparent ctz-border-none ctz-outline-none ctz-h-full"
        >
          {!isVideo && (
            <>
              <option value="unsplash">Unsplash</option>
              <option value="svgrepo">Svgrepo api</option>
            </>
          )}
          <option value="pexels">Pexels</option>
        </select>
      </div>
    </div>
  );
}
