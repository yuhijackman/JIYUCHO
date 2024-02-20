import { Home, Code2, Presentation } from "lucide-react";
import { Tool } from "../jiyucho/_components/Toolbar";
import { CanvasMode } from "@/types/canvas";

export const PRODUCT_ITEMS = [
  {
    title: "Home",
    link: "/",
    icon: Home
  },
  {
    title: "Solved Problems",
    link: "/solved-problems",
    icon: Code2
  },
  {
    title: "Jiyucho",
    link: "/jiyucho/1",
    icon: Presentation
  }
];

export const CANVAS_MODE_BY_TOOL = {
  [Tool.Select]: CanvasMode.None,
  [Tool.Rectangle]: CanvasMode.Adding,
  [Tool.Ellipse]: CanvasMode.Adding,
  [Tool.Pencil]: CanvasMode.Writing,
  [Tool.Text]: CanvasMode.Adding
};
