import { StoryContext } from "@storybook/addons";
import { SourceTransformer } from "./index";

/**
 * Pipe all transformers and catch errors.
 */
export const pipeSourceTransformer =
  (transformers: SourceTransformer[]) =>
  (input: string, context: StoryContext) =>
    transformers.reduce((result, transformer) => {
      try {
        return transformer(result, context);
      } catch (e) {
        console.warn(
          `"${transformer.name}" is unable to transform story ${context.name} in ${context.title}.`
        );
        console.error(e);
        return result;
      }
    }, input);
