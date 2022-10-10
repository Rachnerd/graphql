import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Cart = {
  __typename?: 'Cart';
  id: Scalars['ID'];
  paginationInfo: PaginationInfo;
  products: Array<CartProduct>;
  total: Scalars['Float'];
};

export type CartProduct = {
  __typename?: 'CartProduct';
  id: Scalars['ID'];
  product: Product;
  quantity: Scalars['Int'];
  total: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addToCart: Scalars['Boolean'];
  removeFromCart: Scalars['Boolean'];
  updateCart: Scalars['Boolean'];
};


export type MutationAddToCartArgs = {
  id: Scalars['ID'];
  quantity: Scalars['Int'];
};


export type MutationRemoveFromCartArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateCartArgs = {
  id: Scalars['ID'];
  quantity: Scalars['Int'];
};

export type NotFound = {
  __typename?: 'NotFound';
  id: Scalars['ID'];
  reason: Scalars['String'];
};

export type PaginationInfo = {
  __typename?: 'PaginationInfo';
  page: Scalars['Int'];
  size: Scalars['Int'];
  totalPages: Scalars['Int'];
  totalResults: Scalars['Int'];
};

export type PaginationParams = {
  page: Scalars['Int'];
  size: Scalars['Int'];
};

export type Product = {
  __typename?: 'Product';
  category: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
  image: Scalars['String'];
  inCart: Scalars['Boolean'];
  price: Scalars['Float'];
  rating: Rating;
  title: Scalars['String'];
};

export type ProductResult = NotFound | Product;

export type Products = {
  __typename?: 'Products';
  paginationInfo: PaginationInfo;
  results: Array<Product>;
};

export type Query = {
  __typename?: 'Query';
  cart: Cart;
  product: ProductResult;
  products: Products;
};


export type QueryCartArgs = {
  pagination?: InputMaybe<PaginationParams>;
};


export type QueryProductArgs = {
  id: Scalars['ID'];
};


export type QueryProductsArgs = {
  pagination: PaginationParams;
};

export type Rating = {
  __typename?: 'Rating';
  count: Scalars['Int'];
  rate: Scalars['Float'];
};

export type CartQueryVariables = Exact<{ [key: string]: never; }>;


export type CartQuery = { __typename?: 'Query', cart: { __typename?: 'Cart', id: string, total: number, products: Array<{ __typename?: 'CartProduct', id: string, quantity: number, total: number, product: { __typename?: 'Product', id: string, title: string, price: number, image: string } }> } };

export type ProductsQueryVariables = Exact<{
  pagination: PaginationParams;
}>;


export type ProductsQuery = { __typename?: 'Query', products: { __typename?: 'Products', results: Array<{ __typename?: 'Product', id: string, title: string, price: number, description: string, category: string, image: string, inCart: boolean, rating: { __typename?: 'Rating', count: number, rate: number } }> } };


export const CartDocument = gql`
    query Cart {
  cart {
    id
    total
    products {
      id
      quantity
      total
      product {
        id
        title
        price
        image
      }
    }
  }
}
    `;

/**
 * __useCartQuery__
 *
 * To run a query within a React component, call `useCartQuery` and pass it any options that fit your needs.
 * When your component renders, `useCartQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCartQuery({
 *   variables: {
 *   },
 * });
 */
export function useCartQuery(baseOptions?: Apollo.QueryHookOptions<CartQuery, CartQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CartQuery, CartQueryVariables>(CartDocument, options);
      }
export function useCartLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CartQuery, CartQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CartQuery, CartQueryVariables>(CartDocument, options);
        }
export type CartQueryHookResult = ReturnType<typeof useCartQuery>;
export type CartLazyQueryHookResult = ReturnType<typeof useCartLazyQuery>;
export type CartQueryResult = Apollo.QueryResult<CartQuery, CartQueryVariables>;
export const ProductsDocument = gql`
    query Products($pagination: PaginationParams!) {
  products(pagination: $pagination) {
    results {
      id
      title
      price
      description
      category
      image
      rating {
        count
        rate
      }
      inCart
    }
  }
}
    `;

/**
 * __useProductsQuery__
 *
 * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useProductsQuery(baseOptions: Apollo.QueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
      }
export function useProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
        }
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>;
export type ProductsLazyQueryHookResult = ReturnType<typeof useProductsLazyQuery>;
export type ProductsQueryResult = Apollo.QueryResult<ProductsQuery, ProductsQueryVariables>;