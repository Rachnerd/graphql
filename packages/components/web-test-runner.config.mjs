import { esbuildPlugin } from "@web/dev-server-esbuild";
import { defaultReporter } from "@web/test-runner";
import { junitReporter } from "@web/test-runner-junit-reporter";

export default {
  port: 8008,
  mimeTypes: {
    "**/*.pcss": "js",
  },
  files: ["src/**/*.test.ts", "src/**/*.spec.ts"],
  plugins: [esbuildPlugin({ ts: true })],
  reporters: [
    defaultReporter({ reportTestResults: true, reportTestProgress: true }),
    junitReporter({
      outputPath: "./test-results.xml",
      reportLogs: true,
    }),
  ],
  coverageConfig: {
    reporters: ["text", "text-summary", "cobertura", "lcov"],
    threshold: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
};
