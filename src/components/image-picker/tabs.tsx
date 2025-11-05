import classNames from "classnames";

export default function Tabs<T extends string = "Public" | "Upload">({
  labels = ["Public", "Upload"] as T[],
  activeTab,
  onSelectTab,
}: {
  labels?: T[];
  activeTab: T;
  onSelectTab: (tab: T) => void;
}) {
  return (
    <div className="ctz-flex">
      {labels.map((_, i) => (
        <button
          type="button"
          key={`tab-${i}`}
          className={classNames(
            { "ctz-text-white ctz-bg-blue-600": activeTab === _ },
            "ctz-font-medium ctz-px-5 ctz-py-2.5 ctz-focus:outline-0 ctz-rounded-md"
          )}
          onClick={() => onSelectTab(_ as T)}
        >
          {_}
        </button>
      ))}
    </div>
  );
}
