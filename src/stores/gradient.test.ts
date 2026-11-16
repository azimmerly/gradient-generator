import { MAX_STOPS } from "@/consts";
import { useGradientStore } from "@/stores/gradient";
import type { GradientState } from "@/types";

const baseState: GradientState = {
  type: "linear",
  directionAngle: 135,
  radialPosition: "center",
  stops: [
    { id: "1", color: "#ff0000", position: 0 },
    { id: "2", color: "#00ff00", position: 40 },
    { id: "3", color: "#0000ff", position: 80 },
  ],
};

const getState = () => useGradientStore.getState();
const getStopIds = () => getState().stops.map(({ id }) => id);

beforeEach(() => {
  useGradientStore.setState({ ...baseState, selectedStop: "1" });
});

describe("gradient store", () => {
  describe("setters", () => {
    it("sets the type", () => {
      getState().setType("radial");
      expect(getState().type).toBe("radial");
    });

    it("sets the direction angle", () => {
      getState().setDirectionAngle(270);
      expect(getState().directionAngle).toBe(270);
    });

    it("sets the radial position", () => {
      getState().setRadialPosition("top left");
      expect(getState().radialPosition).toBe("top left");
    });

    it("sets the selected stop", () => {
      getState().setSelectedStop("2");
      expect(getState().selectedStop).toBe("2");
    });
  });

  describe("updateStop", () => {
    it("updates only the given stop", () => {
      getState().updateStop("2", { color: "#123456", position: 55 });

      expect(getState().stops).toEqual([
        baseState.stops[0],
        { id: "2", color: "#123456", position: 55 },
        baseState.stops[2],
      ]);
    });

    it("keeps unspecified fields", () => {
      getState().updateStop("2", { position: 55 });
      expect(getState().stops[1]).toEqual({
        id: "2",
        color: "#00ff00",
        position: 55,
      });
    });
  });

  describe("addStop", () => {
    it("adds a stop 10% after the last one and selects it", () => {
      getState().addStop();

      const { stops, selectedStop } = getState();
      const added = stops[stops.length - 1];
      expect(stops).toHaveLength(4);
      expect(added.position).toBe(90);
      expect(added.color).toMatch(/^#[0-9a-f]{6}$/);
      expect(selectedStop).toBe(added.id);
    });

    it("caps the new position at 100", () => {
      useGradientStore.setState({
        stops: [
          { id: "1", color: "#ff0000", position: 0 },
          { id: "2", color: "#0000ff", position: 95 },
        ],
      });
      getState().addStop();

      expect(getState().stops[2].position).toBe(100);
    });

    it("does nothing at the maximum number of stops", () => {
      while (getState().stops.length < MAX_STOPS) {
        getState().addStop();
      }
      const before = getState();

      getState().addStop();

      expect(getState().stops).toHaveLength(MAX_STOPS);
      expect(getState().stops).toBe(before.stops);
      expect(getState().selectedStop).toBe(before.selectedStop);
    });
  });

  describe("removeStop", () => {
    it("removes the stop", () => {
      getState().removeStop("2");
      expect(getStopIds()).toEqual(["1", "3"]);
    });

    it("keeps the selection when removing a different stop", () => {
      getState().setSelectedStop("1");
      getState().removeStop("2");
      expect(getState().selectedStop).toBe("1");
    });

    it("selects the last stop when removing the selected one", () => {
      getState().setSelectedStop("2");
      getState().removeStop("2");
      expect(getState().selectedStop).toBe("3");
    });

    it("does nothing when only 2 stops remain", () => {
      getState().removeStop("3");
      expect(getStopIds()).toEqual(["1", "2"]);

      getState().removeStop("1");
      expect(getStopIds()).toEqual(["1", "2"]);
    });
  });

  describe("reorderStops", () => {
    it("reorders stops by id and keeps their values", () => {
      getState().reorderStops(["3", "1", "2"]);

      expect(getState().stops).toEqual([
        baseState.stops[2],
        baseState.stops[0],
        baseState.stops[1],
      ]);
    });
  });
});
