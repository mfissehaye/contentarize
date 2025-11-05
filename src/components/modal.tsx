export default function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="ctz:z-50 ctz:fixed ctz:inset-0">
      <div
        className="ctz:absolute ctz:inset-0 ctz:bg-black/30"
        role="button"
        tabIndex={0}
        onKeyDown={() => {}}
        onClick={onClose}
      ></div>
      <div className="ctz:absolute ctz:bg-white ctz:w-[450px] ctz:max-w-full ctz:right-0 ctz:inset-y-0 ctz:overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
