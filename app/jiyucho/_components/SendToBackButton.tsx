import { Button } from "@/components/ui/button";
import { SendToBack } from "lucide-react";
import { cn } from "@/lib/utils";
interface SendToBackButtonProps {
  isActive: boolean;
  onClick: () => void;
}

const SendBackToButton = ({ isActive, onClick }: SendToBackButtonProps) => {
  return (
    <Button
      variant="primary"
      onClick={onClick}
      size="icon"
      disabled={!isActive}
    >
      <SendToBack />
    </Button>
  );
};

export default SendBackToButton;
