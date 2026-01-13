const API_BASE_PATH = "/api";

export type ApiResponse<T> = {
  code: string;
  message: string;
  data: T;
};

export type ApiError<T> = Error & {
  status: number;
  response: ApiResponse<T>;
};

function createApiError<T>(
  status: number,
  response: ApiResponse<T>,
): ApiError<T> {
  return Object.assign(new Error(response.message), { status, response });
}

function buildUrl(path: string) {
  if (path.startsWith("http")) {
    return path;
  }
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_PATH}${normalizedPath}`;
}

type BaseRequestInit = Omit<RequestInit, "body">;
type RequestOptions<Body> = BaseRequestInit & { body?: Body };

async function request<Response, Body = undefined>(
  path: string,
  options: RequestOptions<Body> = {},
) {
  const hasBody = typeof options.body !== "undefined";
  const response = await fetch(buildUrl(path), {
    credentials: "include",
    ...options,
    headers: {
      ...(hasBody ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
    body: hasBody ? JSON.stringify(options.body) : undefined,
  });

  const data = (await response.json()) as ApiResponse<Response>;

  if (!response.ok) {
    throw createApiError(response.status, data);
  }

  return data;
}

export const apiClient = {
  get<Response>(path: string, init: BaseRequestInit = {}) {
    return request<Response>(path, { ...init, method: "GET" });
  },
  post<Response, Body>(path: string, body: Body, init: BaseRequestInit = {}) {
    return request<Response, Body>(path, { ...init, method: "POST", body });
  },
};
