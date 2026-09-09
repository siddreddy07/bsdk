import { lightpanda } from "@lightpanda/browser";
import { chromium } from "playwright-core";

export type LpdOptsType = {
  host: string;
  port: number;
};

async function connectToLightpanda(
  host: string,
  port: number,
  retries = 10
) {
  const endpointURL = `ws://${host}:${port}`;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await chromium.connectOverCDP({
        endpointURL,
      });
    } catch (error) {
      if (attempt === retries) {
        throw error;
      }

      await new Promise((resolve) => setTimeout(resolve, 300));
    }
  }

  throw new Error("Could not connect to Lightpanda");
}

export async function fetchRenderedPage(
  url: string,
  lpdopts: LpdOptsType
) {
  const proc = await lightpanda.serve(lpdopts);

  try {
    // Wait until Lightpanda is actually accepting connections
    const browser = await connectToLightpanda(
      lpdopts.host,
      lpdopts.port
    );

    try {
      const context = await browser.newContext();
      const page = await context.newPage();

      await page.goto(url, {
        waitUntil: "load",
        timeout: 30_000,
      });

      return await page.content();
    } finally {
      await browser.close();
    }
  } finally {
    proc.stdout.destroy();
    proc.stderr.destroy();
    proc.kill();
  }
}