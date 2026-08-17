import { useState, type FormEvent, type KeyboardEvent } from "react";
import { SendHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "../ui/message-scroller";
import { Message, MessageContent } from "../ui/message";
import ChatHeader from "./ChatHeader";
import type { BSDKChatProps, ChatMessage } from "./types";

const DEMO_REPLY =
  "Thanks for reaching out! This is a demo reply from the assistant side. How can I help you next?";

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
}: {
  messages: ChatMessage[];
  welcomeText: string;
}) => {
  if (messages.length === 0) {
    return <ChatEmptyState welcomeText={welcomeText} />;
  }

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
                className="px-1.5 py-1"
              >
                <Message align={message.role === "user" ? "end" : "start"}>
                  <MessageContent>
                    <div
                      data-slot="message-bubble"
                      className={`rounded-lg px-3 py-1.5 text-sm shadow ${
                        message.role === "user"
                          ? "bg-blue-400 text-white dark:bg-blue-600"
                          : "bg-zinc-400 text-zinc-50 dark:bg-zinc-800 dark:text-zinc-200"
                      }`}
                    >
                      {message.content}
                    </div>
                  </MessageContent>
                </Message>
              </MessageScrollerItem>
            ))}
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
}: {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  placeholder?: string;
}) => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSend();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
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
        size="icon"
        className="shrink-0"
        disabled={!value.trim()}
        aria-label="Send message"
      >
        <SendHorizontal />
      </Button>
    </form>
  );
};

const BSDKChat = ({
  title = "BSDK Chat",
  welcomeText = "Start a conversation and we&apos;ll take it from here.",
  placeholder = "Start the conversation...",
  theme,
}: BSDKChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");

  const handleSend = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;

    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        role: "user",
        content: trimmed,
      },
      {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: DEMO_REPLY,
      },
    ]);
    setDraft("");
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger
          render={<Button variant="outline" size="sm">End</Button>}
        />
        <PopoverContent
          align="end"
          className="flex h-[32rem] w-[22rem] flex-col gap-2.5"
        >
          <ChatHeader title={title} theme={theme} />
          <div className="min-h-0 flex-1">
            <ChatContent messages={messages} welcomeText={welcomeText} />
          </div>
          <ChatInput
            value={draft}
            onChange={setDraft}
            onSend={handleSend}
            placeholder={placeholder}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default BSDKChat;
