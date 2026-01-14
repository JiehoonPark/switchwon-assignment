"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { ROUTES } from "@/shared/config";
import { Button, Input, Label } from "@/shared/ui";

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
      },
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <Label htmlFor="email">이메일</Label>
      <Input
        id="email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        autoComplete="email"
        required
        disabled={isPending}
      />
      <Button type="submit" disabled={isPending || !email.trim()}>
        로그인
      </Button>
    </form>
  );
}
