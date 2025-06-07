"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Color } from "@/types/canvas";
import Hint from "./Hint";

function hexToRgb(hex: string) {
  hex = hex.replace(/^#/, "");

  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;
  return { r, g, b };
}

const SOLID_COLORS = [
  "#FFFFFF",
  "#E2E2E2",
  "#ff75c3",
  "#ffa647",
  "#ffe83f",
  "#9fff5b",
  "#70e2ff",
  "#cd93ff",
  "#09203f"
];

export function ColorPicker({
  pickedColor,
  updatePickedColor,
  className
}: {
  pickedColor: Color;
  updatePickedColor: (color: Color) => void;
  className?: string;
}) {
  return (
    <Popover>
      <Hint label="Select Colors">
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn("h-8 w-8 flex items-center rounded-full", className)}
          >
            <div className="flex items-center justify-center">
              <div
                className="h-8 w-8 rounded-full !bg-center !bg-cover transition-all border-[1px] border-black"
                style={{
                  background: `rgb(${pickedColor.r}, ${pickedColor.g}, ${pickedColor.b})`
                }}
              ></div>
            </div>
          </Button>
        </PopoverTrigger>
      </Hint>
      <PopoverContent className="w-52">
        <Tabs defaultValue="solid" className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger className="flex-1" value="solid">
              Solid
            </TabsTrigger>
          </TabsList>

          <TabsContent value="solid" className="flex flex-wrap gap-1 mt-0 p-1">
            {SOLID_COLORS.map((s) => (
              <div
                key={s}
                style={{ background: s }}
                className="rounded-md h-6 w-6 cursor-pointer active:scale-105 border-[1px] border-black"
                onClick={() => updatePickedColor(hexToRgb(s))}
              />
            ))}
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
