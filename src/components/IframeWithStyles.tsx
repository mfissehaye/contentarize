import React from "react";
import Frame, { type FrameComponentProps } from "react-frame-component";

type IframeWithStylesProps = FrameComponentProps & {
  /** Optional width in pixels for the iframe viewport */
  widthPx?: number;
  /** Optional height in pixels for the iframe viewport. If omitted, CSS classes control height */
  heightPx?: number;
};

/**
 * Renders children into an iframe and mirrors the parent document's <link rel="stylesheet"> and <style>
 * elements into the iframe head so Tailwind and app styles apply inside the iframe.
 */
export function IframeWithStyles({ widthPx, heightPx, style, children, ...rest }: IframeWithStylesProps) {
  const frameRef = React.useRef<HTMLIFrameElement | null>(null);
  const observerRef = React.useRef<MutationObserver | null>(null);

  const syncStyles = React.useCallback(() => {
    const iframe = frameRef.current;
    if (!iframe) return;
    const doc = iframe.contentDocument;
    if (!doc) return;

    const head = doc.head;
    if (!head) return;

    head.innerHTML = "";

    const parentHead = document.head;
    const nodes: NodeListOf<HTMLLinkElement | HTMLStyleElement> = parentHead.querySelectorAll(
      'link[rel="stylesheet"], style'
    );

    nodes.forEach((node) => {
      if (node.tagName === "LINK") {
        const link = doc.createElement("link");
        Array.from(node.attributes).forEach((attr) => link.setAttribute(attr.name, attr.value));
        head.appendChild(link);
      } else if (node.tagName === "STYLE") {
        const styleEl = doc.createElement("style");
        styleEl.textContent = node.textContent;
        head.appendChild(styleEl);
      }
    });
  }, []);

  React.useEffect(() => {
    // Initial sync after iframe mounts/loads
    const iframe = frameRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      syncStyles();
    };
    iframe.addEventListener("load", handleLoad);
    // If already loaded, try syncing immediately
    if (iframe.contentDocument?.readyState === "complete") {
      syncStyles();
    }

    return () => {
      iframe.removeEventListener("load", handleLoad);
    };
  }, [syncStyles]);

  React.useEffect(() => {
    // Observe parent head for style/link changes during HMR/dev
    observerRef.current?.disconnect();
    const observer = new MutationObserver(() => {
      syncStyles();
    });
    observer.observe(document.head, { childList: true, subtree: true, attributes: true });
    observerRef.current = observer;
    return () => observer.disconnect();
  }, [syncStyles]);

  const computedStyle: React.CSSProperties = {
    border: "1px solid rgba(0,0,0,0.1)",
    width: widthPx ? `${widthPx}px` : undefined,
    // Only set inline height if explicitly provided so Tailwind classes like h-screen can apply
    height: typeof heightPx === "number" ? `${heightPx}px` : undefined,
    ...style,
  };

  return (
    <Frame ref={frameRef} style={computedStyle} {...rest}>
      {children}
    </Frame>
  );
}

export default IframeWithStyles;

