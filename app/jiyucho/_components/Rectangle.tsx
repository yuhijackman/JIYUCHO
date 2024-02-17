import { colorToCss } from "@/lib/utils";
import { RectangleLayer } from "@/types/canvas";

interface RectangleProps {
  layer: RectangleLayer;
  onPointerDown: (e: React.PointerEvent) => void;
}
const Rectangle = ({ layer, onPointerDown }: RectangleProps) => {
  const { x, y, width, height, fill } = layer;

  return (
    <rect
      className="drop-shadow-md"
      onPointerDown={(e) => onPointerDown(e)}
      style={{
        transform: `translate(${x}px, ${y}px)`
      }}
      x={0}
      y={0}
      width={width}
      height={height}
      strokeWidth={1}
      fill={fill ? colorToCss(fill) : "#000"}
    />
  );
};

export default Rectangle;
