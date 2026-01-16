type ApiErrorPayload = {
  response?: {
    message?: string;
    data?: unknown;
  };
};

function getFirstValidationMessage(data: unknown): string | null {
  if (!data) return null;
  if (typeof data === "string") return data;
  if (typeof data === "object") {
    const messages = Object.values(data).filter(
      (value) => typeof value === "string"
    ) as string[];
    return messages[0] ?? null;
  }
  return null;
}

export function getApiErrorMessage(error: unknown): string | null {
  if (!error || typeof error !== "object") return null;
  if ("response" in error) {
    const payload = error as ApiErrorPayload;
    const validationMessage = getFirstValidationMessage(payload.response?.data);
    return validationMessage ?? payload.response?.message ?? null;
  }
  if ("message" in error) {
    const payload = error as { message?: unknown };
    if (typeof payload.message === "string") {
      return payload.message;
    }
  }
  return null;
}

export function isUnauthorizedError(error: unknown) {
  if (!error || typeof error !== "object") return false;
  if ("status" in error) {
    const status = (error as { status?: number }).status;
    if (status === 401) return true;
  }
  if ("response" in error) {
    const response = (error as { response?: { code?: string } }).response;
    if (response?.code === "UNAUTHORIZED") return true;
  }
  return false;
}
