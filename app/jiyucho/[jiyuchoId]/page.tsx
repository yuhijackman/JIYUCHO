"use client";

import { useState } from "react";
import Toolbar, { Tool } from "../_components/Toolbar";

const JiyuchoPage = () => {
  const [currentTool, setCurrentTool] = useState<Tool>(Tool.Select);
  const toolbarClickHandler = (tool: Tool) => {
    setCurrentTool(tool);
  };

  return (
    <div className="h-full bg-neutral-100 touch-none">
      <div className="relative h-full">
        <div className="absolute top-[50%] -translate-y-[50%] left-2">
          <Toolbar currentTool={currentTool} onClick={toolbarClickHandler} />
        </div>
      </div>
    </div>
  );
};

export default JiyuchoPage;
