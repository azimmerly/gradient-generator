import { act, renderHook } from "@testing-library/react";

import { useGradientStore } from "@/stores/gradient";
import type { GradientState } from "@/types";
import { serializeGradient } from "@/utils/gradientUrl";
import { useGradientUrl } from "./useGradientUrl";

const baseState: GradientState = {
  type: "linear",
  directionAngle: 135,
  radialPosition: "center",
  stops: [
    { id: "1", color: "#ff0000", position: 0 },
    { id: "2", color: "#0000ff", position: 100 },
  ],
};

beforeEach(() => {
  useGradientStore.setState({ ...baseState, selectedStop: "1" });
  vi.spyOn(history, "replaceState").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("useGradientUrl", () => {
  it("sets the URL on mount", () => {
    renderHook(() => useGradientUrl());
    expect(history.replaceState).toHaveBeenCalledWith(
      null,
      "",
      serializeGradient(baseState),
    );
  });

  it("updates the URL when the store changes", () => {
    renderHook(() => useGradientUrl());

    act(() => useGradientStore.getState().setType("radial"));
    expect(history.replaceState).toHaveBeenLastCalledWith(
      null,
      "",
      serializeGradient(useGradientStore.getState()),
    );
  });

  it("stops updating the URL after unmount", () => {
    const { unmount } = renderHook(() => useGradientUrl());
    unmount();

    const callCount = vi.mocked(history.replaceState).mock.calls.length;

    act(() => useGradientStore.getState().setType("radial"));
    expect(vi.mocked(history.replaceState).mock.calls.length).toBe(callCount);
  });
});
