export type ChatMessage = {
  id: string;
  role: "user" | "assistant" | "system";
  parts: Array<{ type: string; [key: string]: unknown }>;
};

export type BSDKChatTheme = {
  bubble?: (role: "user" | "assistant") => string;
};

export interface BSDKConfig {
  api: string;
  botId: string;
  botDescription:string;
}

export type BSDKChatProps = {
  title?: string;
  welcomeText?: string;
  placeholder?: string;
  theme?: BSDKChatTheme;
  triggerText?: string;
  triggerImage?: string;
  triggerColor?: string;
  position?: "bottom-left" | "bottom-right";
  config: BSDKConfig;
};