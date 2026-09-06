import type { ReactNode } from "react";
import { PopoverHeader, PopoverTitle } from "../components/ui/popover";

const ChatHeader = ({
  title = "BSDK Chat",
  icon,
  iconImg,
  status = "Online",
}: {
  title?: string;
  icon?: ReactNode;
  iconImg?: string;
  status?: string;
}) => {
  return (
    <PopoverHeader className="border-border/60 border-b pb-2.5">
      <div className="flex items-center justify-between">
        <PopoverTitle className="flex items-center gap-1.5 text-sm">
          {iconImg ? (
            <img src={iconImg} alt="" className="size-4 rounded-full" />
          ) : (
            icon ?? <span className="size-1.5 rounded-full bg-primary" />
          )}
          {title}
        </PopoverTitle>
        <span className="text-muted-foreground text-xs">{status}</span>
      </div>
    </PopoverHeader>
  );
};

export default ChatHeader;
