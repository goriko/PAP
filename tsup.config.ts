import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/infrastructure/server/index.ts"],
  outDir: "dist",
  format: ["esm"],
  splitting: false,
  clean: true,
  dts: false,
  target: "node18",
  minify: false,
  sourcemap: false,
  bundle: true,
});
