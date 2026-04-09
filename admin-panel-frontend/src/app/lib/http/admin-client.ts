import type { ApiErrorPayload, QueryParams, QueryParamValue } from "@/app/lib/types/api";

function appendQueryParam(searchParams: URLSearchParams, key: string, value: Exclude<QueryParamValue, null | undefined>) {
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return;
    }

    searchParams.set(key, value.map(String).join(","));
    return;
  }

  const serializedValue = String(value).trim();
  if (!serializedValue) {
    return;
  }

  searchParams.set(key, serializedValue);
}

export function buildAdminQueryString(query?: QueryParams) {
  if (!query) {
    return "";
  }

  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (value == null) {
      continue;
    }

    appendQueryParam(searchParams, key, value);
  }

  const serialized = searchParams.toString();
  return serialized ? `?${serialized}` : "";
}

export class AdminApiError extends Error {
  status: number;
  details?: unknown;

  constructor({ message, status, details }: ApiErrorPayload) {
    super(message);
    this.name = "AdminApiError";
    this.status = status;
    this.details = details;
  }
}

type FetchAdminJsonOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  query?: QueryParams;
  body?: unknown;
  headers?: HeadersInit;
  cache?: RequestCache;
};

export async function fetchAdminJson<T>(path: string, options: FetchAdminJsonOptions = {}): Promise<T> {
  const { method = "GET", query, body, headers, cache = "no-store" } = options;
  const response = await fetch(`${path}${buildAdminQueryString(query)}`, {
    method,
    cache,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body == null ? undefined : JSON.stringify(body),
  });

  if (!response.ok) {
    let details: unknown;

    try {
      details = await response.json();
    } catch {
      details = await response.text();
    }

    throw new AdminApiError({
      message: response.statusText || "Admin API request failed",
      status: response.status,
      details,
    });
  }

  return response.json() as Promise<T>;
}
