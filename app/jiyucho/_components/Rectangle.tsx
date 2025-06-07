import { colorToCss } from "@/lib/utils";
import { RectangleShape, Shape } from "@/types/canvas";

interface RectangleProps {
  shape: RectangleShape;
  onPointerDown: (e: React.PointerEvent, shape: Shape) => void;
}
const Rectangle = ({ shape, onPointerDown }: RectangleProps) => {
  const { x, y, width, height, fill } = shape;

  return (
    <rect
      className="drop-shadow-md"
      onPointerDown={onPointerDown ? (e) => onPointerDown(e, shape) : undefined}
      style={{
        transform: `translate(${x}px, ${y}px)`
      }}
      x={0}
      y={0}
      width={width}
      height={height}
      strokeWidth={1}
      fill={fill ? colorToCss(fill) : "#000"}
    ></rect>
  );
};

export default Rectangle;
