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
        <Icon className="w-5 h-5" />
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
      {!user ? (
        <>
          {children}
          <button
            className="bg-amber-600 text-white fixed bottom-10 right-10 w-14 h-14 rounded-full flex items-center justify-center"
            onClick={onSignin}
          >
            <SigninIcon />
          </button>
        </>
      ) : (
        <>
          <div
            className={classNames(
              { "bg-amber-100": isInEditMode, "bg-teal-100": !isInEditMode },
              "py-3 sticky top-0 z-50 font-semibold max-w-full overflow-hidden"
            )}
          >
            <div className="container flex flex-col lg:flex-row items-center justify-between space-y-3 lg:space-y-0 lg:space-x-3">
              {editMode ? (
                <>
                  <div>
                    <button
                      onClick={() => setShowMetaContentForm(true)}
                      className="p-2 rounded-md transition-colors flex items-center gap-x-2 bg-black text-white px-3 font-normal! tracking-wide"
                    >
                      <SearchCode className="w-5 h-5" />
                      <span>Meta &amp; SEO</span>
                    </button>
                  </div>

                  <div className="text-black flex items-center gap-x-5">
                    <ScreensizeButton Icon={Ellipsis} size="default" />
                    <ScreensizeButton Icon={BsPhone} size="phone" />
                    <ScreensizeButton Icon={BsTablet} size="tablet" />
                    <ScreensizeButton Icon={BsLaptop} size="desktop" />
                  </div>
                </>
              ) : (
                <>&nbsp;</>
              )}
              <div className="flex items-center gap-x-5">
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
                  className="border rounded-md py-2 px-3 border-gray-300/50 bg-black text-white transition-colors disabled:bg-transparent disabled:border-none inline-flex items-center space-x-3 font-normal! tracking-wide"
                >
                  <span>
                    {isInEditMode ? "Exit Editing Mode" : "Enter Editing Mode"}
                  </span>
                  {isInEditMode && <XIcon className="w-5 h-5" />}
                </button>

                {touched && (
                  <>
                    <button
                      disabled={!!publishing}
                      className="px-5 py-2 bg-amber-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
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
                      className="p-2 text-red-500"
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
                      "rounded-full w-9 h-9 grid place-content-center relative",
                      {
                        "opacity-20": disabledItems.length === 0,
                        "bg-yellow-500 text-black ": disabledItems.length > 0,
                      }
                    )}
                  >
                    {disabledItems.length > 0 ? (
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-xs grid place-content-center text-white">
                        {disabledItems.length}
                      </span>
                    ) : null}
                    <EyeOffIcon className="w-4 h-4" />
                  </button>
                ) : null}

                <button className="px-5 py-2 " onClick={onSignout}>
                  Sign out
                </button>
              </div>
            </div>
          </div>
          <div className="relative">
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
                  <div className="mx-auto bg-gray-50">
                    <div className="@container">
                      <div className="bg-white border-x border-gray-200">
                        {children}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <IframeWithStyles
                  widthPx={widthPx}
                  className="mx-auto bg-gray-50 h-screen w-full"
                >
                  <div className="@container">
                    <div className="bg-white border-x border-gray-200">
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
    </CMSContext.Provider>
  );
}

export default CMSProvider;
