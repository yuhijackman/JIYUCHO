import { memo } from "react";
import { XYWH } from "@/types/canvas";
import { ResizeHandleType } from "@/app/hooks/use-resize-shape";

const HANDLE_WIDTH = 8;

export interface ShapeScaleHandlesProps {
  boundaries: XYWH;
  onShapeResizeHandleClick: (
    resizeHandleType: ResizeHandleType,
    resizeHandlePosition: XYWH
  ) => void;
}

const ShapeScaleHandles = memo(
  ({ boundaries, onShapeResizeHandleClick }: ShapeScaleHandlesProps) => {
    return (
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
            onShapeResizeHandleClick(ResizeHandleType.TopLeft, boundaries);
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
            onShapeResizeHandleClick(ResizeHandleType.TopCenter, boundaries);
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
            onShapeResizeHandleClick(ResizeHandleType.TopRight, boundaries);
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
            onShapeResizeHandleClick(ResizeHandleType.MiddleRight, boundaries);
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
            onShapeResizeHandleClick(ResizeHandleType.BottomRight, boundaries);
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
            onShapeResizeHandleClick(ResizeHandleType.BottomCenter, boundaries);
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
            onShapeResizeHandleClick(ResizeHandleType.BottomLeft, boundaries);
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
            onShapeResizeHandleClick(ResizeHandleType.MiddleLeft, boundaries);
          }}
        />
      </>
    );
  }
);

ShapeScaleHandles.displayName = "ShapeScaleHandles";

export default ShapeScaleHandles;
