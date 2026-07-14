import tailwindcss from "@tailwindcss/vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";
import { keycloakify } from "keycloakify/vite-plugin";
import { buildEmailTheme } from "keycloakify-emails";
import esbuildSvelte from "esbuild-svelte";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: "build_dist",
  },
  plugins: [
    tailwindcss(),
    svelte(),

    keycloakify({
      accountThemeImplementation: "none",
      themeName: "KeycloakSvelte",
      postBuild: async (buildContext) => {
        await buildEmailTheme({
          assetsDirPath: path.join(
            buildContext.themeSrcDirPath,
            "email",
            "templates",
            "assets",
          ),
          templatesSrcDirPath: path.join(
            buildContext.themeSrcDirPath,
            "email",
            "templates",
          ),
          i18nSourceFile: path.join(
            buildContext.themeSrcDirPath,
            "email",
            "i18n.ts",
          ),
          themeNames: buildContext.themeNames,
          keycloakifyBuildDirPath: buildContext.keycloakifyBuildDirPath,
          locales: ["en"],
          cwd: import.meta.dirname,
          environmentVariables: buildContext.environmentVariables,
          esbuild: {
            packages: undefined,
            external: [
              "node:*",
              "path",
              "fs",
              "url",
              "module",
              "os",
              "crypto",
              "events",
              "util",
              "assert",
              "stream",
              "buffer",
              "tty",
              "child_process",
              "worker_threads",
              "perf_hooks",
              "vm",
              "zlib",
              "http",
              "https",
              "net",
              "tls",
              "svelte",
              "svelte/*",
              "@better-svelte-email/server",
            ],
            conditions: ["svelte", "import", "node", "default"],
            plugins: [
              esbuildSvelte({
                compilerOptions: {
                  generate: "server",
                  runes: true,
                },
              }) as any,
            ],
          },
        });
      },
    }),
  ],
  resolve: {
    alias: {
      $lib: path.resolve(__dirname, "./src/lib"),
    },
  },
});
