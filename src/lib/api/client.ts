import type { ApiErrorResponse, ApiResponse } from "@/types/api";

import { getToken } from "@/lib/auth/token";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function parseResponse<T>(response: Response): Promise<T> {
  const body = (await response.json()) as ApiResponse<T> | ApiErrorResponse;

  if (!response.ok) {
    const message =
      "message" in body && typeof body.message === "string"
        ? body.message
        : "Something went wrong";
    throw new ApiError(message, response.status);
  }

  return (body as ApiResponse<T>).data;
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit & { auth?: boolean } = {},
): Promise<T> {
  const { auth = true, headers, ...rest } = options;
  const requestHeaders = new Headers(headers);

  if (!requestHeaders.has("Content-Type") && rest.body) {
    requestHeaders.set("Content-Type", "application/json");
  }

  if (auth) {
    const token = getToken();
    if (token) {
      requestHeaders.set("Authorization", `Bearer ${token}`);
    }
  }

  const response = await fetch(`${API_BASE}${path}`, {
    cache: "no-store",
    ...rest,
    headers: requestHeaders,
  });

  return parseResponse<T>(response);
}

export function getErrorMessage(err: unknown, fallback: string): string {
  return err instanceof ApiError ? err.message : fallback;
}
