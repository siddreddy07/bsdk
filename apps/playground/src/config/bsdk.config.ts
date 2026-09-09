
export const bsdkConfig = {
  api: import.meta.env.VITE_BSDK_API_URL,
  botId: import.meta.env.VITE_BSDK_BOT_ID ? `bot_${import.meta.env.VITE_BSDK_BOT_ID}` :  "",
  botDescription: import.meta.env.VITE_BSDK_BOT_DESC || ""
};

export type configType = {
    api:string,
    botId:string,
    botDescription:string
}