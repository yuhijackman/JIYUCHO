import { colorToCss } from "@/lib/utils";
import { PathLayer } from "@/types/canvas";
import {getSvgPathFromStroke} from "@/lib/utils";
import {getStroke} from 'perfect-freehand'

interface PathProps {
  layer: PathLayer;
  onPointerDown?: (e: React.PointerEvent) => void;
}
const Path = ({ layer, onPointerDown }: PathProps) => {
  const { x, y, points, fill } = layer;

  return (
    <path
      className="drop-shadow-md"
      onPointerDown={onPointerDown}
      style={{
        transform: `translate(${x}px, ${y}px)`
      }}
      d={getSvgPathFromStroke(getStroke(points, {simulatePressure: false, size: 5}))}
      x={0}
      y={0}
      strokeWidth={1}
      fill={fill ? colorToCss(fill) : "#000"}
    />
  );
};

export default Path;
