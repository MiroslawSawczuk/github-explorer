export interface ApiResponse<T> {
  total_count: number;
  incomplete_results: boolean;
  items: T;
}

export interface ApiResponsePaginated<T> {
  nextPage: number | undefined;
  items: T;
}
