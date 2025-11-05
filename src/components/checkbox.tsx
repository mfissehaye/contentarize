import classNames from "classnames";
import { RefCallback } from "react";

export default function Checkbox({
  label,
  checked,
  onChange,
  ref,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  ref?: React.RefObject<HTMLInputElement> | RefCallback<HTMLInputElement>;
}) {
  return (
    <div>
      <label className="flex items-center space-x-3 cursor-pointer mb-0!">
        <input
          type="checkbox"
          className="hidden peer"
          checked={checked}
          aria-label={label}
          ref={ref}
          onChange={(e) => onChange(e.currentTarget.checked)}
        />
        <span className="inline-flex items-center gap-x-3">
          <button
            type="button"
            onClick={() => onChange(!checked)}
            className={classNames(
              "w-4 h-4 rounded-sm ring-2 ring-offset-2 ring-blue-500 relative inline-block",
              {
                "bg-primary": checked,
              }
            )}
            aria-hidden="true"
          ></button>
          <span className="inline-block">{label}</span>
        </span>
      </label>
    </div>
  );
}
