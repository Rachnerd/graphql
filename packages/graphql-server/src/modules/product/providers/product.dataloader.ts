import DataLoader from "dataloader";
import { InjectionToken } from "graphql-modules";
import { ProductModule } from "../generated/module-types";
import { ProductService } from "./product.service";

export const PRODUCT_DATALOADER = new InjectionToken<
  ReturnType<typeof productDataLoader>
>("Price Dataloader");

export const productDataLoader = (productService: ProductService) =>
  new DataLoader<string, ProductModule.Product>((ids) =>
    productService.getByIds(ids)
  );
