import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Modal from "./modal";
import { CMSContext } from "../../cms-provider";

const baseContextValue = {
  editMode: true,
  screenSize: "default" as const,
  pageData: {},
  editing: { id: null, inputs: [] },
  setEditing: vi.fn(),
  setPageData: vi.fn(),
  hoveredId: null,
  setHoveredId: vi.fn(),
  disabledItems: [],
  setDisabledItems: vi.fn(),
  assetSource: undefined,
};

describe("ImagePicker Modal", () => {
  it("hides the Upload tab when no assetSource is provided", () => {
    render(
      <CMSContext.Provider value={baseContextValue}>
        <Modal isVideo={false} onImageSelected={() => {}} onClose={() => {}} />
      </CMSContext.Provider>
    );

    expect(screen.getByRole("button", { name: /public/i })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /upload/i })).not.toBeInTheDocument();
  });

  it("renders the Upload tab when an assetSource with uploadAsset is provided", async () => {
    const assetSource = {
      listAssets: vi.fn().mockResolvedValue([]),
      uploadAsset: vi.fn(),
    };

    render(
      <CMSContext.Provider value={{ ...baseContextValue, assetSource }}>
        <Modal isVideo={false} onImageSelected={() => {}} onClose={() => {}} />
      </CMSContext.Provider>
    );

    expect(await screen.findByRole("button", { name: /upload/i })).toBeInTheDocument();
  });
});

