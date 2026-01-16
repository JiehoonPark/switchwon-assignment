export const AUTH_REDIRECT_QUERY_KEY = "reason";

export const AUTH_REDIRECT_REASONS = {
  unauthorized: "unauthorized",
} as const;

export type AuthRedirectReason =
  (typeof AUTH_REDIRECT_REASONS)[keyof typeof AUTH_REDIRECT_REASONS];

export const AUTH_REDIRECT_MESSAGES: Record<AuthRedirectReason, string> = {
  unauthorized: "로그인이 만료되었습니다. 다시 로그인해 주세요.",
};
