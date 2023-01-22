import DataLoader from "dataloader";
import { InjectionToken } from "graphql-modules";
import { PriceService } from "./price.service";

export const PRICE_DATALOADER = new InjectionToken<
  ReturnType<typeof priceDataLoader>
>("Price Dataloader");

export const priceDataLoader = (priceService: PriceService) =>
  new DataLoader<string, number>((ids) => priceService.getByIds(ids));
