import { GradientControls } from "@/components/GradientControls";
import { GradientPreview } from "@/components/GradientPreview";

export const App = () => (
  <main className="font-body flex min-h-screen flex-col overflow-x-hidden text-gray-800 antialiased">
    <GradientControls />
    <GradientPreview />
  </main>
);
