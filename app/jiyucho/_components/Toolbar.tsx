import { ColorPicker } from "@/components/ColorPicker";
import { Button } from "@/components/ui/button";
import { Color } from "@/types/canvas";
import { Square, Circle, Type, Pencil, MousePointer2 } from "lucide-react";
import SendBackToButton from "./SendToBackButton";
import BringToFrontButton from "./BringToFrontButton";
import DeleteButton from "./DeleteButton";

export enum Tool {
  Select,
  Ellipse,
  Rectangle,
  Pencil,
  Text
}

export interface ToolbarProps {
  currentTool: Tool;
  currentFillColor: Color;
  isXOrderSwapButtonActive: boolean;
  isDeleteButtonActive: boolean;
  onClick: (tool: Tool) => void;
  setFillColor: (color: Color) => void;
  onBringToFrontClick: () => void;
  onSendBackToClick: () => void;
  onDeleteClick: () => void;
}

const TOOLBAR_ITEMS = [
  { icon: <MousePointer2 />, tool: Tool.Select },
  { icon: <Circle />, tool: Tool.Ellipse },
  { icon: <Square />, tool: Tool.Rectangle },
  { icon: <Pencil />, tool: Tool.Pencil },
  { icon: <Type />, tool: Tool.Text }
];

const Toolbar = ({
  currentTool,
  currentFillColor,
  isXOrderSwapButtonActive,
  isDeleteButtonActive,
  onClick,
  setFillColor,
  onBringToFrontClick,
  onSendBackToClick,
  onDeleteClick
}: ToolbarProps) => {
  return (
    <>
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

      <div className="p-1.5 bg-white rounded-md items-center shadow-md flex flex-col mt-2 gap-y-2">
        <ColorPicker
          pickedColor={currentFillColor}
          updatePickedColor={setFillColor}
        />
        <BringToFrontButton
          onClick={onBringToFrontClick}
          isActive={isXOrderSwapButtonActive}
        />
        <SendBackToButton
          onClick={onSendBackToClick}
          isActive={isXOrderSwapButtonActive}
        />
        <DeleteButton onClick={onDeleteClick} isActive={isDeleteButtonActive} />
      </div>
    </>
  );
};

export default Toolbar;
