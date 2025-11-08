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
}: // offset,
{
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
        onFocusCapture={() => setHovered(true)}
        onMouseOverCapture={() => setHovered(true)}
        onBlurCapture={() => setHovered(false)}
        onMouseOutCapture={() => setHovered(false)}
      >
        <div ref={childrenRef}>{childNodes}</div>
        <div /* style={{ zIndex: countAncestors(childrenRef.current) }} */>
          {isDisabled ? (
            <div className="ctz:relative ctz:overflow-visible">
              <button
                className="ctz:absolute ctz:bg-amber-500/10 ctz:cursor-pointer ctz:transition-opacity ctz:child"
                style={{
                  right: 0,
                  top: -(childrenRef.current?.clientHeight || 0),
                }}
                onClick={() =>
                  setDisabledItems(disabledItems.filter((item) => item !== id))
                }
              >
                {hovered ? (
                  <div className="ctz:absolute ctz:top-5 ctz:right-3 ctz:-translate-x-1/2 ctz:-translate-y-1/2 ctz:bg-black ctz:[&_*]:text-white! ctz:w-6 ctz:h-6 ctz:rounded-full ctz:grid ctz:place-items-center ctz:border ctz:border-gray-400">
                    <EyeOffIcon className="ctz:w-4 ctz:h-4" />
                  </div>
                ) : null}
              </button>
            </div>
          ) : (
            <div className="ctz:relative ctz:overflow-visible">
              <button
                onClick={() => setEditing({ id, inputs })}
                className={classNames(
                  "ctz:absolute ctz:bg-amber-500/10 ctz:border ctz:border-amber-300/40! ctz:cursor-pointer ctz:transition-opacity ctz:child ctz:z-20",
                  {
                    "ctz:opacity-100": hovered,
                    "ctz:opacity-0": !hovered,
                  }
                )}
                style={{
                  left: 0,
                  top: -(childrenRef.current?.clientHeight || 0),
                  width: childrenRef.current?.clientWidth,
                  height: childrenRef.current?.clientHeight,
                }}
              >
                <div className="ctz:w-6 ctz:h-6 ctz:bg-white ctz:rounded-full ctz:grid ctz:place-items-center ctz:[&_*]:text-black! ctz:absolute ctz:top-5 ctz:right-3 ctz:-translate-x-1/2 ctz:-translate-y-1/2 ctz:border ctz:border-gray-400">
                  <EyeIcon
                    className="ctz:w-4 ctz:h-4"
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
