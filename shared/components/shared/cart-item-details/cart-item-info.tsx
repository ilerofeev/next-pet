import { cn } from "@/shared/lib";

interface Props {
  name: string;
  details: string;
  className?: string;
}

export const CartItemInfo: React.FC<Props> = ({ name, details, className }) => {
  return (
    <div className={cn("flex flex-col flex-1", className)}>
      <h2 className="text-lg font-bold flex-1 leading-6">{name}</h2>
      {details && (
        <p className="text-xs text-gray-400 max-w-[90%]">{details}</p>
      )}
    </div>
  );
};
