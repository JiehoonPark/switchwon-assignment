import { Rss } from "lucide-react";

import { LoginForm } from "@/features/auth";
import { AUTH_REDIRECT_MESSAGES, AUTH_REDIRECT_REASONS } from "@/features/auth";
import { LoginNoticeModal } from "./LoginNoticeModal";

type LoginPageProps = {
  reason?: string;
};

export function LoginPage({ reason }: LoginPageProps) {
  const notice =
    reason === AUTH_REDIRECT_REASONS.unauthorized
      ? AUTH_REDIRECT_MESSAGES.unauthorized
      : null;

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <section className="max-w-[560px] w-full flex flex-col gap-12">
        <header className="flex flex-col items-center">
          <Rss
            aria-hidden="true"
            className="w-[65px] h-[65px] text-blue-500 mb-6"
            strokeWidth={5}
          />
          <div className="font-bold text-[48px] text-gray-700 text-center mb-2 leading-[133%]">
            반갑습니다.
          </div>
          <div className="font-medium text-[32px] text-gray-600 text-center leading-[133%]">
            로그인 정보를 입력해주세요.
          </div>
        </header>

        {notice && <LoginNoticeModal message={notice} />}

        <LoginForm />
      </section>
    </main>
  );
}
