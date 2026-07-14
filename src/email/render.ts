import { Renderer, toPlainText } from "@better-svelte-email/server";
import fs from "node:fs";
import path from "node:path";

let rendererInstance: Renderer | null = null;

function getRenderer(): Renderer {
  if (!rendererInstance) {
    let customCSS = "";
    try {
      const dir = import.meta.dirname || path.resolve();
      const appCssPath = path.resolve(dir, "../app.css");
      if (fs.existsSync(appCssPath)) {
        customCSS = fs.readFileSync(appCssPath, "utf-8");
      }
    } catch {
      // ignore
    }
    rendererInstance = new Renderer(customCSS ? { customCSS } : {});
  }
  return rendererInstance;
}

export async function render({
  template,
  props,
  options,
}: {
  template: any;
  props?: Record<string, any>;
  options?: { plainText?: boolean };
}): Promise<string> {
  const renderer = getRenderer();
  const html = await renderer.render(template, { props });
  if (options?.plainText) {
    const protectedHtml = html
      .replace(/&lt;([#@][^&]+)&gt;/g, "___FM_START___$1___FM_END___")
      .replace(/<!--([#@/][^-]+)-->/g, "___FM_START___$1___FM_END___")
      .replace(/<\/?([#@][^>]+)>/g, (match) => {
        return "___FM_START___" + match.slice(1, -1) + "___FM_END___";
      });
    return toPlainText(protectedHtml)
      .replaceAll("___FM_START___", "<")
      .replaceAll("___FM_END___", ">")
      .replaceAll("?no_esc", "");
  }
  return html
    .replaceAll("___FM_START___", "<")
    .replaceAll("___FM_END___", ">")
    .replace(/&lt;([#@][^&]+)&gt;/g, "<$1>")
    .replace(/<!--([#@/][^-]+)-->/g, "<$1>");
}
