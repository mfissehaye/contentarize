import {
  useRef,
  useState,
  useEffect,
  useContext,
  type ReactNode,
  useLayoutEffect,
  useMemo,
} from "react";
import classNames from "classnames";
import { Field, PickIdValuesFromType } from "..";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { CMSContext } from "../cms-provider";

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Contentarize<Fields extends Field[]>({
  children,
  id,
  inputs,
  disabled,
  // offset,
}: {
  children: (value: PickIdValuesFromType<Fields>) => ReactNode;
  id: string;
  inputs: Fields;
  disabled?: boolean;
  offset?: { top?: number; left?: number };
}) {
  const [hovered, setHovered] = useState(false);
  const childrenRef = useRef<HTMLDivElement | null>(null);
  const { setEditing, editMode, pageData, setDisabledItems, disabledItems } =
    useContext(CMSContext);

  const isDisabled = useMemo(
    () => disabledItems.includes(id),
    [disabledItems, id]
  );

  if (!pageData) return null;

  try {
    const childNodes = children(pageData?.[id] as PickIdValuesFromType<Fields>);

    return !disabled && editMode ? (
      <div
        className="parent"
        onFocusCapture={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onMouseOverCapture={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onBlurCapture={(e) => {
          e.stopPropagation();
          setHovered(false);
        }}
        onMouseOutCapture={(e) => {
          e.stopPropagation();
          setHovered(false);
        }}
      >
        <div ref={childrenRef}>{childNodes}</div>
        <div /* style={{ zIndex: countAncestors(childrenRef.current) }} */>
          {isDisabled ? (
            <div className="relative overflow-visible">
              <button
                className="absolute bg-amber-500/10 cursor-pointer transition-opacity child"
                style={{
                  right: 0,
                  top: -(childrenRef.current?.clientHeight || 0),
                }}
                onClick={() =>
                  setDisabledItems(disabledItems.filter((item) => item !== id))
                }
              >
                {hovered ? (
                  <div className="absolute top-5 right-3 -translate-x-1/2 -translate-y-1/2 bg-black [&_*]:text-white! w-6 h-6 rounded-full grid place-items-center border border-gray-400">
                    <EyeOffIcon className="w-4 h-4" />
                  </div>
                ) : null}
              </button>
            </div>
          ) : (
            <div className="relative overflow-visible">
              <button
                onClick={() => setEditing({ id, inputs })}
                className={classNames(
                  "absolute bg-amber-500/10 border border-amber-300/40! cursor-pointer transition-opacity child z-20",
                  {
                    "opacity-100": hovered,
                    "opacity-0": !hovered,
                  }
                )}
                style={{
                  left: 0,
                  top: -(childrenRef.current?.clientHeight || 0),
                  width: childrenRef.current?.clientWidth,
                  height: childrenRef.current?.clientHeight,
                }}
              >
                <div className="w-6 h-6 bg-white rounded-full grid place-items-center [&_*]:text-black! absolute top-5 right-3 -translate-x-1/2 -translate-y-1/2 border border-gray-400">
                  <EyeIcon
                    className="w-4 h-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDisabledItems([...disabledItems, id]);
                    }}
                  />
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    ) : (
      childNodes
    );
  } catch (ex) {
    return null;
  }
}
