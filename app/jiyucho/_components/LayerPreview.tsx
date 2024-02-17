"use client";

import { memo } from "react";
import { Layer, LayerType } from "@/types/canvas";
import { colorToCss } from "@/lib/utils";
import Rectangle from "./Rectangle";
import Ellipse from "./Ellipse";
import Path from "./Path";

interface LayerPreviewProps {
  layer: Layer;
  strokeColor: string;
  onPointerDown: (e: React.PointerEvent) => void;
}

const LayerPreview = memo(
  ({ layer, onPointerDown }: LayerPreviewProps) => {
    switch (layer.type) {
      case LayerType.Path:
        return <Path layer={layer} onPointerDown={onPointerDown} />;
      case LayerType.Text:
        return "text";
      case LayerType.Ellipse:
        return <Ellipse layer={layer} onPointerDown={onPointerDown} />;
      case LayerType.Rectangle:
        return (
          <Rectangle layer={layer} onPointerDown={onPointerDown} />
        );
      default:
        console.warn("Unknown layer type");
        return null;
    }
  }
);

LayerPreview.displayName = "LayerPreview";

export default LayerPreview;
