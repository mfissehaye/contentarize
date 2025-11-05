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
    <div className="flex gap-x-3">
      <div className="relative grow">
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
          className="w-full p-3 border rounded-md focus:ring-0 focus:outline-none"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="absolute top-1/2 -translate-y-1/2 right-3 inline-block"
        >
          <SearchIcon />
        </button>
      </div>
      <div className="bg-primary/10 px-3 rounded flex items-center">
        <select
          {...register("source", { required: true })}
          className="bg-transparent border-none outline-none h-full"
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
