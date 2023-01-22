export interface Pagination<T> {
  page: number;
  size: number;
  totalResults: number;
  totalPages: number;
  results: T[];
}

export interface ApiProduct {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ApiRating;
  quantity?: ApiQuantity;
  replacement?: ApiProduct;
}

export interface ApiRating {
  rate: number;
  count: number;
}

export interface ApiQuantity {
  min: number;
  step: number;
  max: number;
}
