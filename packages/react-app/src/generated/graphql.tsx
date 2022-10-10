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

export type AddToCartMutationVariables = Exact<{
  addToCartId: Scalars['ID'];
  quantity: Scalars['Int'];
}>;


export type AddToCartMutation = { __typename?: 'Mutation', addToCart: boolean };

export type CartQueryVariables = Exact<{ [key: string]: never; }>;


export type CartQuery = { __typename?: 'Query', cart: { __typename?: 'Cart', id: string, total: number, products: Array<{ __typename?: 'CartProduct', id: string, quantity: number, total: number, product: { __typename?: 'Product', id: string, title: string, price: number, image: string } }> } };

export type ProductsPricesQueryVariables = Exact<{
  pagination: PaginationParams;
}>;


export type ProductsPricesQuery = { __typename?: 'Query', products: { __typename?: 'Products', results: Array<{ __typename?: 'Product', id: string, price: number }> } };

export type ProductsWithoutPricesQueryVariables = Exact<{
  pagination: PaginationParams;
}>;


export type ProductsWithoutPricesQuery = { __typename?: 'Query', products: { __typename?: 'Products', results: Array<{ __typename?: 'Product', id: string, title: string, description: string, category: string, image: string, inCart: boolean, rating: { __typename?: 'Rating', count: number, rate: number } }> } };

export type ProductsQueryVariables = Exact<{
  pagination: PaginationParams;
}>;


export type ProductsQuery = { __typename?: 'Query', products: { __typename?: 'Products', results: Array<{ __typename?: 'Product', id: string, title: string, price: number, description: string, category: string, image: string, inCart: boolean, rating: { __typename?: 'Rating', count: number, rate: number } }> } };

export type RemoveFromCartMutationVariables = Exact<{
  removeFromCartId: Scalars['ID'];
}>;


export type RemoveFromCartMutation = { __typename?: 'Mutation', removeFromCart: boolean };

export type UpdateCartMutationVariables = Exact<{
  updateCartId: Scalars['ID'];
  quantity: Scalars['Int'];
}>;


export type UpdateCartMutation = { __typename?: 'Mutation', updateCart: boolean };


export const AddToCartDocument = gql`
    mutation addToCart($addToCartId: ID!, $quantity: Int!) {
  addToCart(id: $addToCartId, quantity: $quantity)
}
    `;
export type AddToCartMutationFn = Apollo.MutationFunction<AddToCartMutation, AddToCartMutationVariables>;

/**
 * __useAddToCartMutation__
 *
 * To run a mutation, you first call `useAddToCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToCartMutation, { data, loading, error }] = useAddToCartMutation({
 *   variables: {
 *      addToCartId: // value for 'addToCartId'
 *      quantity: // value for 'quantity'
 *   },
 * });
 */
export function useAddToCartMutation(baseOptions?: Apollo.MutationHookOptions<AddToCartMutation, AddToCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddToCartMutation, AddToCartMutationVariables>(AddToCartDocument, options);
      }
export type AddToCartMutationHookResult = ReturnType<typeof useAddToCartMutation>;
export type AddToCartMutationResult = Apollo.MutationResult<AddToCartMutation>;
export type AddToCartMutationOptions = Apollo.BaseMutationOptions<AddToCartMutation, AddToCartMutationVariables>;
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
export const ProductsPricesDocument = gql`
    query ProductsPrices($pagination: PaginationParams!) {
  products(pagination: $pagination) {
    results {
      id
      price
    }
  }
}
    `;

