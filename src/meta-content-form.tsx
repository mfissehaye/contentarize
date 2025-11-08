import { XIcon } from "lucide-react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { CMSContext } from "./cms-provider";

interface MetaContentFormData {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  robots: string;
  "og:title": string;
  "og:description": string;
  "og:image": string;
  "og:url": string;
  "og:type": string;
  "og:site_name": string;
  "twitter:card": string;
  "twitter:title": string;
  "twitter:description": string;
  "twitter:image": string;
  themeColor: string;
}

export default function SeoSettingsForm({ onClose }: { onClose: () => void }) {
  const { pageData, setPageData } = useContext(CMSContext);
  // Initialize form and default values by reading from <meta> tags when possible
  const { register, handleSubmit, watch } = useForm<MetaContentFormData>({
    mode: "onChange",
    defaultValues: {
      title: document.title || "",
      description:
        (
          document.querySelector(
            'meta[name="description"]'
          ) as HTMLMetaElement | null
        )?.content || "",
      keywords:
        (
          document.querySelector(
            'meta[name="keywords"]'
          ) as HTMLMetaElement | null
        )?.content || "",
      canonicalUrl:
        (
          document.querySelector(
            'link[rel="canonical"]'
          ) as HTMLLinkElement | null
        )?.href || window.location.href,
      robots:
        (
          document.querySelector(
            'meta[name="robots"]'
          ) as HTMLMetaElement | null
        )?.content || "index, follow",
      "og:title":
        (
          document.querySelector(
            'meta[property="og:title"]'
          ) as HTMLMetaElement | null
        )?.content || "",
      "og:description":
        (
          document.querySelector(
            'meta[property="og:description"]'
          ) as HTMLMetaElement | null
        )?.content || "",
      "og:image":
        (
          document.querySelector(
            'meta[property="og:image"]'
          ) as HTMLMetaElement | null
        )?.content || "",
      "og:url":
        (
          document.querySelector(
            'meta[property="og:url"]'
          ) as HTMLMetaElement | null
        )?.content || window.location.href,
      "og:type":
        (
          document.querySelector(
            'meta[property="og:type"]'
          ) as HTMLMetaElement | null
        )?.content || "website",
      "og:site_name":
        (
          document.querySelector(
            'meta[property="og:site_name"]'
          ) as HTMLMetaElement | null
        )?.content || "",
      "twitter:card":
        (
          document.querySelector(
            'meta[name="twitter:card"]'
          ) as HTMLMetaElement | null
        )?.content || "summary_large_image",
      "twitter:title":
        (
          document.querySelector(
            'meta[name="twitter:title"]'
          ) as HTMLMetaElement | null
        )?.content || "",
      "twitter:description":
        (
          document.querySelector(
            'meta[name="twitter:description"]'
          ) as HTMLMetaElement | null
        )?.content || "",
      "twitter:image":
        (
          document.querySelector(
            'meta[name="twitter:image"]'
          ) as HTMLMetaElement | null
        )?.content || "",
      themeColor:
        (
          document.querySelector(
            'meta[name="theme-color"]'
          ) as HTMLMetaElement | null
        )?.content || "#ffffff",
    },
  });

  // Handle form submit - save into special key __seo inside pageData
  const onSubmit = (data: MetaContentFormData) => {
    pageData.__seo = data as unknown as Record<string, string>;
    setPageData(structuredClone(pageData));
    onClose();
  };

  return (
    <div>
      {/* Header */}
      <div className="ctz:p-5 ctz:bg-gray-100 ctz:flex ctz:justify-between ctz:items-center ctz:sticky ctz:top-0">
        <h1 className="ctz:font-semibold">SEO &amp; Metadata Settings</h1>
        <button type="button" onClick={onClose} className="ctz:md:hidden">
          <XIcon className="ctz:w-5 ctz:h-5" />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="ctz:space-y-6">
        {/* ===========================
            BASIC SEO FIELDS
        ============================ */}
        <section className="ctz:space-y-3 ctz:p-5">
          <h2 className="ctz:font-semibold ctz:text-lg ctz:mb-3">
            Basic Metadata
          </h2>
          <div className="ctz:space-y-2">
            <label htmlFor="title" className="ctz:font-medium">
              Title
            </label>
            <input
              id="title"
              {...register("title")}
              type="text"
              className="ctz:p-3 ctz:w-full ctz:border ctz:border-gray-300/50 ctz:rounded ctz:focus:outline-none"
            />
          </div>

          <div className="ctz:space-y-2 ctz:mt-3">
            <label htmlFor="description" className="ctz:font-medium">
              Description
            </label>
            <textarea
              id="description"
              {...register("description")}
              className="ctz:p-3 ctz:w-full ctz:border ctz:border-gray-300/50 ctz:rounded ctz:focus:outline-none"
            ></textarea>
          </div>

          <div className="ctz:space-y-2 ctz:mt-3">
            <label htmlFor="keywords" className="ctz:font-medium">
              Keywords
            </label>
            <textarea
              id="keywords"
              {...register("keywords")}
              className="ctz:p-3 ctz:w-full ctz:border ctz:border-gray-300/50 ctz:rounded ctz:focus:outline-none"
            ></textarea>
          </div>

          <div className="ctz:space-y-2 ctz:mt-3">
            <label htmlFor="canonicalUrl" className="ctz:font-medium">
              Canonical URL
            </label>
            <input
              id="canonicalUrl"
              {...register("canonicalUrl")}
              type="text"
              className="ctz:p-3 ctz:w-full ctz:border ctz:border-gray-300/50 ctz:rounded ctz:focus:outline-none"
            />
          </div>

          <div className="ctz:space-y-2 ctz:mt-3">
            <label htmlFor="robots" className="ctz:font-medium">
              Robots
            </label>
            <select
              id="robots"
              {...register("robots")}
              className="ctz:p-3 ctz:w-full ctz:border ctz:border-gray-300/50 ctz:rounded ctz:focus:outline-none"
            >
              <option value="index, follow">index, follow</option>
              <option value="noindex, follow">noindex, follow</option>
              <option value="index, nofollow">index, nofollow</option>
              <option value="noindex, nofollow">noindex, nofollow</option>
            </select>
          </div>
        </section>

        {/* ===========================
            OPEN GRAPH
        ============================ */}
        <section className="ctz:space-y-3 ctz:p-5">
          <h2 className="ctz:font-semibold ctz:text-lg ctz:mt-8 ctz:mb-3">
            Open Graph (Facebook, LinkedIn)
          </h2>

          {[
            ["og:title", "OG Title"],
            ["og:description", "OG Description"],
            ["og:image", "OG Image URL"],
            ["og:url", "OG URL"],
            ["og:type", "OG Type"],
            ["og:site_name", "OG Site Name"],
          ].map(([id, label]) => (
            <div className="ctz:space-y-2" key={id}>
              <label htmlFor={id} className="ctz:font-medium">
                {label}
              </label>
              <input
                id={id}
                {...register(id as keyof MetaContentFormData)}
                type="text"
                className="ctz:p-3 ctz:w-full ctz:border ctz:border-gray-300/50 ctz:rounded ctz:focus:outline-none"
              />
            </div>
          ))}
        </section>

        {/* ===========================
            TWITTER CARD
        ============================ */}
        <section className="ctz:space-y-3 ctz:p-5">
          <h2 className="ctz:font-semibold ctz:text-lg ctz:mt-8 ctz:mb-3">
            Twitter Card Metadata
          </h2>

          <div className="ctz:space-y-2">
            <label htmlFor="twitter:card" className="ctz:font-medium">
              Card Type
            </label>
            <select
              id="twitter:card"
              {...register("twitter:card")}
              className="ctz:p-3 ctz:w-full ctz:border ctz:border-gray-300/50 ctz:rounded ctz:focus:outline-none"
            >
              <option value="summary">summary</option>
              <option value="summary_large_image">summary_large_image</option>
            </select>
          </div>

          {[
            ["twitter:title", "Twitter Title"],
            ["twitter:description", "Twitter Description"],
            ["twitter:image", "Twitter Image URL"],
          ].map(([id, label]) => (
            <div className="ctz:space-y-2" key={id}>
              <label htmlFor={id} className="ctz:font-medium">
                {label}
              </label>
              <input
                id={id}
                {...register(id as keyof MetaContentFormData)}
                type="text"
                className="ctz:p-3 ctz:w-full ctz:border ctz:border-gray-300/50 ctz:rounded ctz:focus:outline-none"
              />
            </div>
          ))}
        </section>

        {/* ===========================
            ADVANCED OPTIONS
        ============================ */}
        <section className="ctz:space-y-3 ctz:p-5">
          <h2 className="ctz:font-semibold ctz:text-lg ctz:mt-8 ctz:mb-3">
            Advanced Options
          </h2>
          <div className="ctz:space-y-2">
            <label htmlFor="themeColor" className="ctz:font-medium">
              Theme Color
            </label>
            <input
              id="themeColor"
              {...register("themeColor")}
              type="color"
              className="ctz:h-10 ctz:w-16 ctz:border ctz:border-gray-300/50 ctz:rounded ctz:cursor-pointer"
            />
          </div>
        </section>

        <section className="ctz:mt-10 ctz:space-y-3 ctz:p-5">
          <h2 className="ctz:font-semibold ctz:text-lg ctz:mb-3">
            Google Search Preview
          </h2>
          <div className="ctz:rounded-md ctz:p-4 ctz:bg-white ctz:border ctz:border-gray-300/50 ">
            <p className="ctz:text-[#202124] ctz:text-lg ctz:font-medium ctz:leading-snug">
              {watch("title") || "Example Page Title - KBK Tech"}
            </p>
            <p className="ctz:text-[#202124] ctz:text-sm ctz:text-green-700">
              {watch("canonicalUrl") || "https://kbk-tech.com/example-page"}
            </p>
            <p className="ctz:text-[#4d5156] ctz:text-sm ctz:mt-1">
              {watch("description") ||
                "This is a short description that might appear in Google search results."}
            </p>
          </div>
        </section>

        {/* ===========================
            SUBMIT BUTTON
        ============================ */}
        <div className="ctz:sticky ctz:bottom-0 ctz:p-5 ctz:bg-gray-50 ctz:border-t ctz:border-gray-200">
          <button
            type="submit"
            className="btn ctz:w-full ctz:block ctz:p-3 ctz:rounded-full"
          >
            Save SEO Settings
          </button>
        </div>
      </form>
    </div>
  );
}
