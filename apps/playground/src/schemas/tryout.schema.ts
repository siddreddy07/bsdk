import { z } from "zod"

export const TryoutSchema = z.object({
  url: z.url("Enter a valid URL, e.g. https://example.com"),
})

export type TryoutSchemaData = z.infer<typeof TryoutSchema>