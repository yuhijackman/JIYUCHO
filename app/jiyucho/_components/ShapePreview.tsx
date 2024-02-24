"use client";

import { memo } from "react";
import { Shape, ShapeType } from "@/types/canvas";
import Rectangle from "./Rectangle";
import Ellipse from "./Ellipse";
import Path from "./Path";

interface ShapePreviewProps {
  shape: Shape;
  strokeColor: string;
  onPointerDown: (e: React.PointerEvent, shape: Shape) => void;
}

const ShapePreview = memo(({ shape, onPointerDown }: ShapePreviewProps) => {
  switch (shape.type) {
    case ShapeType.Path:
      return <Path shape={shape} onPointerDown={onPointerDown} />;
    case ShapeType.Text:
      return "text";
    case ShapeType.Ellipse:
      return <Ellipse shape={shape} onPointerDown={onPointerDown} />;
    case ShapeType.Rectangle:
      return <Rectangle shape={shape} onPointerDown={onPointerDown} />;
    default:
      console.warn("Unknown shape type");
      return null;
  }
});

ShapePreview.displayName = "ShapePreview";

export default ShapePreview;
