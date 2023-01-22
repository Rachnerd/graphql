import "reflect-metadata";
import { describe, expect, test, jest, beforeEach } from "@jest/globals";
import { Application, gql, testkit } from "graphql-modules";
import { productModule } from "../product.module";
import { commonModule } from "../../common/common.module";
import { cartModule } from "../../cart/cart.module";
import { ProductModule } from "../generated/module-types";
import { ProductService } from "../providers/product.service";

describe("Products query resolver", () => {
  let app: Application;
  let productService: jest.Mocked<ProductService>;

  const MOCK_PRODUCT: ProductModule.Product = {
    id: "1",
    title: "title",
    category: "category",
    description: "description",
    image: "image",
  };

  const MOCK_PRODUCT_RESULTS: ProductModule.ProductResults = {
    results: [MOCK_PRODUCT as any],
    paginationInfo: {
      page: 1,
      size: 10,
      totalPages: 1,
      totalResults: 10,
    },
  };

  beforeEach(() => {
    app = testkit.testModule(productModule, {
      inheritTypeDefs: [commonModule, cartModule],
      providers: [
        {
          provide: ProductService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    });
    productService = app.injector.get(
      ProductService
    ) as jest.Mocked<ProductService>;
  });

  test("should return a list of Product filtered by pagination", async () => {
    productService.get.mockResolvedValueOnce(MOCK_PRODUCT_RESULTS);

    const { data } = await testkit.execute(app, {
      document: gql`
        {
          products(pagination: { page: 1, size: 10 }) {
            results {
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

    expect(data!.products).toEqual({ results: MOCK_PRODUCT_RESULTS.results });
    expect(productService.get).toHaveBeenCalledTimes(1);
    expect(productService.get).toHaveBeenCalledWith({ page: 1, size: 10 });
  });

  test("should return pagination info", async () => {
    productService.get.mockResolvedValueOnce(MOCK_PRODUCT_RESULTS);

    const { data } = await testkit.execute(app, {
      document: gql`
        {
          products(pagination: { page: 1, size: 10 }) {
            paginationInfo {
              page
              size
              totalPages
              totalResults
            }
          }
        }
      `,
    });

    expect(data!.products).toEqual({
      paginationInfo: MOCK_PRODUCT_RESULTS.paginationInfo,
    });
    expect(productService.get).toHaveBeenCalledTimes(1);
    expect(productService.get).toHaveBeenCalledWith({ page: 1, size: 10 });
  });
});
