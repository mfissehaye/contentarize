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
      <label className="ctz:flex ctz:items-center ctz:space-x-3 ctz:cursor-pointer ctz:mb-0!">
        <input
          type="checkbox"
          className="ctz:hidden peer"
          checked={checked}
          aria-label={label}
          ref={ref}
          onChange={(e) => onChange(e.currentTarget.checked)}
        />
        <span className="ctz:inline-flex ctz:items-center ctz:gap-x-3">
          <button
            type="button"
            onClick={() => onChange(!checked)}
            className={classNames(
              "ctz:w-4 ctz:h-4 ctz:rounded-sm ctz:ring-2 ctz:ring-offset-2 ctz:ring-blue-500 ctz:relative ctz:inline-block",
              {
                "ctz:bg-primary": checked,
              }
            )}
            aria-hidden="true"
          ></button>
          <span className="ctz:inline-block">{label}</span>
        </span>
      </label>
    </div>
  );
}
