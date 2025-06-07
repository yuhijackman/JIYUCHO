import { colorToCss } from "@/lib/utils";
import { Shape, PathShape } from "@/types/canvas";
import { getSvgPathFromStroke } from "@/lib/utils";
import { getStroke } from "perfect-freehand";

interface PathProps {
  shape: PathShape;
  onPointerDown?: (e: React.PointerEvent, shape: Shape) => void;
}
const Path = ({ shape, onPointerDown }: PathProps) => {
  const { x, y, points, fill } = shape;

  return (
    <path
      className="drop-shadow-md"
      onPointerDown={onPointerDown ? (e) => onPointerDown(e, shape) : undefined}
      style={{
        transform: `translate(${x}px, ${y}px)`
      }}
      d={getSvgPathFromStroke(
        getStroke(points, { simulatePressure: false, size: 5 })
      )}
      x={0}
      y={0}
      strokeWidth={1}
      fill={fill ? colorToCss(fill) : "#000"}
    />
  );
};

export default Path;
