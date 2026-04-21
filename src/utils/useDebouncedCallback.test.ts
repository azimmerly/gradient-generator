import { act, renderHook } from "@testing-library/react";

import { useDebouncedCallback } from "./useDebouncedCallback";

describe("useDebouncedCallback", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("does not call callback before delay elapses", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 300));
    act(() => result.current("a"));
    act(() => vi.advanceTimersByTime(299));
    expect(callback).not.toHaveBeenCalled();
  });

  it("calls callback after delay elapses", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 300));
    act(() => result.current("a"));
    act(() => vi.advanceTimersByTime(300));
    expect(callback).toHaveBeenCalledWith("a");
  });

  it("only calls callback once when invoked repeatedly within delay", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 300));
    act(() => {
      result.current("a");
      result.current("b");
      result.current("c");
    });
    act(() => vi.advanceTimersByTime(300));
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("c");
  });

  it("clears pending callback on unmount", () => {
    const callback = vi.fn();
    const { result, unmount } = renderHook(() =>
      useDebouncedCallback(callback, 300),
    );
    act(() => result.current("a"));
    unmount();
    act(() => vi.advanceTimersByTime(300));
    expect(callback).not.toHaveBeenCalled();
  });
});
