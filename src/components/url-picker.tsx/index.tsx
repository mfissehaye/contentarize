import classNames from "classnames";
import Checkbox from "../checkbox";
import { useContext, useEffect, useState } from "react";
import { useClickAway, useDebounce } from "@uidotdev/usehooks";
import { CMSContext } from "../../cms-provider";

export default function URLPickerRef({
  label,
  value,
  onSetURL,
  onChangeOpenInNewTab = () => {},
}: {
  label: string;
  value: string;
  onSetURL: (url: string) => void;
  onChangeOpenInNewTab: (openInNewTab: boolean) => void;
}) {
  const [openInNewTab, setOpenInNewTab] = useState(false);
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const debouncedSearchTerm = useDebounce(search, 500);
  const { pages, onPageSearch } = useContext(CMSContext);
  // const [pages, setPages] = useState<string[]>([]);
  const dropdownRef = useClickAway<HTMLDivElement>(() => {
    setShowDropdown(false);
  });

  useEffect(() => {
    if (value) setSearch(value);
  }, [value]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      onPageSearch?.(debouncedSearchTerm).then();
      // supabase
      //   .from("pages")
      //   .select("*")
      //   .ilike("path", `%${debouncedSearchTerm}%`)
      //   .then(({ data }) => {
      //     setPages(data || []);
      //   });
    }
  }, [debouncedSearchTerm, value]);

  useEffect(() => {
    onChangeOpenInNewTab(openInNewTab);
  }, [openInNewTab, onChangeOpenInNewTab]);

  return (
    <>
      <div className="relative">
        <input
          value={search}
          placeholder={label}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          // onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
          className="ctz:p-3 ctz:w-full border rounded ctz:focus:ring-0 focus:outline-none"
        />

        <div
          ref={dropdownRef}
          id="dropdownHover"
          className={classNames(
            "z-50 absolute inset-x-0 top-full bg-white divide-y divide-gray-100 rounded-lg shadow",
            {
              hidden: !showDropdown,
            }
          )} /* dark:bg-gray-700 */
        >
          <ul
            className="ctz:py-2 ctz:text-sm ctz:text-gray-700" /* dark:text-gray-200 */
            aria-labelledby="dropdownHoverButton"
          >
            {pages.map((page, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowDropdown(false);
                    setSearch(page.path);
                    onSetURL(page.path);
                  }}
                  className="ctz:block ctz:w-full text-start ctz:px-4 py-2 ctz:hover:bg-gray-100" /*  dark:hover:bg-gray-600 dark:hover:text-white */
                >
                  {page.title}
                </button>
              </li>
            ))}
            {debouncedSearchTerm && (
              <li>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowDropdown(false);
                    onSetURL(debouncedSearchTerm);
                  }}
                  className="ctz:block ctz:w-full text-start ctz:px-4 py-2 ctz:hover:bg-gray-100"
                >
                  Create {debouncedSearchTerm}
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>

      <Checkbox
        label="Open in new tab"
        checked={openInNewTab}
        onChange={(checked) => setOpenInNewTab(checked)}
      />
    </>
  );
}
