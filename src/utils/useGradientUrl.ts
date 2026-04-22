import { useEffect } from "react";

import { useGradientStore } from "@/stores/gradient";
import { serializeGradient } from "@/utils/gradientUrl";

export const useGradientUrl = () => {
  useEffect(() => {
    history.replaceState(
      null,
      "",
      serializeGradient(useGradientStore.getState()),
    );

    return useGradientStore.subscribe((state) => {
      history.replaceState(null, "", serializeGradient(state));
    });
  }, []);
};
