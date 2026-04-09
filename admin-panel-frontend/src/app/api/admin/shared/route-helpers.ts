import { NextResponse } from "next/server";

type SerializableValue = string | number | boolean | null | undefined;

export function getAdminBackendBaseUrl() {
  return process.env.ADMIN_BACKEND_URL?.trim() ?? "";
}

export function shouldProxyAdminRequest() {
  return getAdminBackendBaseUrl().length > 0;
}

export function buildBackendUrl(path: string, query?: Record<string, SerializableValue>) {
  const baseUrl = getAdminBackendBaseUrl();
  if (!baseUrl) {
    throw new Error("ADMIN_BACKEND_URL is not configured.");
  }

  const url = new URL(path, baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`);

  for (const [key, value] of Object.entries(query ?? {})) {
    if (value == null) {
      continue;
    }

    const serializedValue = String(value).trim();
    if (!serializedValue) {
      continue;
    }

    url.searchParams.set(key, serializedValue);
  }

  return url;
}

export async function proxyAdminGet<T>(path: string, query?: Record<string, SerializableValue>) {
  const response = await fetch(buildBackendUrl(path, query), {
    method: "GET",
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    let details: unknown;

    try {
      details = await response.json();
    } catch {
      details = await response.text();
    }

    return NextResponse.json(
      {
        message: response.statusText || "Admin backend request failed",
        status: response.status,
        details,
      },
      { status: response.status },
    );
  }

  const payload = (await response.json()) as T;
  return NextResponse.json(payload);
}

export function jsonResponse<T>(payload: T, status = 200) {
  return NextResponse.json(payload, { status });
}
