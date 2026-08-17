export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export type BSDKChatTheme = {
  statusDot?: string;
};

export type BSDKChatProps = {
  title?: string;
  welcomeText?: string;
  placeholder?: string;
  theme?: BSDKChatTheme;
};