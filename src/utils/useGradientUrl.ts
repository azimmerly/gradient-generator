import { useEffect } from "react";

import { useGradientStore } from "@/stores/gradient";
import type { GradientState } from "@/types";
import { serializeGradient } from "@/utils/gradientUrl";

export const useGradientUrl = () => {
  useEffect(() => {
    let lastSearch = window.location.search;

    const syncUrl = (state: GradientState) => {
      const search = serializeGradient(state);
      if (search === lastSearch) {
        return;
      }
      lastSearch = search;
      history.replaceState(null, "", search);
    };

    syncUrl(useGradientStore.getState());
    return useGradientStore.subscribe(syncUrl);
  }, []);
};
