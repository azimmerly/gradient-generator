import { act, renderHook } from "@testing-library/react";

import { useCopy } from "./useCopy";

describe("useCopy", () => {
  beforeEach(() => {
    vi.stubGlobal("navigator", {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it("starts with copied false", () => {
    const { result } = renderHook(() => useCopy());
    expect(result.current.copied).toBe(false);
  });

  it("sets copied to true after copy", async () => {
    const { result } = renderHook(() => useCopy());
    await act(() => result.current.copy(() => "hello"));
    expect(result.current.copied).toBe(true);
  });

  it("resets copied after timeout", async () => {
    const { result } = renderHook(() => useCopy());
    await act(() => result.current.copy(() => "hello"));
    act(() => vi.advanceTimersByTime(800));
    expect(result.current.copied).toBe(false);
  });

  it("calls clipboard with correct text", async () => {
    const { result } = renderHook(() => useCopy());
    await act(() => result.current.copy(() => "test text"));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("test text");
  });
});
