import "reflect-metadata";
import { describe, expect, test, jest, beforeEach } from "@jest/globals";
import { Application, gql, testkit } from "graphql-modules";
import { productModule } from "../product.module";
import { commonModule } from "../../common/common.module";
import { cartModule } from "../../cart/cart.module";
import { ProductModule } from "../generated/module-types";
import { ProductService } from "../providers/product.service";

describe("Product query resolver", () => {
  let app: Application;
  let productService: jest.Mocked<ProductService>;

  const MOCK_PRODUCT: ProductModule.Product = {
    id: "1",
    title: "title",
    category: "category",
    description: "description",
    image: "image",
  };

  beforeEach(() => {
    app = testkit.testModule(productModule, {
      inheritTypeDefs: [commonModule, cartModule],
      providers: [
        {
          provide: ProductService,
          useValue: {
            getById: jest.fn(),
            getByIds: jest.fn(),
          },
        },
      ],
    });
    productService = app.injector.get(
      ProductService
    ) as jest.Mocked<ProductService>;
  });

  test("should return Product if the product exists", async () => {
    productService.getByIds.mockResolvedValueOnce([MOCK_PRODUCT]);

    const { data } = await testkit.execute(app, {
      document: gql`
        {
          product(id: "1") {
            ... on Product {
              id
              title
              category
              description
              image
            }
          }
        }
      `,
    });

    expect(data!.product).toEqual(MOCK_PRODUCT);
    expect(productService.getByIds).toHaveBeenCalledTimes(1);
    expect(productService.getByIds).toHaveBeenCalledWith(["1"]);
  });

  test("should return NotFound if the product does not exist", async () => {
    productService.getByIds.mockResolvedValueOnce([undefined as any]);

    const { data } = await testkit.execute(app, {
      document: gql`
        {
          product(id: "1") {
            ... on NotFound {
              id
              reason
            }
          }
        }
      `,
    });

    expect(data!.product).toEqual({
      id: "1",
      reason: "Product with id 1 does not exist",
    });
    expect(productService.getByIds).toHaveBeenCalledTimes(1);
    expect(productService.getByIds).toHaveBeenCalledWith(["1"]);
  });
});
