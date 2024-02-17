import { colorToCss } from "@/lib/utils";
import { RectangleShape } from "@/types/canvas";

interface RectangleProps {
  shape: RectangleShape;
  onPointerDown: (e: React.PointerEvent) => void;
}
const Rectangle = ({ shape, onPointerDown }: RectangleProps) => {
  const { x, y, width, height, fill } = shape;

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
