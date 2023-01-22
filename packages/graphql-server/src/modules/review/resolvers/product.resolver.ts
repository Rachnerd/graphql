import { ReviewModule } from "../generated/module-types";

/**
 * Rating is currently resolved by the /products endpoint. This means the rating is available in the incoming product (first arg).
 * This setup allows future migration to a new service that takes care of reviews/ratings.
 */
export const Product: ReviewModule.Resolvers["Product"] = {
  rating: ({ rating }) => rating,
};
