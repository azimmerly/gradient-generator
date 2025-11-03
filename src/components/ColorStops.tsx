import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Button } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/16/solid";
import { useShallow } from "zustand/shallow";

import { ColorStop } from "@/components/ColorStop";
import { useGradientStore } from "@/stores/gradient";

export const ColorStops = () => {
  const [stops, addStop, reorderStops] = useGradientStore(
    useShallow((s) => [s.stops, s.addStop, s.reorderStops]),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = stops.findIndex(({ id }) => id === active.id);
    const newIndex = stops.findIndex(({ id }) => id === over.id);

    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    const newOrder = arrayMove(
      stops.map(({ id }) => id),
      oldIndex,
      newIndex,
    );
    reorderStops(newOrder);
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={stops.map(({ id }) => id)}
          strategy={verticalListSortingStrategy}
        >
          <ul className="flex flex-col items-center gap-1">
            {stops.map((stop) => (
              <ColorStop key={stop.id} stop={stop} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
      {stops.length < 4 && (
        <Button
          onClick={addStop}
          className="mt-2 flex w-fit cursor-pointer items-center gap-0.5 text-sm font-semibold text-blue-600 transition-opacity hover:opacity-80 lg:mt-2.5"
        >
          <PlusIcon className="size-4" />
          Add color
        </Button>
      )}
    </div>
  );
};
