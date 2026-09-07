import { useState, type FormEvent, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { SendHorizontal } from "lucide-react";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "../components/ui/message-scroller";
import { Message, MessageContent } from "../components/ui/message";
import ChatHeader from "./ChatHeader";
import type { BSDKChatProps, BSDKChatTheme } from "./types";

const ChatEmptyState = ({
  welcomeText
}: {
  welcomeText: string;
}) => {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-1 text-center">
      <p className="text-muted-foreground/60 text-base font-medium">Hi, we&apos;re live</p>
      <p className="text-muted-foreground/40 text-xs">
        {welcomeText}
      </p>
    </div>
  );
};

const ChatContent = ({
  messages,
  welcomeText,
  theme,
  status,
  error,
}: {
  messages: Array<{ id: string; role: "user" | "assistant" | "system"; parts: Array<{ type: string; [key: string]: unknown }> }>;
  welcomeText: string;
  theme?: BSDKChatTheme;
  status: string
  error?:Error

}) => {
  if (messages.length === 0) {
    return <ChatEmptyState welcomeText={welcomeText} />;
  }
  
const isGenerating =
  status === "submitted" || status === "streaming"

  const bubbleClass = (role: "user" | "assistant") =>
    theme?.bubble?.(role) ??
    (role === "user"
      ? "bg-[#84cc16] text-white font-semibold dark:bg-[#a5cd4a] dark:text-zinc-900"
      : "bg-zinc-200 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-100");

  return (
    <MessageScrollerProvider autoScroll scrollPreviousItemPeek={32}>
      <MessageScroller>
        <MessageScrollerViewport>
          <MessageScrollerContent>
            {messages.map((message) => (

              
              <MessageScrollerItem
                key={message.id}
                messageId={message.id}
                scrollAnchor={message.role === "user"}
                className="px-1.5 py-0.5"
              >
                <Message align={message.role === "user" ? "end" : "start"}>
                  <MessageContent>
                    <div
                      data-slot="message-bubble"
                      className={`rounded-lg px-3 py-1.5 text-sm ${
                        bubbleClass(message.role === "user" ? "user" : "assistant")
                      }`}
                    >
                      {message.parts
                        .filter((part) => part.type === "text")
                        .map((part, i) => (

                          <div
  key={i}
  className="
  markdown
  prose prose-sm
  max-w-none min-w-0
  break-words

  /* Paragraphs */
  [&_p]:my-1.5
  [&_p]:leading-relaxed

  /* Headings */
  [&_h1]:mt-4 [&_h1]:mb-2 [&_h1]:text-lg [&_h1]:font-semibold
  [&_h2]:mt-3 [&_h2]:mb-1.5 [&_h2]:text-base [&_h2]:font-semibold
  [&_h3]:mt-2 [&_h3]:mb-1 [&_h3]:text-sm [&_h3]:font-semibold

  /* Emphasis */
  [&_strong]:font-semibold
  [&_em]:italic

  /* Inline code */
  [&_:not(pre)>code]:rounded
  [&_:not(pre)>code]:bg-muted
  [&_:not(pre)>code]:px-1
  [&_:not(pre)>code]:py-0.5
  [&_:not(pre)>code]:font-mono
  [&_:not(pre)>code]:text-[0.85em]

  /* Code blocks */
  [&_pre]:my-2.5
  [&_pre]:max-w-full
  [&_pre]:overflow-x-auto
  [&_pre]:rounded-lg
  [&_pre]:border
  [&_pre]:border-border
  [&_pre]:bg-muted
  [&_pre]:p-3

  [&_pre_code]:border-0
  [&_pre_code]:bg-transparent
  [&_pre_code]:p-0
  [&_pre_code]:font-mono
  [&_pre_code]:text-[0.85rem]
  [&_pre_code]:leading-relaxed

  /* Links */
  [&_a]:font-medium
  [&_a]:underline
  [&_a]:underline-offset-4
  [&_a]:break-words
  [&_a]:cursor-pointer

  /* Lists */
  [&_ul]:my-2
  [&_ul]:pl-5
  [&_ol]:my-2
  [&_ol]:pl-5
  [&_li]:my-0.5
  [&_li]:leading-relaxed

  /* Blockquotes */
  [&_blockquote]:my-2
  [&_blockquote]:border-l-2
  [&_blockquote]:border-border
  [&_blockquote]:pl-3
  [&_blockquote]:italic

  /* Tables */
  [&_table]:my-3
  [&_table]:block
  [&_table]:max-w-full
  [&_table]:overflow-x-auto
  [&_table]:border-collapse

  [&_th]:border
  [&_th]:border-border
  [&_th]:bg-muted
  [&_th]:px-3
  [&_th]:py-2
  [&_th]:text-left
  [&_th]:font-semibold

  [&_td]:border
  [&_td]:border-border
  [&_td]:px-3
  [&_td]:py-2
  [&_td]:align-top

  /* Horizontal rule */
  [&_hr]:my-3
  [&_hr]:border-border

  /* Images */
  [&_img]:my-2
  [&_img]:max-w-full
  [&_img]:rounded-md
"
>
  <ReactMarkdown remarkPlugins={[remarkGfm]}>
    {String(part.text)}
  </ReactMarkdown>
</div>

                        ))}
                    </div>
                  </MessageContent>
                </Message>
              </MessageScrollerItem>

    

            ))}

              {status === "submitted" && (
  <div className="px-3 py-2">
    <span
      className="
        inline-block
        bg-gradient-to-r
        from-muted-foreground/40
        via-foreground
        to-muted-foreground/40
        bg-[length:200%_100%]
        bg-clip-text
        text-sm
        font-medium
        text-transparent
        animate-[shimmer_1.5s_linear_infinite]
      "
    >
      ✦ Thinking...
    </span>
  </div>
)}

              {error && (
  <div className="px-3 py-2 text-sm text-destructive">
    Something went wrong. Please try again.
  </div>
)}


          </MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton />
      </MessageScroller>
    </MessageScrollerProvider>
  );
};

