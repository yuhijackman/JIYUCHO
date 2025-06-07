import { Shape, XYWH } from "@/types/canvas";
import { useState } from "react";
export enum ResizeHandleType {
  TopLeft,
  TopCenter,
  TopRight,
  BottomLeft,
  BottomRight,
  BottomCenter,
  MiddleLeft,
  MiddleRight
}

const FORMULAE = {
  [ResizeHandleType.TopLeft]: ["resizeLeft", "resizeTop"],
  [ResizeHandleType.TopCenter]: ["resizeTop"],
  [ResizeHandleType.TopRight]: ["resizeTop", "resizeRight"],
  [ResizeHandleType.MiddleLeft]: ["resizeLeft"],
  [ResizeHandleType.MiddleRight]: ["resizeRight"],
  [ResizeHandleType.BottomLeft]: ["resizeLeft", "resizeBottom"],
  [ResizeHandleType.BottomCenter]: ["resizeBottom"],
  [ResizeHandleType.BottomRight]: ["resizeRight", "resizeBottom"]
};

export const useResizeShape = () => {
  const [resizeHandleType, setResizeHandleType] =
    useState<ResizeHandleType | null>(null);
  const [initialResizeBoundaries, setInitialResizeBoundaries] =
    useState<XYWH | null>(null);

  const calculateXYWHAfterResize = (
    resizeTo: {
      x: number;
      y: number;
    },
    targetShape: Shape
  ) => {
    if (initialResizeBoundaries === null || resizeHandleType === null) {
      return;
    }

    const {
      x: initialX,
      y: initialY,
      width: initialWidth,
      height: initialHeight
    } = initialResizeBoundaries;

    let { x, y, height, width } = targetShape;

    FORMULAE[resizeHandleType].forEach((formula) => {
      if (formula === "resizeLeft") {
        width = Math.abs(initialWidth - (resizeTo.x - initialX));
        x = Math.min(resizeTo.x, initialX + initialWidth);
      }
      if (formula === "resizeRight") {
        x = Math.min(initialX, resizeTo.x);
        width = Math.abs(resizeTo.x - initialX);
      }
      if (formula === "resizeTop") {
        height = Math.abs(initialHeight - (resizeTo.y - initialY));
        y = Math.min(resizeTo.y, initialY + initialHeight);
      }
      if (formula === "resizeBottom") {
        y = Math.min(initialY, resizeTo.y);
        height = Math.abs(resizeTo.y - initialY);
      }
    });

    return {
      x,
      y,
      height,
      width
    };
  };

  const updateResizeHandleType = (type: ResizeHandleType | null) => {
    setResizeHandleType(type);
  };

  const updateInitialBoundaries = (boundaries: XYWH | null) => {
    setInitialResizeBoundaries(boundaries);
  };

  return {
    calculateXYWHAfterResize,
    updateResizeHandleType,
    updateInitialBoundaries
  };
};
