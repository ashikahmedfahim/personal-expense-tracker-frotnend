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

export function verifyEmail(email: string, code: string): Promise<null> {
  return apiRequest<null>("/v1/users/verify-email", {
    method: "POST",
    body: JSON.stringify({ email, code }),
    auth: false,
  });
}

export function resendVerification(email: string): Promise<null> {
  return apiRequest<null>("/v1/users/resend-verification", {
    method: "POST",
    body: JSON.stringify({ email }),
    auth: false,
  });
}

export function forgotPassword(email: string): Promise<null> {
  return apiRequest<null>("/v1/users/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
    auth: false,
  });
}

export function resetPassword(email: string, code: string, password: string): Promise<null> {
  return apiRequest<null>("/v1/users/reset-password", {
    method: "POST",
    body: JSON.stringify({ email, code, password }),
    auth: false,
  });
}
