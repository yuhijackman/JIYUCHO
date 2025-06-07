import { colorToCss } from "@/lib/utils";
import { EllipseShape, Shape } from "@/types/canvas";

interface EllipseProps {
  shape: EllipseShape;
  onPointerDown: (e: React.PointerEvent, shape: Shape) => void;
}
const Ellipse = ({ shape, onPointerDown }: EllipseProps) => {
  const { x, y, width, height, fill } = shape;

  return (
    <ellipse
      className="drop-shadow-md"
      onPointerDown={onPointerDown ? (e) => onPointerDown(e, shape) : undefined}
      style={{
        transform: `translate(${x}px, ${y}px)`
      }}
      cx={width / 2}
      cy={height / 2}
      rx={width / 2}
      ry={height / 2}
      strokeWidth={1}
      fill={fill ? colorToCss(fill) : "#000"}
    />
  );
};

export default Ellipse;
