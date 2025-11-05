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
    <div className="ctz:flex">
      {labels.map((_, i) => (
        <button
          type="button"
          key={`tab-${i}`}
          className={classNames(
            { "text-white bg-blue-600": activeTab === _ },
            "font-medium px-5 py-2.5 focus:outline-0 rounded-md"
          )}
          onClick={() => onSelectTab(_ as T)}
        >
          {_}
        </button>
      ))}
    </div>
  );
}
