import { defineConfig, mergeConfig } from "vite";
import {
  getBuildConfig,
  getBuildDefine,
  external,
  pluginHotRestart,
} from "./vite.base.config.mjs";
import eslintPlugin from "vite-plugin-eslint";

export default defineConfig((env) => {
  const forgeEnv = env;
  const { forgeConfigSelf } = forgeEnv;

  const define = getBuildDefine(forgeEnv);
  const config = {
    build: {
      lib: {
        entry: forgeConfigSelf.entry,
        fileName: () => "[name].js",
        formats: ["cjs"],
      },
      rollupOptions: {
        external,
      },
    },
    plugins: [
      eslintPlugin({
        fix: true, // Auto-fix linting issues
        include: ["src/**/*.js", "src/**/*.vue", "src/**/*.mjs"],
      }),
      pluginHotRestart("restart"),
    ],
    define,
    resolve: {
      // Load the Node.js entry.
      mainFields: ["module", "jsnext:main", "jsnext"],
    },
  };

  return mergeConfig(getBuildConfig(forgeEnv), config);
});
