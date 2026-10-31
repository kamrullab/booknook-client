"use client";

import { authClient } from "./auth-client";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type ApiOptions = Omit<RequestInit, "headers"> & {
  headers?: HeadersInit;
  authenticated?: boolean;
};

export async function apiRequest<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (options.authenticated) {
    const { data, error } = await authClient.token();
    if (error || !data?.token) {
      throw new ApiError("Your session has expired. Please log in again.", 401);
    }
    headers.set("Authorization", `Bearer ${data.token}`);
  }

  const response = await fetch(`${apiUrl}${path}`, {
    ...options,
    headers,
  });
  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(payload?.message ?? "The request could not be completed.", response.status);
  }

  return payload as T;
}
