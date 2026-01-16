import Link from "next/link";

import { ROUTES } from "@/shared/config";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-0 px-4">
      <section className="w-full max-w-xl rounded-2xl border border-gray-300 bg-white px-8 py-10 text-center">
        <h1 className="mt-2 text-3xl font-bold text-gray-700">
          페이지를 찾을 수 없어요.
        </h1>
        <p className="mt-3 text-base text-gray-600">
          입력한 주소가 올바른지 확인해 주세요.
        </p>
        <Link
          href={ROUTES.root}
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-cta px-6 py-3 text-base font-semibold text-white"
        >
          홈으로 이동
        </Link>
      </section>
    </main>
  );
}
