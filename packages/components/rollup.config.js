import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";
import renameNodeModules from "rollup-plugin-rename-node-modules";

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "src/index.ts",
  output: [
    {
      dir: "dist",
      format: "esm",
      sourcemap: true,
      preserveModules: true,
      preserveModulesRoot: "src",
    },
  ],
  plugins: [
    resolve(),
    renameNodeModules("lib"),
    typescript({ tsconfig: "./tsconfig.prod.json" }),
    commonjs(),
    production &&
      terser({
        format: {
          comments: false,
        },
      }),
  ],
};
