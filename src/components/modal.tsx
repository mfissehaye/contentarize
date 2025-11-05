export default function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="z-50 fixed inset-0">
      <div
        className="absolute inset-0 bg-black/30"
        role="button"
        tabIndex={0}
        onKeyDown={() => {}}
        onClick={onClose}
      ></div>
      <div className="absolute bg-white w-[450px] max-w-full right-0 inset-y-0 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
