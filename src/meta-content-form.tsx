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
        (document.querySelector('meta[name="description"]') as HTMLMetaElement | null)?.content || "",
      keywords:
        (document.querySelector('meta[name="keywords"]') as HTMLMetaElement | null)?.content || "",
      canonicalUrl:
        (document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null)?.href ||
        window.location.href,
      robots:
        (document.querySelector('meta[name="robots"]') as HTMLMetaElement | null)?.content ||
        "index, follow",
      "og:title":
        (document.querySelector('meta[property="og:title"]') as HTMLMetaElement | null)?.content || "",
      "og:description":
        (document.querySelector('meta[property="og:description"]') as HTMLMetaElement | null)?.content || "",
      "og:image":
        (document.querySelector('meta[property="og:image"]') as HTMLMetaElement | null)?.content || "",
      "og:url":
        (document.querySelector('meta[property="og:url"]') as HTMLMetaElement | null)?.content ||
        window.location.href,
      "og:type":
        (document.querySelector('meta[property="og:type"]') as HTMLMetaElement | null)?.content ||
        "website",
      "og:site_name":
        (document.querySelector('meta[property="og:site_name"]') as HTMLMetaElement | null)?.content || "",
      "twitter:card":
        (document.querySelector('meta[name="twitter:card"]') as HTMLMetaElement | null)?.content ||
        "summary_large_image",
      "twitter:title":
        (document.querySelector('meta[name="twitter:title"]') as HTMLMetaElement | null)?.content || "",
      "twitter:description":
        (document.querySelector('meta[name="twitter:description"]') as HTMLMetaElement | null)?.content || "",
      "twitter:image":
        (document.querySelector('meta[name="twitter:image"]') as HTMLMetaElement | null)?.content || "",
      themeColor:
        (document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null)?.content ||
        "#ffffff",
    },
  });

  // Handle form submit - save into special key __seo inside pageData
  const onSubmit = (data: MetaContentFormData) => {
    pageData.__seo = (data as unknown) as Record<string, string>;
    setPageData(structuredClone(pageData));
    onClose();
  };

  return (
    <div>
      {/* Header */}
      <div className="p-5 bg-gray-100 flex justify-between items-center sticky top-0">
        <h1 className="font-semibold">SEO &amp; Metadata Settings</h1>
        <button type="button" onClick={onClose} className="md:hidden">
          <XIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* ===========================
            BASIC SEO FIELDS
        ============================ */}
        <section className="space-y-3 p-5">
          <h2 className="font-semibold text-lg mb-3">Basic Metadata</h2>
          <div className="space-y-2">
            <label htmlFor="title" className="font-medium">
              Title
            </label>
            <input
              id="title"
              {...register("title")}
              type="text"
              className="p-3 w-full border rounded focus:outline-none"
            />
          </div>

          <div className="space-y-2 mt-3">
            <label htmlFor="description" className="font-medium">
              Description
            </label>
            <textarea
              id="description"
              {...register("description")}
              className="p-3 w-full border rounded focus:outline-none"
            ></textarea>
          </div>

          <div className="space-y-2 mt-3">
            <label htmlFor="keywords" className="font-medium">
              Keywords
            </label>
            <textarea
              id="keywords"
              {...register("keywords")}
              className="p-3 w-full border rounded focus:outline-none"
            ></textarea>
          </div>

          <div className="space-y-2 mt-3">
            <label htmlFor="canonicalUrl" className="font-medium">
              Canonical URL
            </label>
            <input
              id="canonicalUrl"
              {...register("canonicalUrl")}
              type="text"
              className="p-3 w-full border rounded focus:outline-none"
            />
          </div>

          <div className="space-y-2 mt-3">
            <label htmlFor="robots" className="font-medium">
              Robots
            </label>
            <select
              id="robots"
              {...register("robots")}
              className="p-3 w-full border rounded focus:outline-none"
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
        <section className="space-y-3 p-5">
          <h2 className="font-semibold text-lg mt-8 mb-3">
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
            <div className="space-y-2" key={id}>
              <label htmlFor={id} className="font-medium">
                {label}
              </label>
              <input
                id={id}
                {...register(id as keyof MetaContentFormData)}
                type="text"
                className="p-3 w-full border rounded focus:outline-none"
              />
            </div>
          ))}
        </section>

        {/* ===========================
            TWITTER CARD
        ============================ */}
        <section className="space-y-3 p-5">
          <h2 className="font-semibold text-lg mt-8 mb-3">
            Twitter Card Metadata
          </h2>

          <div className="space-y-2">
            <label htmlFor="twitter:card" className="font-medium">
              Card Type
            </label>
            <select
              id="twitter:card"
              {...register("twitter:card")}
              className="p-3 w-full border rounded focus:outline-none"
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
            <div className="space-y-2" key={id}>
              <label htmlFor={id} className="font-medium">
                {label}
              </label>
              <input
                id={id}
                {...register(id as keyof MetaContentFormData)}
                type="text"
                className="p-3 w-full border rounded focus:outline-none"
              />
            </div>
          ))}
        </section>

        {/* ===========================
            ADVANCED OPTIONS
        ============================ */}
        <section className="space-y-3 p-5">
          <h2 className="font-semibold text-lg mt-8 mb-3">Advanced Options</h2>
          <div className="space-y-2">
            <label htmlFor="themeColor" className="font-medium">
              Theme Color
            </label>
            <input
              id="themeColor"
              {...register("themeColor")}
              type="color"
              className="h-10 w-16 border rounded cursor-pointer"
            />
          </div>
        </section>

        <section className="mt-10 space-y-3 p-5">
          <h2 className="font-semibold text-lg mb-3">Google Search Preview</h2>
          <div className="rounded-md p-4 bg-white border border-gray-100">
            <p className="text-[#202124] text-lg font-medium leading-snug">
              {watch("title") || "Example Page Title - KBK Tech"}
            </p>
            <p className="text-[#202124] text-sm text-green-700">
              {watch("canonicalUrl") || "https://kbk-tech.com/example-page"}
            </p>
            <p className="text-[#4d5156] text-sm mt-1">
              {watch("description") ||
                "This is a short description that might appear in Google search results."}
            </p>
          </div>
        </section>

        {/* ===========================
            SUBMIT BUTTON
        ============================ */}
        <div className="sticky bottom-0 p-5 bg-gray-50 border-t border-gray-200">
          <button
            type="submit"
            className="btn w-full block p-3 rounded-full"
          >
            Save SEO Settings
          </button>
        </div>
      </form>
    </div>
  );
}
