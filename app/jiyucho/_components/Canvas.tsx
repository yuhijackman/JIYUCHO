"use client";

import { useCallback, useEffect, useState } from "react";

import Toolbar, { Tool } from "../_components/Toolbar";
import Path from "../_components/Path";
import ShapePreview from "../_components/ShapePreview";
import SelectionBox from '../_components/SelectionBox';
import { VisibleArea, Shape, ShapeType } from "@/types/canvas";
import {generateUUID, pointerPositionInCanvas} from "@/lib/utils";

const Canvas = () => {
  const [currentTool, setCurrentTool] = useState<Tool>(Tool.Select);
  const [visibleArea, setVisibleArea] = useState<VisibleArea>({ x: 0, y: 0 });
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [pencilPoints, setPencilPoints] = useState<number[][] | null>(null);
  const [currentSelectedShapes, setCurrentSelectedShapes] = useState<Shape[]>([])

  useEffect(() => {
    document.body.classList.add("overflow-hidden", "overscroll-none");
    return () => {
      document.body.classList.remove("overflow-hidden", "overscroll-none");
    };
  }, []);
  
  const toolbarClickHandler = (tool: Tool) => {
    setCurrentTool(tool);
  };

  const viewportScrollHandler = useCallback((e: React.WheelEvent) => {
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

  const pointerDownHandler = (e: React.PointerEvent) => {
    const point = pointerPositionInCanvas(e, visibleArea);

    if (currentTool === Tool.Pencil) {
      startDrawing(point, e.pressure)
      return
    }
    
    if (currentTool === Tool.Rectangle) {
      const newShape: Shape = {
          id: generateUUID(),
          type: ShapeType.Rectangle,
          x: point.x,
          y: point.y,
          height: 100,
          width: 100,
          fill: { r: 0, g: 0, b: 0 }
        }
      setShapes([
        ...shapes,
        newShape
      ]);
      setCurrentSelectedShapes([newShape])
      setCurrentTool(Tool.Select);
    }

    if (currentTool === Tool.Ellipse) {
      const newShape: Shape =  {
          id: generateUUID(),
          type: ShapeType.Ellipse,
          x: point.x,
          y: point.y,
          height: 100,
          width: 100,
          fill: { r: 0, g: 0, b: 0 }
        }
      setShapes([
        ...shapes,
        newShape,
      ]);
      setCurrentSelectedShapes([newShape])
      setCurrentTool(Tool.Select);
    }
  }

  const pointerMoveHandler = (e: React.PointerEvent) => {
    e.preventDefault();
    const point = pointerPositionInCanvas(e, visibleArea);

     if (currentTool === Tool.Pencil) {
      continueDrawing(point, e.pressure)
    }
  }

  const addPencilPathToShapes = () => {
    if (pencilPoints === null) return;
    
    const id = generateUUID()

    setShapes([...shapes, {
      id,
      type: ShapeType.Path,
      x: 0,
      y: 0,
      height: 0,
      width: 0,
      fill: { r: 0, g: 0, b: 0 },
      points: pencilPoints
    }])
  }

  const pointerUpHandler = (e: React.PointerEvent) => {
    if (currentTool === Tool.Pencil) {
      addPencilPathToShapes()
      setPencilPoints(null)
    }
  }

  return (
    <div className="h-full bg-neutral-100 touch-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
      <div className="relative h-full">
        <div className="absolute top-[50%] -translate-y-[50%] left-2">
          <Toolbar currentTool={currentTool} onClick={toolbarClickHandler} />
        </div>
        <svg
          className="h-full w-full"
          onPointerDown={pointerDownHandler}
          onPointerMove={pointerMoveHandler}
          onPointerUp={pointerUpHandler}
          onWheel={viewportScrollHandler}
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            id="myGroup"
            style={{
              transform: `translate(${visibleArea.x}px, ${visibleArea.y}px)`
            }}
          >
            {shapes.map((shape) => {
              return (
                <ShapePreview
                  key={shape.id}
                  shape={shape}
                  strokeColor="blue"
                  onPointerDown={(e) => {}}
                />
              );
            })}

            <SelectionBox shapes={currentSelectedShapes} />

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
                onPointerDown={() => {}}
              />
            )}
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Canvas;
