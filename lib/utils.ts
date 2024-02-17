import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Color } from "@/types/canvas";
import { VisibleArea } from "@/types/canvas";
import { nanoid } from 'nanoid'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function colorToCss(color: Color) {
  return `#${color.r.toString(16).padStart(2, "0")}${color.g.toString(16).padStart(2, "0")}${color.b.toString(16).padStart(2, "0")}`;
}

export function pointerEventToCanvasPoint(
  e: React.PointerEvent,
  area: VisibleArea,
) {
  return {
    x: Math.round(e.clientX) - area.x,
    y: Math.round(e.clientY) - area.y,
  };
};

export function getSvgPathFromStroke(points: number[][]) {
  const average = (a: number, b: number) => (a + b) / 2
  const len = points.length

  if (len < 4) {
    return ``
  }

  let a = points[0]
  let b = points[1]
  const c = points[2]

  let result = `M${a[0].toFixed(2)},${a[1].toFixed(2)} Q${b[0].toFixed(2)},${b[1].toFixed(
    2
  )} ${average(b[0], c[0]).toFixed(2)},${average(b[1], c[1]).toFixed(2)} T`

  for (let i = 2, max = len - 1; i < max; i++) {
    a = points[i]
    b = points[i + 1]
    result += `${average(a[0], b[0]).toFixed(2)},${average(a[1], b[1]).toFixed(2)} `
  }

  if (closed) {
    result += 'Z'
  }

  return result
}

export const generateUUID = () => {
  return nanoid()
}