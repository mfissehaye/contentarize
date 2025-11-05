import Contentarize from "./contentarize";
import { BsPlus } from "react-icons/bs";
import { Field, PickIdValuesFromType } from "..";
import { Fragment, ReactNode, useContext } from "react";
import { CMSContext } from "../cms-provider";

type PropsType<Fields extends Field[]> = {
  id: string;
  inputs: Fields;
  disabled?: boolean;
  offset?: { top?: number; left?: number };
  children: (value: PickIdValuesFromType<Fields>, index: number) => ReactNode;
};

export default function Repeater<Fields extends Field[]>({
  id,
  inputs,
  disabled,
  offset,
  children,
}: PropsType<Fields>) {
  const { editMode, pageData, setEditing } = useContext(CMSContext);

  if (pageData[id] && !Array.isArray(pageData[id])) {
    throw new Error("Repeater must be used with an array of items");
  }

  const items = (pageData[id] as Array<PickIdValuesFromType<Fields>>) || [];

  return editMode ? (
    <>
      {items.map((item, i) => (
        <Fragment key={i}>
          <Contentarize
            id={`${id}.${i}`}
            inputs={inputs}
            disabled={disabled}
            offset={offset}
          >
            {() => children(item, i)}
          </Contentarize>
        </Fragment>
      ))}
      <div
        tabIndex={0}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setEditing({ id: id + ".-1", inputs });
        }}
        onKeyDown={() => {}}
        role="button"
        className="relative ctz:max-w-full ctz:overflow-hidden min-w-10"
      >
        {items.length ? (
          <div className="ctz:opacity-20 relative pointer-events-none ctz:pl-5 ctz:cursor-pointer">
            {children(items[items.length - 1], items.length - 1)}
          </div>
        ) : (
          <button className="ctz:pl-12">Add an Item</button>
        )}
        {/* <div className="absolute ctz:inset-0 rounded ctz:flex ctz:items-end justify-center ctz:min-w-fit">
          <div className="ctz:font-medium ctz:flex ctz:items-center ctz:space-x-2 whitespace-nowrap border ctz:text-gray-500 hover:bg-gray-100 ctz:w-full ctz:justify-center ctz:p-3 rounded ctz:transition-colors ctz:bg-gray-50">
            <PlusIcon className="ctz:w-5 h-5" />
            <span>Add {_startCase(id)}</span>
          </div>
        </div> */}

        <button className="ctz:border-2 ctz:border-black rounded-full absolute ctz:top-1/2 ctz:-translate-y-1/2 ctz:left-3 ctz:w-6 h-6 ctz:grid ctz:place-items-center ctz:bg-white [&_*]:text-black!">
          <BsPlus className="ctz:w-5 h-5 ctz:text-black" />
        </button>
      </div>
    </>
  ) : (
    items.map((item, i) => <Fragment key={i}>{children(item, i)}</Fragment>)
  );
}