/**
 * __useProductsPricesQuery__
 *
 * To run a query within a React component, call `useProductsPricesQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsPricesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsPricesQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useProductsPricesQuery(baseOptions: Apollo.QueryHookOptions<ProductsPricesQuery, ProductsPricesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductsPricesQuery, ProductsPricesQueryVariables>(ProductsPricesDocument, options);
      }
export function useProductsPricesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductsPricesQuery, ProductsPricesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductsPricesQuery, ProductsPricesQueryVariables>(ProductsPricesDocument, options);
        }
export type ProductsPricesQueryHookResult = ReturnType<typeof useProductsPricesQuery>;
export type ProductsPricesLazyQueryHookResult = ReturnType<typeof useProductsPricesLazyQuery>;
export type ProductsPricesQueryResult = Apollo.QueryResult<ProductsPricesQuery, ProductsPricesQueryVariables>;
export const ProductsWithoutPricesDocument = gql`
    query ProductsWithoutPrices($pagination: PaginationParams!) {
  products(pagination: $pagination) {
    results {
      id
      title
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
 * __useProductsWithoutPricesQuery__
 *
 * To run a query within a React component, call `useProductsWithoutPricesQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsWithoutPricesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsWithoutPricesQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useProductsWithoutPricesQuery(baseOptions: Apollo.QueryHookOptions<ProductsWithoutPricesQuery, ProductsWithoutPricesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductsWithoutPricesQuery, ProductsWithoutPricesQueryVariables>(ProductsWithoutPricesDocument, options);
      }
export function useProductsWithoutPricesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductsWithoutPricesQuery, ProductsWithoutPricesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductsWithoutPricesQuery, ProductsWithoutPricesQueryVariables>(ProductsWithoutPricesDocument, options);
        }
export type ProductsWithoutPricesQueryHookResult = ReturnType<typeof useProductsWithoutPricesQuery>;
export type ProductsWithoutPricesLazyQueryHookResult = ReturnType<typeof useProductsWithoutPricesLazyQuery>;
export type ProductsWithoutPricesQueryResult = Apollo.QueryResult<ProductsWithoutPricesQuery, ProductsWithoutPricesQueryVariables>;
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
export const RemoveFromCartDocument = gql`
    mutation RemoveFromCart($removeFromCartId: ID!) {
  removeFromCart(id: $removeFromCartId)
}
    `;
export type RemoveFromCartMutationFn = Apollo.MutationFunction<RemoveFromCartMutation, RemoveFromCartMutationVariables>;

/**
 * __useRemoveFromCartMutation__
 *
 * To run a mutation, you first call `useRemoveFromCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFromCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFromCartMutation, { data, loading, error }] = useRemoveFromCartMutation({
 *   variables: {
 *      removeFromCartId: // value for 'removeFromCartId'
 *   },
 * });
 */
export function useRemoveFromCartMutation(baseOptions?: Apollo.MutationHookOptions<RemoveFromCartMutation, RemoveFromCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveFromCartMutation, RemoveFromCartMutationVariables>(RemoveFromCartDocument, options);
      }
export type RemoveFromCartMutationHookResult = ReturnType<typeof useRemoveFromCartMutation>;
export type RemoveFromCartMutationResult = Apollo.MutationResult<RemoveFromCartMutation>;
export type RemoveFromCartMutationOptions = Apollo.BaseMutationOptions<RemoveFromCartMutation, RemoveFromCartMutationVariables>;
export const UpdateCartDocument = gql`
    mutation UpdateCart($updateCartId: ID!, $quantity: Int!) {
  updateCart(id: $updateCartId, quantity: $quantity)
}
    `;
export type UpdateCartMutationFn = Apollo.MutationFunction<UpdateCartMutation, UpdateCartMutationVariables>;

/**
 * __useUpdateCartMutation__
 *
 * To run a mutation, you first call `useUpdateCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCartMutation, { data, loading, error }] = useUpdateCartMutation({
 *   variables: {
 *      updateCartId: // value for 'updateCartId'
 *      quantity: // value for 'quantity'
 *   },
 * });
 */
export function useUpdateCartMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCartMutation, UpdateCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCartMutation, UpdateCartMutationVariables>(UpdateCartDocument, options);
      }
export type UpdateCartMutationHookResult = ReturnType<typeof useUpdateCartMutation>;
export type UpdateCartMutationResult = Apollo.MutationResult<UpdateCartMutation>;
export type UpdateCartMutationOptions = Apollo.BaseMutationOptions<UpdateCartMutation, UpdateCartMutationVariables>;