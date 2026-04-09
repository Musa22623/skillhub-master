export type QueryParamValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Array<string | number | boolean>;

export type QueryParams = Record<string, QueryParamValue>;

export type PaginationDto = {
  page: number;
  pageSize: number;
  totalRows: number;
};

export type ListResponse<TItem> = {
  items: readonly TItem[];
  pagination: PaginationDto;
};

export type SummaryResponse<TStat> = {
  stats: readonly TStat[];
};

export type ApiErrorPayload = {
  message: string;
  status: number;
  details?: unknown;
};
