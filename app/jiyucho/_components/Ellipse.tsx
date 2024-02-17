import { colorToCss } from "@/lib/utils";
import { EllipseLayer } from "@/types/canvas";

interface EllipseProps {
  layer: EllipseLayer;
  onPointerDown: (e: React.PointerEvent) => void;
}
const Ellipse = ({ layer, onPointerDown }: EllipseProps) => {
  const { x, y, width, height, fill } = layer;

  return (
    <ellipse
      className="drop-shadow-md"
      onPointerDown={(e) => onPointerDown(e)}
      style={{
        transform: `translate(${x}px, ${y}px)`
      }}
      cx={layer.width / 2}
      cy={layer.height / 2}
      rx={layer.width / 2}
      ry={layer.height / 2}
      strokeWidth={1}
      fill={fill ? colorToCss(fill) : "#000"}
    />
  );
};

export default Ellipse;
