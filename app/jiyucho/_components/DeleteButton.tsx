import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
interface DeleteButtonProps {
  isActive: boolean;
  onClick: () => void;
}

const DeleteButton = ({ onClick, isActive }: DeleteButtonProps) => {
  return (
    <Button
      variant="primary"
      onClick={onClick}
      size="icon"
      disabled={!isActive}
    >
      <Trash2 />
    </Button>
  );
};

export default DeleteButton;
