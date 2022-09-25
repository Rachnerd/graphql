import { pipeSourceTransformer } from "./source-transformers/pipe";
import { attributesSourceTransformer } from "./source-transformers/attributes";
import { prettierSourceTransformer } from "./source-transformers/prettier";

export const transformSource = pipeSourceTransformer([
  attributesSourceTransformer,
  prettierSourceTransformer,
]);
