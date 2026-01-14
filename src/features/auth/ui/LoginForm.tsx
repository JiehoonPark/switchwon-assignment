"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { ROUTES } from "@/shared/config";
import { Button, Input } from "@/shared/ui";

import { useLoginMutation } from "../model/useLoginMutation";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const { mutate, isPending } = useLoginMutation();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      return;
    }

    mutate(
      { email: trimmedEmail },
      {
        onSuccess: () => {
          router.replace(ROUTES.exchange);
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col max-w-[560px] rounded-[20px] border border-gray-300 bg-gray-0 px-8 py-6 gap-8"
    >
      <div className="flex flex-col gap-3">
        <div className="font-medium text-[20px] text-gray-600">
          이메일 주소를 입력해주세요.
        </div>

        <Input
          type="email"
          value={email}
          className="h-[72px] rounded-xl border border-gray-700 bg-white p-6 text-[20px] font-semibold text-gray-600 outline-none"
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
          placeholder="test@test.com"
          disabled={isPending}
        />
      </div>

      <Button
        type="submit"
        disabled={isPending || !email.trim()}
        className="h-[76px] w-full rounded-xl bg-cta text-[22px] font-bold text-white"
      >
        로그인 하기
      </Button>
    </form>
  );
}
