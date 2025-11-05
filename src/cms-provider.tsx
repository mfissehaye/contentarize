import classNames from "classnames";
import {
  Ellipsis,
  EyeOffIcon,
  LucideIcon,
  SearchCode,
  XIcon,
} from "lucide-react";
import { isEqual as _isEqual } from "lodash-es";
import ContentifyForm from "./contentify-form";
import { ContextType, Field, PageData, User, AssetSource } from "./types";
import {
  type ReactNode,
  createContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import SigninIcon from "./components/icons/signin-icon";
import toast, { Toaster } from "react-hot-toast";
import { BsLaptop, BsPhone, BsTablet } from "react-icons/bs";
import useLocalStorage from "./utils/use-local-storage";
import { IconType } from "react-icons/lib";
import MetaContentForm from "./meta-content-form";
import Modal from "./components/modal";
import { IframeWithStyles } from "./components/IframeWithStyles";
// CSS is imported in index.ts to ensure styles are bundled

export const CMSContext = createContext<ContextType>({
  editMode: false,
  editing: { id: null, inputs: [] },
  pageData: {} as PageData,
  setPageData: () => {},
  setEditing: () => {},
  hoveredId: null,
  setHoveredId: () => {},
  disabledItems: [],
  setDisabledItems: () => {},
  screenSize: "default",
  assetSource: undefined,
  pages: [],
  onPageSearch: () => Promise.resolve([]),
});

export type CMSProviderProps = {
  children?: ReactNode;
  user: User | null;
  initialPageData: PageData;
  onSignout: () => void;
  onSignin: () => void;
  onPublish: (pageData: PageData) => Promise<void>;
  assetSource?: AssetSource;
  pages: { id: string; path: string; title: string }[];
  onPageSearch?: (search: string) => Promise<{ path: string; title: string }[]>;
};

export function CMSProvider({
  children,
  user,
  initialPageData,
  pages,
  onSignout,
  onSignin,
  onPublish,
  assetSource,
  onPageSearch,
}: CMSProviderProps) {
  const [showMetaContentForm, setShowMetaContentForm] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [pageData, setPageData] = useState<PageData>({});
  const [screenSize, setScreenSize] = useLocalStorage<
    ContextType["screenSize"]
  >("screenSize", "default");
  const [editMode, setEditMode] = useLocalStorage("editMode", false);
  const [editing, setEditing] = useState<{
    id: string | null;
    inputs: Field[];
  }>({ id: null, inputs: [] });
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [disabledItems, setDisabledItems] = useLocalStorage<string[]>(
    "disabledItems",
    []
  );
  useEffect(() => {
    setPageData(structuredClone(initialPageData) || {});
  }, [initialPageData]);

  const isInEditMode = !!user && editMode;

  const touched = useMemo(
    () => !_isEqual(initialPageData, pageData),
    [pageData, initialPageData]
  );

  const ScreensizeButton = ({
    Icon,
    size,
  }: {
    Icon: LucideIcon | IconType;
    size: ContextType["screenSize"];
  }) => {
    return (
      <button
        className={classNames(
          "p-2 transition-colors w-10 h-10 rounded-full grid place-content-center",
          { "bg-gray-500 text-white": size === screenSize }
        )}
        onClick={() => setScreenSize(size)}
      >
        <Icon className="ctz:w-5 h-5" />
      </button>
    );
  };

  // if (_isEmpty(pageData)) return <></>;

  return (
    <CMSContext.Provider
      value={{
        editMode: isInEditMode,
        editing,
        setEditing,
        pageData,
        setPageData,
        hoveredId,
        setHoveredId,
        disabledItems,
        setDisabledItems,
        screenSize,
        assetSource,
        pages,
        onPageSearch,
      }}
    >
      <div className="contentarize-cms-wrapper">
        {!user ? (
          <>
            {children}
            <button
              className="ctz-bg-amber-600 ctz-text-white fixed ctz-bottom-10 ctz-right-10 ctz-w-14 ctz-h-14 ctz-rounded-full ctz-flex ctz-items-center ctz-justify-center"
              onClick={onSignin}
            >
              <SigninIcon />
            </button>
          </>
        ) : (
          <>
            <div
              className={classNames(
                {
                  "ctz-bg-amber-100": isInEditMode,
                  "ctz-bg-teal-100": !isInEditMode,
                },
                "ctz-py-3 ctz-sticky ctz-top-0 ctz-z-50 ctz-font-semibold ctz-max-w-full ctz-overflow-hidden"
              )}
            >
              <div className="ctz-container ctz-flex ctz-flex-col ctz-lg:flex-row ctz-items-center ctz-justify-between ctz-space-y-3 ctz-lg:space-y-0 ctz-lg:space-x-3">
                {editMode ? (
                  <>
                    <div>
                      <button
                        onClick={() => setShowMetaContentForm(true)}
                        className="ctz-p-2 ctz-rounded-md ctz-transition-colors ctz-flex ctz-items-center ctz-gap-x-2 ctz-bg-black ctz-text-white ctz-px-3 ctz-font-normal! ctz-tracking-wide"
                      >
                        <SearchCode className="ctz-w-5 ctz-h-5" />
                        <span>Meta &amp; SEO</span>
                      </button>
                    </div>

                    <div className="ctz-text-black ctz-flex ctz-items-center ctz-gap-x-5">
                      <ScreensizeButton Icon={Ellipsis} size="default" />
                      <ScreensizeButton Icon={BsPhone} size="phone" />
                      <ScreensizeButton Icon={BsTablet} size="tablet" />
                      <ScreensizeButton Icon={BsLaptop} size="desktop" />
                    </div>
                  </>
                ) : (
                  <>&nbsp;</>
                )}
                <div className="ctz-flex ctz-items-center ctz-gap-x-5">
                  <button
                    onClick={() => {
                      if (isInEditMode && touched) {
                        if (
                          !confirm(
                            "You have unsaved changes. Are you sure you want to leave edit mode?"
                          )
                        )
                          return;
                      }

                      setPageData(structuredClone(initialPageData));
                      setEditMode(!editMode);
                      setScreenSize("default");
                    }}
                    className="ctz-border ctz-rounded-md ctz-py-2 ctz-px-3 ctz-border-gray-300/50 ctz-bg-black ctz-text-white ctz-transition-colors ctz-disabled:bg-transparent ctz-disabled:border-none ctz-inline-flex ctz-items-center ctz-space-x-3 ctz-font-normal! ctz-tracking-wide"
                  >
                    <span>
                      {isInEditMode
                        ? "Exit Editing Mode"
                        : "Enter Editing Mode"}
                    </span>
                    {isInEditMode && <XIcon className="ctz-w-5 ctz-h-5" />}
                  </button>

                  {touched && (
                    <>
                      <button
                        disabled={!!publishing}
                        className="ctz-px-5 ctz-py-2 ctz-bg-amber-500 ctz-text-white ctz-rounded-md ctz-disabled:opacity-50 ctz-disabled:cursor-not-allowed"
                        onClick={async () => {
                          try {
                            setPublishing(true);
                            await onPublish(pageData);
                            toast.success("Changes published successfully");
                          } catch (ex) {
                            console.error(ex);
                            toast.error("Something went wrong");
                          } finally {
                            setPublishing(false);
                          }
                        }}
                      >
                        Publish{publishing ? "ing" : ""} changes
                      </button>
                      <button
                        className="ctz-p-2 ctz-text-red-500"
                        onClick={() =>
                          setPageData(structuredClone(initialPageData))
                        }
                      >
                        Discard
                      </button>
                    </>
                  )}

                  {editMode ? (
                    <button
                      onClick={() => setDisabledItems([])}
                      className={classNames(
                        "ctz-rounded-full ctz-w-9 ctz-h-9 ctz-grid ctz-place-content-center ctz-relative",
                        {
                          "opacity-20": disabledItems.length === 0,
                          "ctz-bg-yellow-500 ctz-text-black ":
                            disabledItems.length > 0,
                        }
                      )}
                    >
                      {disabledItems.length > 0 ? (
                        <span className="ctz-absolute ctz--top-2 ctz--right-2 ctz-w-5 ctz-h-5 ctz-bg-red-500 ctz-rounded-full ctz-text-xs ctz-grid ctz-place-content-center ctz-text-white">
                          {disabledItems.length}
                        </span>
                      ) : null}
                      <EyeOffIcon className="ctz-w-4 ctz-h-4" />
                    </button>
                  ) : null}

                  <button className="ctz-px-5 ctz-py-2" onClick={onSignout}>
                    Sign out
                  </button>
                </div>
              </div>
            </div>
            <div className="ctz-relative">
              {(() => {
                const widthPx =
                  screenSize === "desktop"
                    ? 1536
                    : screenSize === "tablet"
                    ? 1280
                    : screenSize === "phone"
                    ? 640
                    : undefined; // default

                if (widthPx === undefined) {
                  // Screen size = default → render without iframe
                  return (
                    <div className="ctz-mx-auto ctz-bg-gray-50">
                      <div className="ctz-@container">
                        <div className="ctz-bg-white ctz-border-x ctz-border-gray-200">
                          {children}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <IframeWithStyles
                    widthPx={widthPx}
                    className="ctz-mx-auto ctz-bg-gray-50 ctz-h-screen ctz-w-full"
                  >
                    <div className="@container">
                      <div className="ctz-bg-white ctz-border-x ctz-border-gray-200">
                        {children}
                      </div>
                    </div>
                  </IframeWithStyles>
                );
              })()}
              {editing.id ? (
                <Modal onClose={() => setEditing({ id: null, inputs: [] })}>
                  <ContentifyForm
                    onClose={() => setEditing({ id: null, inputs: [] })}
                  />
                </Modal>
              ) : null}
              {showMetaContentForm ? (
                <Modal onClose={() => setShowMetaContentForm(false)}>
                  <MetaContentForm
                    onClose={() => setShowMetaContentForm(false)}
                  />
                </Modal>
              ) : null}
            </div>
            <Toaster />
          </>
        )}
      </div>
    </CMSContext.Provider>
  );
}

export default CMSProvider;
