import { get as _get } from "lodash-es";
import { set as _set } from "lodash-es";
import { PageData } from ".";
import { useForm } from "react-hook-form";
import { snakeCase as _snakeCase } from "lodash-es";
import { startCase as _startCase } from "lodash-es";
import XIcon from "./components/icons/x-icon";
import { useCallback, useContext } from "react";
import ImagePicker from "./components/image-picker";
import { CMSContext } from "./cms-provider";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Trash2,
} from "lucide-react";
import URLPicker from "./components/url-picker.tsx";
import { RichTextEditor } from "./rich-text-editor";
// import "./cms.css";
import Checkbox from "./components/checkbox";

type FieldValue = PageData[keyof PageData];

export default function ContentifyForm({ onClose }: { onClose: () => void }) {
  const { editing, pageData, setPageData } = useContext(CMSContext);
  if (!editing.id) throw new Error("No content to edit");

  const { register, handleSubmit, watch, setValue } = useForm<FieldValue>({
    mode: "onChange",
    defaultValues: _get(
      pageData,
      editing.id
      // TODO: avoid as
    ) as FieldValue,
  });

  const isCreatingNew = /\.-1$/.test(editing.id);
  const path = editing.id.replace(/\.-?\d+$/, "");
  const isExistingRepeatable = !isCreatingNew && /\.\d+$/.test(editing.id);

  const onSubmit = useCallback(
    (data: FieldValue) => {
      if (editing.id) {
        if (isCreatingNew) {
          const array = (_get(pageData, path, []) as FieldValue[]) || [];
          array.push(data);
          _set(pageData, path, array);
        } else {
          _set(pageData, editing.id, data);
        }
        setPageData(structuredClone(pageData) as PageData);
        onClose();
      }
    },
    [setPageData, pageData, isCreatingNew, onClose, path, editing]
  );

  const onRemove = useCallback(() => {
    if (editing.id) {
      const array = (_get(pageData, path, []) as FieldValue[]) || [];
      const index = Number(editing.id.match(/\d+$/)?.[0]);
      array.splice(index, 1);
      _set(pageData, path, array);
      setPageData(structuredClone(pageData) as PageData);
      onClose();
    }
  }, [editing.id, onClose, pageData, setPageData, path]);

  const moveUp = useCallback(() => {
    const array = (_get(pageData, path, []) as FieldValue[]) || [];
    const index = Number(editing.id?.match(/\d+$/)?.[0]);
    if (index > 0) {
      const item = array.splice(index, 1)[0];
      array.splice(index - 1, 0, item);
      _set(pageData, path, array);
      setPageData(structuredClone(pageData) as PageData);
    }
    onClose();
  }, [editing.id, pageData, setPageData, path, onClose]);

  const moveDown = useCallback(() => {
    const array = (_get(pageData, path, []) as FieldValue[]) || [];
    const index = Number(editing.id?.match(/\d+$/)?.[0]);
    if (index < array.length - 1) {
      const item = array.splice(index, 1)[0];
      array.splice(index + 1, 0, item);
      _set(pageData, path, array);
      setPageData(structuredClone(pageData) as PageData);
    }
    onClose();
  }, [editing.id, pageData, setPageData, path, onClose]);

  const moveToEnd = useCallback(() => {
    const array = (_get(pageData, path, []) as FieldValue[]) || [];
    const index = Number(editing.id?.match(/\d+$/)?.[0]);
    if (index < array.length - 1) {
      const item = array.splice(index, 1)[0];
      array.push(item);
      _set(pageData, path, array);
      setPageData(structuredClone(pageData) as PageData);
    }
    onClose();
  }, [editing.id, pageData, setPageData, path, onClose]);

  const moveToFirst = useCallback(() => {
    const array = (_get(pageData, path, []) as FieldValue[]) || [];
    const index = Number(editing.id?.match(/\d+$/)?.[0]);
    if (index > 0) {
      const item = array.splice(index, 1)[0];
      array.unshift(item);
      _set(pageData, path, array);
      setPageData(structuredClone(pageData) as PageData);
    }
    onClose();
  }, [editing.id, pageData, setPageData, path, onClose]);

  return (
    <div>
      <div className="ctz:p-5 ctz:bg-gray-100 ctz:flex ctz:justify-between ctz:items-center ctz:sticky ctz:top-0">
        <h1 className="ctz:font-semibold">
          {isCreatingNew ? "Add" : "Edit"}{" "}
          {_startCase(editing.id.replace(/\.-?\d+$/, ""))}
        </h1>
        <button type="button" onClick={onClose} className="ctz:md:hidden">
          <strong className="ctz:text-3xl">
            <XIcon />
          </strong>
        </button>
        {isExistingRepeatable && (
          <button
            onClick={() => {
              if (confirm("Are you sure you want to delete this item?"))
                onRemove();
            }}
            className="ctz:text-red-500"
          >
            <Trash2 className="ctz:w-5 ctz:h-5" />
          </button>
        )}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="ctz:p-5 ctz:space-y-5 ctz:pb-44"
      >
        {editing.inputs.map((input) => {
          const id = _snakeCase(input?.label);
          return ["image", "video"].includes(input.type) ? (
            <div className="ctz:space-y-1" key={input.id}>
              <label className="ctz:font-medium">{input?.label}</label>
              <ImagePicker
                isVideo={input.type === "video"}
                value={String(watch(input.id) || "")}
                onImageSelected={(_) => {
                  setValue(input.id, _);
                }}
              />
            </div>
          ) : input.type === "boolean" ? (
            <Checkbox
              key={input.id}
              {...register(input.id)}
              label={input?.label}
              checked={Boolean(watch(input.id) || false)}
              onChange={(checked) =>
                // @ts-expect-error - checked is boolean
                setValue(input.id, checked)
              }
            />
          ) : input.type === "url" ? (
            <URLPicker
              key={input.id}
              label={input?.label}
              value={watch(input.id) || ""}
              onSetURL={(url) => setValue(input.id, url)}
              onChangeOpenInNewTab={() => {}}
            />
          ) : input.type === "rich-text" ? (
            <div className="ctz:space-y-1" key={input.id}>
              <label className="ctz:font-medium">{input?.label}</label>
              <RichTextEditor
                value={watch(input.id) || ""}
                onChange={(value: string) => {
                  setValue(input.id, value);
                }}
              />
            </div>
          ) : (
            <div className="ctz:space-y-1" key={input.id}>
              <label htmlFor={id} className="ctz:font-medium">
                {input?.label}
              </label>
              <input
                type="text"
                id={id}
                placeholder={input?.label}
                className="ctz:p-3 ctz:w-full ctz:border ctz:border-gray-300/50 ctz:rounded ctz:focus:ring-0 ctz:focus:outline-none"
                {...register(input.id)}
              />
            </div>
          );
        })}
        <div className="ctz:fixed ctz:inset-x-0 ctz:max-w-[450px] ctz:bottom-0 ctz:ml-auto ctz:p-3 ctz:bg-gray-50 ctz:border-t ctz:border-gray-200 ctz:space-y-3">
          {!isCreatingNew && /\.\d+$/.test(editing.id) && (
            <div className="ctz:flex ctz:justify-between ctz:items-center">
              <div className="ctz:space-x-2">
                <button
                  className="ctz:p-2.5 ctz:rounded btn"
                  title="Move item first"
                  onClick={moveToFirst}
                >
                  <ChevronsLeft className="ctz:w-5 ctz:h-5" />
                </button>
                <button
                  className="ctz:p-2.5 ctz:rounded btn"
                  title="Move item up"
                  onClick={moveUp}
                >
                  <ChevronLeft className="ctz:w-5 ctz:h-5" />
                </button>
              </div>
              <div className="ctz:space-x-2">
                <button
                  className="ctz:p-2.5 ctz:rounded btn"
                  title="Move item down"
                  onClick={moveDown}
                >
                  <ChevronRight className="ctz:w-5 ctz:h-5" />
                </button>
                <button
                  className="ctz:p-2.5 ctz:rounded btn"
                  title="Move item last"
                  onClick={moveToEnd}
                >
                  <ChevronsRight className="ctz:w-5 ctz:h-5" />
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="btn ctz:w-full ctz:block ctz:p-3 ctz:rounded-full"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
