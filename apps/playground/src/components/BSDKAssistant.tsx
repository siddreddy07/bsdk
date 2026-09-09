import { useCallback, useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useLocation } from "react-router-dom";
import type { UIMessage } from "ai";
import { BSDKChat } from "@bsdk/ui";
import { bsdkConfig } from "@/config/bsdk.config";
import AuthPopover from "./auth-popover";
import { getTrySession, getTryMessages, saveTryMessages, getTryChatCount } from "@/lib/try-session";

export default function BSDKAssistant() {
  const { pathname } = useLocation();

  const isTryRoute = pathname === "/try";
  const chatCount = getTryChatCount();

  const [UiMessages] = useState(() => getTryMessages());

  useEffect(() => {
    if (isTryRoute) getTrySession();
  }, [isTryRoute]);

  const handleMessagesChange = useCallback((messages: UIMessage[]) => {
    saveTryMessages(messages);
  }, []);

  const { demoId } = getTrySession();


  const tryConfig = {
    api: import.meta.env.VITE_BSDK_API_URL,
    botId: `demo_${demoId}`,
    botDescription: "",
  };

  const chatConfig = isTryRoute ? tryConfig : bsdkConfig;

  if (!isTryRoute) {
    return <BSDKChat config={chatConfig} position="bottom-right" />;
  }



  return (
    <div>
        <BSDKChat
          config={chatConfig}
          position="bottom-right"
          initialMessages={UiMessages}
          onMessagesChange={handleMessagesChange}
          canSend={chatCount >= 3 ? false : true}
        />


        <div>
                { chatCount > 3 &&

        <div className="ml-4 flex w-72 flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl">
          <span className="flex size-10 items-center justify-center rounded-full bg-[#B8D96A]/15">
            <Heart className="size-5 text-[#B8D96A]" />
          </span>
          <p className="mt-3 text-sm font-semibold text-white">
            Loving BSDK? Try it on your website.
          </p>
          <p className="mt-1 text-xs leading-relaxed text-white/50">
            You&apos;ve explored the demo. Bring BSDK to your own site in minutes.
          </p>
          <div className="mt-4">
            <AuthPopover
              showAvatar={false}
              triggerClassName="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full text-sm font-semibold text-black hover:bg-[#c8e57f]"
            />
          </div>
        </div>

  
                }
        </div>

    </div>
  );
}
