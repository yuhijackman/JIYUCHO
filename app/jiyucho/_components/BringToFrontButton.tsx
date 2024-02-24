import { Button } from "@/components/ui/button";
import { BringToFrontIcon } from "lucide-react";
interface BringToFrontButtonProps {
  isActive: boolean;
  onClick: () => void;
}

const BringToFront = ({ isActive, onClick }: BringToFrontButtonProps) => {
  return (
    <Button
      variant="primary"
      onClick={onClick}
      size="icon"
      disabled={!isActive}
    >
      <BringToFrontIcon />
    </Button>
  );
};

export default BringToFront;
