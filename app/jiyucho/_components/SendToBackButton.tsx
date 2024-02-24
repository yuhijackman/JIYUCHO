import { Button } from "@/components/ui/button";
import { SendToBack } from "lucide-react";
import Hint from "@/components/Hint";

interface SendToBackButtonProps {
  isActive: boolean;
  onClick: () => void;
}

const SendBackToButton = ({ isActive, onClick }: SendToBackButtonProps) => {
  return (
    <Hint label="Send To Back">
      <Button
        variant="primary"
        onClick={onClick}
        size="icon"
        disabled={!isActive}
      >
        <SendToBack />
      </Button>
    </Hint>
  );
};

export default SendBackToButton;
