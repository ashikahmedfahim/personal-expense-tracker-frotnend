import { apiRequest } from "@/lib/api/client";
import type { User } from "@/types/api";

export interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export function register(input: RegisterInput): Promise<User> {
  return apiRequest<User>("/v1/users", {
    method: "POST",
    body: JSON.stringify(input),
    auth: false,
  });
}

export function login(input: LoginInput): Promise<string> {
  return apiRequest<string>("/v1/users/login", {
    method: "POST",
    body: JSON.stringify(input),
    auth: false,
  });
}
