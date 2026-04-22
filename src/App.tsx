import { GradientControls } from "@/components/GradientControls";
import { GradientPreview } from "@/components/GradientPreview";
import { useGradientUrl } from "@/utils/useGradientUrl";

export const App = () => {
  useGradientUrl();

  return (
    <main className="font-body flex min-h-screen flex-col overflow-x-hidden text-mist-800 antialiased">
      <GradientControls />
      <GradientPreview />
    </main>
  );
};
