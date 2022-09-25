import prettier from "prettier/standalone";
import parseHtml from "prettier/parser-html";

/**
 * Format the code snippet with Prettier.
 */
export const prettierSourceTransformer = (input) =>
  prettier.format(input, {
    plugins: [parseHtml],
    parser: "html",
    semi: false,
  });
