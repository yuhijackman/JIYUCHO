"use client";

import { useCallback, useEffect, useState } from "react";

import Toolbar, { Tool } from "../_components/Toolbar";
import Path from "../_components/Path";
import ShapePreview from "../_components/ShapePreview";
import SelectionBox from "../_components/SelectionBox";
import {
  VisibleArea,
  Shape,
  ShapeType,
  CanvasMode,
  XYWH,
  Color
} from "@/types/canvas";
import { generateUUID, pointerPositionInCanvas } from "@/lib/utils";
import { CANVAS_MODE_BY_TOOL } from "@/app/config";
import { useResizeShape, ResizeHandleType } from "@/app/hooks/use-resize-shape";
import { Button } from "@/components/ui/button";

export type Shapes = Map<Shape["id"], Shape>;

const Canvas = () => {
  const [currentTool, setCurrentTool] = useState<Tool>(Tool.Select);
  const [currentFillColor, setCurrentFillColor] = useState<Color>({
    r: 0,
    g: 0,
    b: 0
  });
  const [visibleArea, setVisibleArea] = useState<VisibleArea>({ x: 0, y: 0 });
  const [shapes, setShapes] = useState<Shapes>(new Map());
  const [currentSelectedShapeIds, setCurrentSelectedShapeIds] = useState<
    Shape["id"][]
  >([]);
  const [currentCanvasMode, setCurrentCanvasMode] = useState<CanvasMode>(
    CanvasMode.None
  );
  const [pencilPoints, setPencilPoints] = useState<number[][] | null>(null);
  const currentSelectedShapes = currentSelectedShapeIds
    .map((id) => shapes.get(id))
    .filter((shape) => shape !== undefined) as Shape[];
  const [eventOccuredPoint, setEventOccuredPoint] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [maskedRange, setMaskedRange] = useState<{
    from: { x: number; y: number };
    to: { x: number; y: number };
  }>({ from: { x: 0, y: 0 }, to: { x: 0, y: 0 } });
  const isSomeRangeMaked =
    maskedRange.from.x !== maskedRange.to.x &&
    maskedRange.from.y !== maskedRange.to.y;
  const isShapeZOrderSwappable = currentSelectedShapeIds.length === 1;

  const {
    calculateXYWHAfterResize,
    updateResizeHandleType,
    updateInitialBoundaries
  } = useResizeShape();

  useEffect(() => {
    document.body.classList.add("overflow-hidden", "overscroll-none");
    return () => {
      document.body.classList.remove("overflow-hidden", "overscroll-none");
    };
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [shapes, currentSelectedShapeIds, currentCanvasMode]);

  const toolSelectedHandler = (tool: Tool) => {
    const canvasMode = CANVAS_MODE_BY_TOOL[tool];
    setCurrentCanvasMode(canvasMode);
    setCurrentTool(tool);
    setCurrentSelectedShapeIds([]);
  };

  const canvasWheelHandler = useCallback((e: React.WheelEvent) => {
    setVisibleArea((area) => {
      return {
        x: area.x - e.deltaX,
        y: area.y - e.deltaY
      };
    });
  }, []);

  const startDrawing = (
    point: VisibleArea,
    pressure: React.PointerEvent["pressure"]
  ) => {
    setPencilPoints([[point.x, point.y, pressure]]);
  };

  const continueDrawing = (
    point: VisibleArea,
    pressure: React.PointerEvent["pressure"]
  ) => {
    if (pencilPoints === null) return;
    setPencilPoints([...pencilPoints, [point.x, point.y, pressure]]);
  };

  const resizeHandler = (resizeTo: { x: number; y: number }) => {
    if (
      currentSelectedShapeIds.length !== 1 ||
      currentCanvasMode !== CanvasMode.Resizing
    )
      return;
    const updatedShapes = new Map(shapes);
    const currentSelectedShape = updatedShapes.get(currentSelectedShapeIds[0]);
    if (!currentSelectedShape) return;

    const result = calculateXYWHAfterResize(resizeTo, currentSelectedShape);
    if (result !== undefined) {
      currentSelectedShape.x = result.x;
      currentSelectedShape.y = result.y;
      currentSelectedShape.width = result.width;
      currentSelectedShape.height = result.height;
      setShapes(updatedShapes);
    }
  };

  const pointerDownOnSelectionBox = (e: React.PointerEvent) => {
    if (currentCanvasMode !== CanvasMode.None) {
      return;
    }
    e.stopPropagation();
    setCurrentCanvasMode(CanvasMode.Moving);
  };

  const pointerDownOnShapeHandler = (e: React.PointerEvent, shape: Shape) => {
    if (
      currentCanvasMode === CanvasMode.Writing ||
      currentCanvasMode === CanvasMode.Adding
    ) {
      return;
    }
    e.stopPropagation();
    const point = pointerPositionInCanvas(e, visibleArea);
    setEventOccuredPoint(point);
    if (currentTool === Tool.Select) {
      setCurrentCanvasMode(CanvasMode.Moving);
      setCurrentSelectedShapeIds([shape.id]);
    }
  };

  const pointerUpHandler = (e: React.PointerEvent) => {
    if (currentCanvasMode === CanvasMode.Writing) {
      addPencilPathToShapes();
      setPencilPoints(null);
      return;
    }

    const point = pointerPositionInCanvas(e, visibleArea);
    if (currentCanvasMode === CanvasMode.Adding) {
      const shapeType =
        currentTool === Tool.Rectangle
          ? ShapeType.Rectangle
          : ShapeType.Ellipse;
      const newShape: Shape = {
        id: generateUUID(),
        type: shapeType,
        x: point.x,
        y: point.y,
        height: 100,
        width: 100,
        fill: currentFillColor,
        zIndex: shapes.size
      };
      addShape(newShape);
      setCurrentSelectedShapeIds([newShape.id]);
      setCurrentTool(Tool.Select);
      setCurrentCanvasMode(CanvasMode.None);
      return;
    } else {
      setCurrentCanvasMode(CanvasMode.None);
      updateResizeHandleType(null);
      updateInitialBoundaries(null);
      setEventOccuredPoint(null);
    }
  };

  const pointerDownHandler = (e: React.PointerEvent) => {
    const point = pointerPositionInCanvas(e, visibleArea);

    if (currentCanvasMode === CanvasMode.Writing) {
      startDrawing(point, e.pressure);
      return;
    }

    if (currentCanvasMode === CanvasMode.Adding) {
      return;
    }
    setEventOccuredPoint(point);
    setCurrentCanvasMode(CanvasMode.Pressing);
    setMaskedRange({ from: { x: 0, y: 0 }, to: { x: 0, y: 0 } });
    setCurrentSelectedShapeIds([]);
  };

  const pointerMoveHandler = (e: React.PointerEvent) => {
    e.preventDefault();
    const point = pointerPositionInCanvas(e, visibleArea);

    if (currentCanvasMode === CanvasMode.Writing) {
      continueDrawing(point, e.pressure);
    } else if (currentCanvasMode === CanvasMode.Resizing) {
      resizeHandler(point);
    } else if (currentCanvasMode === CanvasMode.Moving) {
      moveShapes(point);
    } else if (currentCanvasMode === CanvasMode.Pressing) {
      if (eventOccuredPoint) {
        maskRange(eventOccuredPoint, point);
        setCurrentCanvasMode(CanvasMode.MultiSelecting);
      }
    } else if (currentCanvasMode === CanvasMode.MultiSelecting) {
      if (eventOccuredPoint) {
        maskRange(eventOccuredPoint, point);
      }
    }
  };

  const selectShapesInsideMask = () => {
    const selectedShapes = Array.from(shapes).filter(([_id, shape]) => {
      const minimumX = Math.min(maskedRange.from.x, maskedRange.to.x);
      const maximumX = Math.max(maskedRange.from.x, maskedRange.to.x);
      const minimumY = Math.min(maskedRange.from.y, maskedRange.to.y);
      const maximumY = Math.max(maskedRange.from.y, maskedRange.to.y);
      let isShapeXInsideMask = minimumX < shape.x && shape.x < maximumX;
      let isShapeYInsideMask = minimumY < shape.y && shape.y < maximumY;
      let isShapeXCrossingMask =
        shape.x < minimumX && minimumX < shape.x + shape.width;
      let isShapeYCrossingMask =
        maximumY < shape.y && shape.y + shape.height < maximumY;

      if (
        (isShapeXInsideMask && isShapeYInsideMask) ||
        (isShapeXCrossingMask && isShapeYCrossingMask)
      ) {
        return true;
      }
    });
    setCurrentSelectedShapeIds(selectedShapes.map(([id, _shape]) => id));
  };

  const maskRange = (
    maskFrom: { x: number; y: number },
    maskTo: { x: number; y: number }
  ) => {
    setMaskedRange({
      from: maskFrom,
      to: maskTo
    });
    selectShapesInsideMask();
  };

  const moveShapes = (moveTo: { x: number; y: number }) => {
    const updatedShapes = new Map(shapes);
    currentSelectedShapeIds.map((id) => {
      const target = updatedShapes.get(id);
      if (target && eventOccuredPoint) {
        target.x = target.x + (moveTo.x - eventOccuredPoint.x);
        target.y = target.y + (moveTo.y - eventOccuredPoint.y);
      }
    });
    setEventOccuredPoint(moveTo);
    setShapes(updatedShapes);
  };

  const addPencilPathToShapes = () => {
    if (pencilPoints === null) return;

    let left = Infinity;
    let top = Infinity;
    let right = -Infinity;
    let bottom = -Infinity;

    for (let point of pencilPoints) {
      let [x, y] = point;
      if (left > x) {
        left = x;
      }

      if (top > y) {
        top = y;
      }

      if (x > right) {
        right = x;
      }

      if (y > bottom) {
        bottom = y;
      }
    }

    addShape({
      id: generateUUID(),
      type: ShapeType.Path,
      x: left,
      y: top,
      width: right - left,
      height: bottom - top,
      fill: currentFillColor,
      points: pencilPoints.map(([x, y, pressure]) => [
        x - left,
        y - top,
        pressure
      ]),
      zIndex: shapes.size + 1
    });
  };

  const addShape = (newShape: Shape) => {
    setShapes((prevShapes) => {
      const updatedShapes = new Map(prevShapes);
      updatedShapes.set(newShape.id, newShape);
      return updatedShapes;
    });
  };

  const bringToFront = (shapeId: Shape["id"]) => {
    setShapes((prevShapes) => {
      const newShapes = new Map(prevShapes);
      const shape = newShapes.get(shapeId);
      if (shape) {
        let maxZIndex = -Infinity;
        newShapes.forEach((value, _) => {
          if (value.zIndex > maxZIndex) {
            maxZIndex = value.zIndex;
          }
        });
        shape.zIndex = maxZIndex + 1;
        newShapes.set(shapeId, shape);
      }
      return newShapes;
    });
  };

  const sendToBack = (shapeId: Shape["id"]) => {
    setShapes((prevShapes) => {
      const newShapes = new Map(prevShapes);
      const shape = newShapes.get(shapeId);
      if (shape) {
        let minZIndex = Infinity;
        newShapes.forEach((value, _) => {
          if (value.zIndex < minZIndex) {
            minZIndex = value.zIndex;
          }
        });
        shape.zIndex = minZIndex - 1;
        newShapes.set(shapeId, shape);
      }
      return newShapes;
    });
  };

  const shapeResizeClickHandler = (
    type: ResizeHandleType,
    boundaries: XYWH
  ) => {
    setCurrentCanvasMode(CanvasMode.Resizing);
    updateResizeHandleType(type);
    updateInitialBoundaries(boundaries);
  };

  const currentFillColorSetHandler = (color: Color) => {
    setCurrentFillColor(color);

    if (currentSelectedShapeIds.length > 0) {
      const updatedShapes = new Map(shapes);
      currentSelectedShapeIds.map((id) => {
        const target = updatedShapes.get(id);
        if (target) {
          target.fill = color;
        }
      });
      setShapes(updatedShapes);
    }
  };

  const deleteSelectedShapes = () => {
    if (currentSelectedShapeIds.length === 0) return;
    const updatedShapes = new Map(shapes);
    currentSelectedShapeIds.map((id) => {
      updatedShapes.delete(id);
    });
    setCurrentSelectedShapeIds([]);
    setShapes(updatedShapes);
  };

  const keyDownHandler = (e: KeyboardEvent) => {
    const key = e.key;
    if (key === "Backspace" || key === "Delete") {
      deleteSelectedShapes();
    }
  };

  return (
    <div className="h-full bg-neutral-100 touch-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
      <div className="relative h-full">
        <div className="absolute top-[50%] -translate-y-[50%] left-2">
          <Toolbar
            currentTool={currentTool}
            currentFillColor={currentFillColor}
            isXOrderSwapButtonActive={isShapeZOrderSwappable}
            isDeleteButtonActive={currentSelectedShapeIds.length > 0}
            onClick={toolSelectedHandler}
            setFillColor={currentFillColorSetHandler}
            onBringToFrontClick={() => bringToFront(currentSelectedShapeIds[0])}
            onSendBackToClick={() => sendToBack(currentSelectedShapeIds[0])}
            onDeleteClick={deleteSelectedShapes}
          />
        </div>
        <svg
          className="h-full w-full"
          onPointerDown={pointerDownHandler}
          onPointerMove={pointerMoveHandler}
          onPointerUp={pointerUpHandler}
          onWheel={canvasWheelHandler}
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            id="myGroup"
            style={{
              transform: `translate(${visibleArea.x}px, ${visibleArea.y}px)`
            }}
          >
            {Array.from(shapes)
              .sort(
                ([_shapeAId, shapeA], [_shapeBId, shapeB]) =>
                  shapeA.zIndex - shapeB.zIndex
              )
              .map(([id, shape]) => {
                return (
                  <ShapePreview
                    key={id}
                    shape={shape}
                    strokeColor="blue"
                    onPointerDown={pointerDownOnShapeHandler}
                  />
                );
              })}

            <SelectionBox
              shapes={currentSelectedShapes}
              onShapeResizeHandleClick={shapeResizeClickHandler}
              onSelectionBoxPointerDown={pointerDownOnSelectionBox}
            />

            {isSomeRangeMaked &&
              currentCanvasMode === CanvasMode.MultiSelecting && (
                <rect
                  className="fill-orange-500/5 stroke-orange-600 stroke-1 pointer-events-none z-50"
                  x={Math.min(maskedRange.from.x, maskedRange.to.x)}
                  y={Math.min(maskedRange.from.y, maskedRange.to.y)}
                  width={Math.abs(maskedRange.to.x - maskedRange.from.x)}
                  height={Math.abs(maskedRange.to.y - maskedRange.from.y)}
                />
              )}
            {pencilPoints && pencilPoints.length > 0 && (
              <Path
                shape={{
                  id: "pencil",
                  type: ShapeType.Path,
                  x: 0,
                  y: 0,
                  height: 0,
                  width: 0,
                  fill: currentFillColor,
                  points: pencilPoints,
                  zIndex: shapes.size + 1
                }}
              />
            )}
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Canvas;
