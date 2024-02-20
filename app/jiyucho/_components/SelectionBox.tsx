import { memo } from "react";
import ShapeScaleHandles, { ShapeScaleHandlesProps } from "./ShapeScaleHandles";
import { getShapesBoundaries } from "@/lib/utils";
import { Shape } from "@/types/canvas";

interface SelectionBoxProps {
  shapes: Shape[];
  onShapeResizeHandleClick: ShapeScaleHandlesProps["onShapeResizeHandleClick"];
}

const SelectionBox = memo(
  ({ shapes, onShapeResizeHandleClick }: SelectionBoxProps) => {
    const isSingleShapeSelected = shapes.length === 1;
    const boundaries = getShapesBoundaries(shapes);

    return (
      <>
        <rect
          className="fill-transparent stroke-orange-600 stroke-1 pointer-events-none"
          style={{
            transform: `translate(${boundaries.x}px, ${boundaries.y}px)`
          }}
          x={0}
          y={0}
          width={boundaries.width}
          height={boundaries.height}
        />
        {isSingleShapeSelected && (
          <ShapeScaleHandles
            boundaries={boundaries}
            onShapeResizeHandleClick={onShapeResizeHandleClick}
          />
        )}
      </>
    );
  }
);

SelectionBox.displayName = "SelectionBox";
export default SelectionBox;