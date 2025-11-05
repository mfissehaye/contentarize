import { useCallback, useContext, useEffect, useRef } from "react";
import { CMSContext } from "./cms-provider";
import { Field, PickIdValuesFromType } from "./types";

export default function useContentarize<Fields extends Field[]>({
  id,
  inputs,
}: {
  id: string;
  inputs: Fields;
}) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const { pageData, editMode, setEditing } = useContext(CMSContext);
  const value = pageData[id] as PickIdValuesFromType<Fields>;

  const listener = useCallback(() => {
    setEditing({ id, inputs });
  }, [id, inputs, setEditing]);

  useEffect(() => {
    const theRef = ref.current;
    theRef?.style.setProperty("display", !editMode ? "none" : "block");
    theRef?.style.setProperty("z-index", editMode ? "60" : "auto");
    theRef?.addEventListener("click", listener);

    return () => {
      theRef?.removeEventListener("click", listener);
    };
  }, [listener, editMode]);

  return { ref, value };
}
