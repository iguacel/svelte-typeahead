import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import svelte from "rollup-plugin-svelte";
import svelteReadme from "svelte-readme";
import pkg from "./package.json"  assert { type: "json" };

export default () => {
  if (!process.env.BUNDLE) {
    return svelteReadme({
      plugins: [commonjs()],
      style: `
        .code-fence li + li { margin: 0; }
        .code-fence { min-height: 16rem; }
        .code-fence pre { margin-bottom: 0; margin-top: 12px; }
      `,
    });
  }

  return ["es", "umd"].map((format) => {
    const UMD = format === "umd";

    return {
      input: pkg.svelte,
      output: {
        format,
        file: UMD ? pkg.main : pkg.module,
        name: UMD ? pkg.name : undefined,
        exports: "named",
      },
      plugins: [svelte({ emitCss: false }), resolve(), commonjs()],
    };
  });
};