const ChatInput = ({
  value,
  onChange,
  onSend,
  placeholder,
  status
}: {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  placeholder?: string;
  status? : string;
}) => {
  
      const isGenerating =
      status === "submitted" || status === "streaming";

  const handleSubmit = (event: FormEvent) => {

    event.preventDefault();
    if(isGenerating) return
    onSend();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      if(isGenerating) return

      onSend();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-border/60 flex items-end gap-2 border-t pt-2.5"
    >
      <Textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="min-h-8 max-h-28 flex-1 resize-none overflow-y-auto py-1.5"
        rows={1}
        aria-label="Chat message"
      />
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        className="shrink-0 size-9 bg-gradient-to-br from-[#B8D96A] via-[#8ac94e] to-[#6a9e33] text-white hover:brightness-110 hover:saturate-110 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isGenerating || !value.trim()}
        aria-label="Send message"
      >
        <SendHorizontal />
      </Button>
    </form>
  );
};




const BSDKChat = ({
  title = "BSDK Chat",
  welcomeText = "Start a conversation and we'll take it from here.",
  placeholder = "Start the conversation...",
  theme,
  triggerImage,
  triggerColor,
  position,
  config
}: BSDKChatProps) => {
  const [input, setInput] = useState("");

  console.log("BSDKChat mounted")

  const { messages, sendMessage,status, error } = useChat({
    transport: new DefaultChatTransport({
      api: config.api,
       credentials: "include",
    body: {
      botId: config.botId ,
      description: config.botDescription
    },
    }),
  });

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    sendMessage({ text: trimmed });
    setInput("");
  };

  const positionClass =
  position === "bottom-left"
    ? "fixed bottom-5 left-5 z-50"
    : "fixed bottom-5 right-5 z-50";

  return createPortal(
    <div className={positionClass}>
      <Popover>
  <PopoverTrigger
  render={(props) => (
<Button
  {...props}
  variant="outline"
  size="icon-sm"
  className={`
    group relative size-8 md:size-12 cursor-pointer overflow-hidden rounded-full shadow-2xl
    transition-all duration-300 ease-out
    p-2 hover:shadow-violet-500/30 hover:shadow-2xl
    active:scale-95
  `}
  style={{ backgroundColor: triggerColor }}
>
  <span
    aria-hidden
    className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -translate-x-full
      bg-gradient-to-r from-transparent via-white/40 to-transparent
      transition-transform duration-700 ease-out group-hover:translate-x-[300%]"
  />
  {triggerImage ? (
    <img
      src={triggerImage}
      alt=""
      className="h-9 w-9 sm:h-11 sm:w-11 rounded-full object-cover"
    />
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className="size-6 sm:size-8 shrink-0"
    >
      <rect x="3" y="3" width="7" height="7" rx="2" fill="#EDEDED" />
      <rect x="14" y="3" width="7" height="7" rx="2" fill="#717680" />
      <rect x="3" y="14" width="7" height="7" rx="2" fill="#717680" />
      <rect
        x="14"
        y="14"
        width="7"
        height="7"
        rx="2"
        fill="#EDEDED"
        fillOpacity="0.4"
      />
      <circle cx="12" cy="12" r="1.5" fill="#B8D96A" />
    </svg>
  )}

</Button>
  )}
/>
        <PopoverContent
          align="end"
          className="flex h-[32rem] w-[22rem] flex-col gap-2.5"
        >
          <ChatHeader title={title} />
          <div className="min-h-0 flex-1">
            <ChatContent messages={messages} welcomeText={welcomeText} theme={theme} status={status} error={error} />
          </div>
          <ChatInput
            value={input}
            onChange={setInput}
            onSend={handleSend}
            placeholder={placeholder}
            status={status}
          />
        </PopoverContent>
      </Popover>
    </div>,
    document.body
  );
};

export default BSDKChat;
