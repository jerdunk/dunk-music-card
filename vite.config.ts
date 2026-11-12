import { defineConfig } from "vite";
export default defineConfig({
  build: {
    lib: {
      entry: "src/card.ts",
      formats: ["es"],
      fileName: () => "dunk-music.js",
    },
    outDir: "dist",
    sourcemap: true,
  },
});
