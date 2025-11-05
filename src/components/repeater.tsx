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
        className="relative max-w-full overflow-hidden min-w-10"
      >
        {items.length ? (
          <div className="opacity-20 relative pointer-events-none pl-5 cursor-pointer">
            {children(items[items.length - 1], items.length - 1)}
          </div>
        ) : (
          <button className="pl-12">Add an Item</button>
        )}
        {/* <div className="absolute inset-0 rounded flex items-end justify-center min-w-fit">
          <div className="font-medium flex items-center space-x-2 whitespace-nowrap border text-gray-500 hover:bg-gray-100 w-full justify-center p-3 rounded transition-colors bg-gray-50">
            <PlusIcon className="w-5 h-5" />
            <span>Add {_startCase(id)}</span>
          </div>
        </div> */}

        <button className="border-2 border-black rounded-full absolute top-1/2 -translate-y-1/2 left-3 w-6 h-6 grid place-items-center bg-white [&_*]:text-black!">
          <BsPlus className="w-5 h-5 text-black" />
        </button>
      </div>
    </>
  ) : (
    items.map((item, i) => <Fragment key={i}>{children(item, i)}</Fragment>)
  );
}
