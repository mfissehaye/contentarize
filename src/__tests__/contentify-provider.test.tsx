import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import { render, renderHook } from "@testing-library/react";
import { CMSProvider, CMSContext } from "../cms-provider";

// Mock use-local-storage to avoid touching real localStorage and to keep defaults stable
vi.mock("../utils/use-local-storage", () => {
  return {
    default: <T,>(key: string, initial: T): [T, (v: T) => void] => {
      if (key === "screenSize") {
        return ["desktop" as T, () => {}];
      }
      if (key === "editMode") {
        return [true as T, () => {}];
      }
      return [initial, () => {}];
    },
  };
});

describe("CMSProvider", () => {
  const user = { id: "u1", email: "x@example.com", name: "X" } as any;
  const initialPageData = {} as any;

  const baseProps = {
    user,
    initialPageData,
    onSignout: vi.fn(),
    onSignin: vi.fn(),
    onPublish: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders children inside an iframe wrapper when user is present", () => {
    const { container } = render(
      <CMSProvider {...baseProps}>
        <div>Hello</div>
      </CMSProvider>
    );

    const iframe = container.querySelector("iframe");
    expect(iframe).not.toBeNull();
  });

  it("provides the asset source via context", () => {
    const assetSource = {
      listAssets: vi.fn().mockResolvedValue([]),
      uploadAsset: vi.fn(),
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CMSProvider {...baseProps} user={null} assetSource={assetSource}>
        {children}
      </CMSProvider>
    );

    const { result } = renderHook(() => React.useContext(CMSContext), {
      wrapper,
    });

    expect(result.current.assetSource).toBe(assetSource);
  });
});


