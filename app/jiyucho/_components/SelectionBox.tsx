import { getShapesBoundaries } from "@/lib/utils";
import { Shape } from "@/types/canvas";

interface SelectionBoxProps {
  shapes: Shape[];
}

const HANDLE_WIDTH = 8;

const SelectionBox = ({ shapes }: SelectionBoxProps) => {
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
        <>
          <rect
            className="fill-white stroke-1 stroke-orange-600 cursor-nwse-resize"
            x={0}
            y={0}
            style={{
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `
                translate(
                  ${boundaries.x - HANDLE_WIDTH / 2}px,
                  ${boundaries.y - HANDLE_WIDTH / 2}px
                )
              `
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
            }}
          />
          <rect
            className="fill-white stroke-1 stroke-orange-600 cursor-ns-resize"
            x={0}
            y={0}
            style={{
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `
                translate(
                  ${boundaries.x + boundaries.width / 2 - HANDLE_WIDTH / 2}px, 
                  ${boundaries.y - HANDLE_WIDTH / 2}px
                )
              `
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
            }}
          />
          <rect
            className="fill-white stroke-1 stroke-orange-600 cursor-nesw-resize"
            x={0}
            y={0}
            style={{
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `
                translate(
                  ${boundaries.x - HANDLE_WIDTH / 2 + boundaries.width}px,
                  ${boundaries.y - HANDLE_WIDTH / 2}px
                )`
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
            }}
          />
          <rect
            className="fill-white stroke-1 stroke-orange-600 cursor-ew-resize"
            x={0}
            y={0}
            style={{
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `
                translate(
                  ${boundaries.x - HANDLE_WIDTH / 2 + boundaries.width}px, 
                  ${boundaries.y + boundaries.height / 2 - HANDLE_WIDTH / 2}px
                )`
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
            }}
          />
          <rect
            className="fill-white stroke-1 stroke-orange-600 cursor-nwse-resize"
            x={0}
            y={0}
            style={{
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `
                translate(
                  ${boundaries.x - HANDLE_WIDTH / 2 + boundaries.width}px, 
                  ${boundaries.y - HANDLE_WIDTH / 2 + boundaries.height}px
                )`
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
            }}
          />
          <rect
            className="fill-white stroke-1 stroke-orange-600 cursor-ns-resize"
            x={0}
            y={0}
            style={{
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `
                translate(
                  ${boundaries.x + boundaries.width / 2 - HANDLE_WIDTH / 2}px,
                  ${boundaries.y - HANDLE_WIDTH / 2 + boundaries.height}px
                )`
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
            }}
          />
          <rect
            className="fill-white stroke-1 stroke-orange-600 cursor-nesw-resize"
            x={0}
            y={0}
            style={{
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `
                translate(
                  ${boundaries.x - HANDLE_WIDTH / 2}px,
                  ${boundaries.y - HANDLE_WIDTH / 2 + boundaries.height}px
                )`
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
            }}
          />
          <rect
            className="fill-white stroke-1 stroke-orange-600 cursor-ew-resize"
            x={0}
            y={0}
            style={{
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `
                translate(
                  ${boundaries.x - HANDLE_WIDTH / 2}px,
                  ${boundaries.y - HANDLE_WIDTH / 2 + boundaries.height / 2}px
                )`
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
            }}
          />
        </>
      )}
    </>
  );
};

export default SelectionBox;
