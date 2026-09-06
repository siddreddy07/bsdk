# @bsdk/ui

Drop-in React chat UI for BSDK.

## Prerequisites

`@bsdk/ui` requires:

- **React 19**
- **Tailwind CSS v4**
- **shadcn/ui with its theme configured**

BSDK uses shadcn theme variables internally, so the shadcn theme setup is required.

### Starting a new project

You can create a ready-to-use project with shadcn:

**Next.js**

```bash
npx shadcn@latest init -t next
```

**Vite**

```bash
npx shadcn@latest init -t vite
```

### Existing project

If you already have a React project, make sure Tailwind CSS v4 is configured, then initialize shadcn:

```bash
npx shadcn@latest init
```

## Installation

```bash
npm install @bsdk/ui
```

Add BSDK styles to your global CSS:

```css
@import "@bsdk/ui/styles.css";
```

## Usage

```tsx
import { BSDKChat } from "@bsdk/ui";

export default function App() {
  return (
    <BSDKChat
      config={{
        api: "https://your-api.com/chat",
        botId: "your-bot-id",
        botDescription: "AI assistant for my website",
      }}
    />
  );
}
```

That's it. The BSDK chat trigger will appear on your page.

## Customization

```tsx
<BSDKChat
  title="Ask AI"
  welcomeText="How can I help you?"
  placeholder="Ask something..."
  position="bottom-right"
  triggerColor="#18181b"
  triggerImage="/bot.png"
  config={{
    api: "https://your-api.com/chat",
    botId: "your-bot-id",
    botDescription: "AI assistant for my website",
  }}
/>
```

## Props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `BSDKConfig` | Yes | BSDK connection configuration |
| `title` | `string` | No | Chat header title |
| `welcomeText` | `string` | No | Initial welcome message |
| `placeholder` | `string` | No | Message input placeholder |
| `position` | `"bottom-left" \| "bottom-right"` | No | Position of the chat trigger |
| `triggerImage` | `string` | No | Custom trigger image |
| `triggerColor` | `string` | No | Trigger background color |
| `theme` | `BSDKChatTheme` | No | Custom message bubble styling |

### `BSDKConfig`

```ts
interface BSDKConfig {
  api: string;
  botId: string;
  botDescription: string;
}
```

## Package

```bash
npm install @bsdk/ui
```