import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SeoSettingsForm from "../meta-content-form";
import { CMSContext } from "../cms-provider";

describe("SeoSettingsForm", () => {
  it("saves SEO data under __seo on submit", async () => {
    const setPageData = vi.fn();
    const onClose = vi.fn();

    const contextValue = {
      editMode: true,
      screenSize: "default" as const,
      pageData: {},
      editing: { id: null, inputs: [] },
      setEditing: vi.fn(),
      setPageData,
      hoveredId: null,
      setHoveredId: vi.fn(),
      disabledItems: [],
      setDisabledItems: vi.fn(),
      assetSource: undefined,
    };

    render(
      <CMSContext.Provider value={contextValue as any}>
        <SeoSettingsForm onClose={onClose} />
      </CMSContext.Provider>
    );

    const titleInput = screen.getByLabelText("Title") as HTMLInputElement;
    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, "My SEO Title");

    const submit = screen.getByRole("button", { name: /save seo settings/i });
    await userEvent.click(submit);

    await waitFor(() => expect(setPageData).toHaveBeenCalledTimes(1));
    const updated = setPageData.mock.calls[0][0];
    expect(updated.__seo).toBeDefined();
    expect(updated.__seo.title).toBe("My SEO Title");
    expect(onClose).toHaveBeenCalled();
  });
});


