"use client";

import { useCallback, useState } from "react";

import Toolbar, { Tool } from "../_components/Toolbar";
import Path from "../_components/Path";
import LayerPreview from "../_components/LayerPreview";
import { VisibleArea, Layer, LayerType, Point } from "@/types/canvas";
import {generateUUID, pointerEventToCanvasPoint} from "@/lib/utils";

const Canvas = () => {
  const [currentTool, setCurrentTool] = useState<Tool>(Tool.Select);
  const [visibleArea, setVisibleArea] = useState<VisibleArea>({ x: 0, y: 0 });
  const [layers, setLayers] = useState<Layer[]>([
    {
      id: "1",
      type: LayerType.Rectangle,
      x: 10,
      y: 10,
      height: 100,
      width: 100,
      fill: { r: 0, g: 0, b: 0 }
    },
    {
      id: "2",
      type: LayerType.Ellipse,
      x: 200,
      y: 200,
      height: 100,
      width: 100,
      fill: { r: 0, g: 0, b: 0 }
    }
  ]);
  const [pencilPoints, setPencilPoints] = useState<number[][] | null>(null);

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
    const point = pointerEventToCanvasPoint(e, visibleArea);
    if (currentTool === Tool.Pencil) {
      startDrawing(point, e.pressure)
    }
  }

  const pointerMoveHandler = (e: React.PointerEvent) => {
    const point = pointerEventToCanvasPoint(e, visibleArea);

     if (currentTool === Tool.Pencil) {
      continueDrawing(point, e.pressure)
    }
  }

  const pencilPathToLayer = () => {
    if (pencilPoints === null) return;
    
    const id = generateUUID()

    setLayers([...layers, {
      id,
      type: LayerType.Path,
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
      pencilPathToLayer()
      setPencilPoints(null)
    }
  }

  return (
    <div className="h-full bg-neutral-100 touch-none">
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
            {layers.map((layer) => {
              return (
                <LayerPreview
                  key={layer.id}
                  layer={layer}
                  strokeColor="blue"
                  onPointerDown={(e) => {}}
                />
              );
            })}

            {pencilPoints && pencilPoints.length > 0 && (
              <Path
                layer={{
                  id: "pencil",
                  type: LayerType.Path,
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
