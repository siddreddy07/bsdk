import type { UIMessage } from "ai";

export type TrySession = {
  demoId: string;
  chatCount: number;
  createdAt: number;
  messages: UIMessage[];
  markdown?: string;
  sourceUrl?: string;
  uploaded?: boolean;
};

const SESSION_KEY = "bsdk_try_session";
const SESSION_TTL = 24 * 60 * 60 * 1000;

const createSession = (): TrySession => ({
  demoId: crypto.randomUUID(),
  chatCount: 0,
  createdAt: Date.now(),
  messages: [],
});

const saveSession = (session: TrySession): TrySession => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
};

export const getTrySession = (): TrySession => {
  const raw = localStorage.getItem(SESSION_KEY);

  if (raw) {
    try {
      const session = JSON.parse(raw) as Partial<TrySession>;

      if (
        typeof session.demoId === "string" &&
        typeof session.createdAt === "number" &&
        Date.now() - session.createdAt < SESSION_TTL
      ) {
        return {
          demoId: session.demoId,
          chatCount: typeof session.chatCount === "number" ? session.chatCount : 0,
          createdAt: session.createdAt,
          messages: Array.isArray(session.messages) ? session.messages : [],
          markdown: typeof session.markdown === "string" ? session.markdown : undefined,
          sourceUrl: typeof session.sourceUrl === "string" ? session.sourceUrl : undefined,
          uploaded: typeof session.uploaded === "boolean" ? session.uploaded : false,
        };
      }
    } catch {
      // Invalid session, create fresh one below
    }
  }

  return saveSession(createSession());
};

export const getUploadStatus = ()=>{
  const status = getTrySession().uploaded
  return status
}

export const getTryChatCount = (): number =>
  getTrySession().chatCount;

export const incrementTryChatCount = (): number => {
  const session = getTrySession();

  return saveSession({
    ...session,
    chatCount: session.chatCount + 1,
  }).chatCount;
};

export const getTryMessages = (): UIMessage[] =>
  getTrySession().messages;

export const getMarkdown = ()=>{
  const markdown = getTrySession().markdown
  return (markdown?.trim().length ?? 0) >= 500 ? true : false
}

export const saveTryMessages = (messages: UIMessage[]): void => {
  const session = getTrySession();

  saveSession({
    ...session,
    messages,
    chatCount: messages.filter((m) => m.role === "user").length,
  });
};

export const saveTryResult = (markdown: string, sourceUrl: string): void => {
  const session = getTrySession();

  saveSession({
    ...session,
    markdown,
    sourceUrl,
    uploaded: false,
  });
};

export const markAsUploaded = (): void => {
  const session = getTrySession();

  saveSession({
    ...session,
    uploaded: true,
  });
};
