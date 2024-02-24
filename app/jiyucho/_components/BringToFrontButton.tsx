import Hint from "@/components/Hint";
import { Button } from "@/components/ui/button";
import { BringToFrontIcon } from "lucide-react";
interface BringToFrontButtonProps {
  isActive: boolean;
  onClick: () => void;
}

const BringToFront = ({ isActive, onClick }: BringToFrontButtonProps) => {
  return (
    <Hint label="Bring To Front">
      <Button
        variant="primary"
        onClick={onClick}
        size="icon"
        disabled={!isActive}
      >
        <BringToFrontIcon />
      </Button>
    </Hint>
  );
};

export default BringToFront;
