import { LoginPage } from "@/pages/login";
import { AUTH_REDIRECT_QUERY_KEY } from "@/features/auth";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const reasonParam = resolvedSearchParams?.[AUTH_REDIRECT_QUERY_KEY];
  const reason = Array.isArray(reasonParam) ? reasonParam[0] : reasonParam;

  return <LoginPage reason={reason} />;
}
