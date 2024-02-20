"use client";

import { useCallback, useEffect, useState } from "react";

import Toolbar, { Tool } from "../_components/Toolbar";
import Path from "../_components/Path";
import ShapePreview from "../_components/ShapePreview";
import SelectionBox from '../_components/SelectionBox';
import { VisibleArea, Shape, ShapeType, CanvasMode, XYWH } from "@/types/canvas";
import {generateUUID, pointerPositionInCanvas} from "@/lib/utils";
import { CANVAS_MODE_BY_TOOL } from "@/app/config";
import { useResizeShape, ResizeHandleType } from "@/app/hooks/use-resize-shape";

export type Shapes = Map<Shape['id'], Shape>

const Canvas = () => {
  const [currentTool, setCurrentTool] = useState<Tool>(Tool.Select);
  const [visibleArea, setVisibleArea] = useState<VisibleArea>({ x: 0, y: 0 });
  const [shapes, setShapes] = useState<Shapes>(new Map());
  const [currentSelectedShapeIds, setCurrentSelectedShapeIds] = useState<Shape['id'][]>([])
  const [currentCanvasMode, setCurrentCanvasMode] = useState<CanvasMode>(CanvasMode.None);
  const [pencilPoints, setPencilPoints] = useState<number[][] | null>(null);
  const currentSelectedShapes = currentSelectedShapeIds.map((id) => shapes.get(id)).filter((shape) => shape !== undefined) as Shape[]

  const {calculateXYWHAfterResize,
    updateResizeHandleType,
    updateInitialBoundaries} = useResizeShape()

  useEffect(() => {
    document.body.classList.add("overflow-hidden", "overscroll-none");
    return () => {
      document.body.classList.remove("overflow-hidden", "overscroll-none");
    };
  }, []);

  const toolSelectedHandler = (tool: Tool) => {
    const canvasMode = CANVAS_MODE_BY_TOOL[tool]
    setCurrentCanvasMode(canvasMode)
    setCurrentTool(tool);
  };

  const canvasWheelHandler = useCallback((e: React.WheelEvent) => {
    setVisibleArea((area) => {
      return {
        x: area.x - e.deltaX,
        y: area.y - e.deltaY
      };
    });
  }, []);

  const startDrawing = (point: VisibleArea, pressure: React.PointerEvent['pressure']) => {
    setPencilPoints([[point.x, point.y, pressure]]);
  }

  const continueDrawing = (point: VisibleArea, pressure: React.PointerEvent['pressure']) => {
    if (pencilPoints === null) return;
    setPencilPoints([...pencilPoints, [point.x, point.y, pressure]]);
  }

  const resizeHandler = (resizeTo: {x: number, y: number}) => {
    if (currentSelectedShapeIds.length !== 1 || currentCanvasMode !== CanvasMode.Resizing) return
    const updatedShapes = new Map(shapes);
    const currentSelectedShape = updatedShapes.get(currentSelectedShapeIds[0])
    if (!currentSelectedShape) return

    const result = calculateXYWHAfterResize(resizeTo, currentSelectedShape)
    if (result !== undefined) {
      currentSelectedShape.x = result.x
      currentSelectedShape.y = result.y
      currentSelectedShape.width = result.width
      currentSelectedShape.height = result.height
      setShapes(updatedShapes)
    }
  }

  const pointerDownOnShapeHandler = (e: React.PointerEvent, shape: Shape) => {
    e.stopPropagation();

    if (currentTool === Tool.Select) {
      setCurrentCanvasMode(CanvasMode.Moving)
      setCurrentSelectedShapeIds([shape.id])
    }
  }

  const pointerUpHandler = (e: React.PointerEvent) => {
    if (currentCanvasMode === CanvasMode.Writing) {
      addPencilPathToShapes()
      setPencilPoints(null)
      return
    }

    const point = pointerPositionInCanvas(e, visibleArea);
    if (currentCanvasMode === CanvasMode.Adding) {
      const shapeType = currentTool === Tool.Rectangle ? ShapeType.Rectangle : ShapeType.Ellipse;
      const newShape: Shape = {
        id: generateUUID(),
        type: shapeType,
        x: point.x,
        y: point.y,
        height: 100,
        width: 100,
        fill: { r: 0, g: 0, b: 0 }
      }
      if (!shapes.has(newShape.id)) {
        const updatedShape = new Map(shapes)
        updatedShape.set(newShape.id, newShape);
        setShapes(updatedShape);
        setCurrentSelectedShapeIds([newShape.id])
        setCurrentTool(Tool.Select);
        setCurrentCanvasMode(CanvasMode.None)
      }
      return
    } else  {
      setCurrentCanvasMode(CanvasMode.None)
      updateResizeHandleType(null)
      updateInitialBoundaries(null)
    }
  }

  const pointerDownHandler = (e: React.PointerEvent) => {
    const point = pointerPositionInCanvas(e, visibleArea);

    if (currentCanvasMode === CanvasMode.Writing) {
      startDrawing(point, e.pressure)
      return
    }
    
    if (currentCanvasMode === CanvasMode.Adding) {
      return
    }

    setCurrentCanvasMode(CanvasMode.Pressing)
  }

  const pointerMoveHandler = (e: React.PointerEvent) => {
    e.preventDefault();
    const point = pointerPositionInCanvas(e, visibleArea);

     if (currentCanvasMode === CanvasMode.Writing) {
      continueDrawing(point, e.pressure)
    } else if (currentCanvasMode === CanvasMode.Resizing) {
      resizeHandler(point)
    } else if (currentCanvasMode === CanvasMode.Moving) {
      if (currentSelectedShapeIds.length === 1) {
        const updatedShapes = new Map(shapes);
        const currentSelectedShape = updatedShapes.get(currentSelectedShapeIds[0])
        if (currentSelectedShape) {
          currentSelectedShape.x = point.x
          currentSelectedShape.y = point.y
          setShapes(updatedShapes)
        }
      }
    
    }
  }

  const addPencilPathToShapes = () => {
    if (pencilPoints === null) return;
    
    const id = generateUUID()

    const updatedShape = new Map(shapes)
    updatedShape.set(id, {
      id,
      type: ShapeType.Path,
      x: 0,
      y: 0,
      height: 0,
      width: 0,
      fill: { r: 0, g: 0, b: 0 },
      points: pencilPoints
    });
    setShapes(updatedShape);
  }

  const shapeResizeClickHandler = (type: ResizeHandleType, boundaries: XYWH) => {
    setCurrentCanvasMode(CanvasMode.Resizing)
    updateResizeHandleType(type)
    updateInitialBoundaries(boundaries)
  }

  return (
    <div className="h-full bg-neutral-100 touch-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
      <div className="relative h-full">
        <div className="absolute top-[50%] -translate-y-[50%] left-2">
          <Toolbar currentTool={currentTool} onClick={toolSelectedHandler} />
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
            {Array.from(shapes).map(([_id, shape]) => {
              return (
                <ShapePreview
                  key={shape.id}
                  shape={shape}
                  strokeColor="blue"
                  onPointerDown={pointerDownOnShapeHandler}
                />
              );
            })}

            <SelectionBox shapes={currentSelectedShapes} onShapeResizeHandleClick={shapeResizeClickHandler}   />

            {pencilPoints && pencilPoints.length > 0 && (
              <Path
                shape={{
                  id: "pencil",
                  type: ShapeType.Path,
                  x: 0,
                  y: 0,
                  height: 0,
                  width: 0,
                  fill: { r: 0, g: 0, b: 0 },
                  points: pencilPoints
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
