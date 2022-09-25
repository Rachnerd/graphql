import { StoryContext } from "@storybook/addons";

/**
 * Source transformers are applied to the Story template that can be found by
 * clicking "Show code" in the docs tab.
 */
export type SourceTransformer = (
  input: string,
  { title, name, parameters }: StoryContext
) => string;
