import { describe, it, expect } from "vitest";
import React from "react";
import { render } from "@testing-library/react";
import IframeWithStyles from "../components/IframeWithStyles";

describe("IframeWithStyles (cms)", () => {
  it("renders iframe with provided dimensions without type issues", () => {
    render(
      <IframeWithStyles widthPx={300} heightPx={150}>
        <div>Inside</div>
      </IframeWithStyles>
    );

    const iframe = document.querySelector("iframe");
    expect(iframe).not.toBeNull();
    expect(iframe?.style.width).toBe("300px");
    expect(iframe?.style.height).toBe("150px");
  });
});


