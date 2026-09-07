import DocsLayout from "../../components/docs/layout"
import {
  DocCodeBlock,
  DocInline,
  DocList,
  DocNote,
  DocP,
  DocSection,
  DocTree,
} from "../../components/docs/primitives"

const headings = [
  { id: "architecture", label: "Architecture" },
  { id: "backend", label: "Backend" },
  { id: "frontend", label: "Frontend" },
  { id: "transport", label: "Transport" },
]

const ChatStreaming = () => (
  <DocsLayout
    title="Chat Streaming"
    tagline="Forward streamed responses to the client."
    headings={headings}
  >
    <DocSection id="architecture" title="Architecture">
      <DocTree
        snippet={`BSDKChat
   ↓
config.api
   ↓
POST /api/chat
   ↓
@bsdk/server
   ↓
bsdk.chat(messages, botId, description)
   ↓
AI provider
   ↓
Streaming HTTP Response
   ↓
BSDKChat`}
      />
    </DocSection>

    <DocSection id="backend" title="Backend">
      <DocP>
        The backend route receives messages, calls the BSDK runtime, and forwards
        the streamed response:
      </DocP>
      <DocCodeBlock
        snippet={`app.post("/api/chat", async (req, res) => {
  const { messages, botId, description } = req.body;

  const response = await bsdk.chat(messages, botId.toString(), description);

  res.status(response.status);
  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });

  if (!response.body) {
    return res.end();
  }

  const reader = response.body.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    res.write(Buffer.from(value));
  }

  res.end();
});`}
      />
      <DocP>
        The response body is streamed to the client as it is generated, instead
        of waiting for the complete model response.
      </DocP>
    </DocSection>

    <DocSection id="frontend" title="Frontend">
      <DocP>
        <DocInline>BSDKChat</DocInline> posts to the backend route via{" "}
        <DocInline>config.api</DocInline>:
      </DocP>
      <DocCodeBlock
        snippet={`<BSDKChat
  config={{
    api: "http://localhost:8080/api/chat",
    botId: "your-bot-id",
    botDes: "Website assistant",
  }}
/>`}
      />
      <DocP>
        <DocInline>config.api</DocInline> is what connects{" "}
        <DocInline>@bsdk/ui</DocInline> to the developer&apos;s backend route.
        <DocInline>http://localhost:8080/api/chat</DocInline> is only an example
        URL, not a BSDK default.
      </DocP>
    </DocSection>

    <DocSection id="transport" title="Transport">
      
        <p>
        BSDK chat uses a <strong className="font-medium text-white/85">streaming HTTP response</strong>.
        It does not require WebSockets or Socket.IO.
        </p>
      <DocNote title="No WebSockets">
        Streaming is done over the HTTP response stream. BSDK does not require
        WebSockets or Socket.IO.
      </DocNote>
    </DocSection>
  </DocsLayout>
)

export default ChatStreaming
