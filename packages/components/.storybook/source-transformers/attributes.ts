import { SourceTransformer } from "./index";

/**
 * Restores lowercase attributes back to original.
 */
export const attributesSourceTransformer: SourceTransformer = (
  input,
  { parameters }
) =>
  Object.keys(parameters.argTypes).reduce(
    (result, prop) =>
      prop === prop.toLowerCase()
        ? result
        : result.replace(
            new RegExp(`${prop.toLowerCase()}="`, "g"),
            `${prop}="`
          ),
    input
  );
