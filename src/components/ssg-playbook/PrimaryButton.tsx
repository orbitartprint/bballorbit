import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

interface PrimaryButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  asChild?: boolean;
}

const PrimaryButton = ({ children, className, onClick, asChild }: PrimaryButtonProps) => {
  const Comp = asChild ? Slot : Button;

  return (
    <Comp
      onClick={onClick}
      className={cn(
        "bg-[#f57520] hover:bg-[#f57520]/90 hover:shadow-lg hover:shadow-[#f57520]/20 text-white font-bold text-lg px-8 py-6 h-auto rounded-xl transition-all duration-200 inline-flex items-center justify-center",
        className
      )}
    >
      {children}
    </Comp>
  );
};

export default PrimaryButton;
