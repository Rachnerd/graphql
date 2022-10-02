import { setCustomElementsManifest } from "@storybook/web-components";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

// @ts-ignore-next-line
import customElementsManifest from "../custom-elements.json";
import "./style.css";
import { transformSource } from "./transform-source";
import "@fontsource/roboto";

setCustomElementsManifest(customElementsManifest);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    sort: "requiredFirst",
    hideNoControlsWarning: true,
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  options: {
    storySort: {
      order: ["Senses Building Blocks", "SBB Contribute", "Core"],
    },
  },
  docs: {
    transformSource,
  },
} as Parameters;
