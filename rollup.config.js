import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json";

export default [
  // browser-friendly UMD build
  {
    input: "src/index.ts",
    external: ["tailwindcss", "tailwindcss/resolveConfig"],
    output: {
      name: "typescriptNpmPackage",
      file: pkg.browser,
      format: "umd",
      sourcemap: true,
      globals: { tailwindcss: "tailwindCSS", "tailwindcss/resolveConfig": "tailwindCSS_resolveConfig" },
    },
    plugins: [
      resolve({ browser: true }),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
    ],
  },

  //CommonJS (for Node) and ES module (for bundlers) build.
  {
    input: "src/index.ts",
    external: ["tailwindcss", "tailwindcss/resolveConfig"],
    output: [
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: true,
        globals: { tailwindcss: "tailwindCSS" },
      },
      {
        file: pkg.module,
        format: "es",
        sourcemap: true,
      },
    ],

    plugins: [typescript({ tsconfig: "./tsconfig.json" })],
  },
];
