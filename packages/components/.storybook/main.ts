const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  features: {
    postcss: false,
  },
  stories: ["../docs/**/*.stories.mdx", "../src/**/*.stories.@(ts|mdx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
  ],
  framework: "@storybook/web-components",
  babel: async (options) => {
    /**
     * https://github.com/storybookjs/storybook/issues/12578
     */
    Object.assign(
      options.plugins.find((plugin) =>
        plugin[0].includes("plugin-proposal-decorators")
      )[1],
      {
        decoratorsBeforeExport: true,
        legacy: false,
      }
    );
    return options;
  },
  webpack: (config) => {
    config.node = { fs: "empty" }; // Needed to get the css parser to work: https://github.com/reworkcss/css/issues/139
    config.resolve.plugins.push(new TsconfigPathsPlugin({}));
    return config;
  },
  staticDirs: [],
};
