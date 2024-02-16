import { Button } from "@/components/ui/button";
import { Square, Circle, Type, Pencil, MousePointer2 } from "lucide-react";
export enum Tool {
  Select,
  Ellipse,
  Rectangle,
  Path,
  Text
}

export interface ToolbarProps {
  currentTool: Tool;
  onClick: (tool: Tool) => void;
}

const TOOLBAR_ITEMS = [
  { icon: <MousePointer2 />, tool: Tool.Select },
  { icon: <Circle />, tool: Tool.Ellipse },
  { icon: <Square />, tool: Tool.Rectangle },
  { icon: <Pencil />, tool: Tool.Path },
  { icon: <Type />, tool: Tool.Text }
];

const Toolbar = ({ currentTool, onClick }: ToolbarProps) => {
  return (
    <div className="p-1.5 bg-white rounded-md items-center shadow-md flex flex-col gap-y-2">
      {TOOLBAR_ITEMS.map((item) => (
        <Button
          key={item.tool}
          variant={currentTool === item.tool ? "primaryActive" : "primary"}
          onClick={() => onClick(item.tool)}
          size="icon"
        >
          {item.icon}
        </Button>
      ))}
    </div>
  );
};

export default Toolbar;
