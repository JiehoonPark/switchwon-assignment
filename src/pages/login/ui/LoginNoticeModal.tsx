"use client";

import { useEffect, useId, useState } from "react";
import { AlertTriangle, X } from "lucide-react";

import { Button } from "@/shared/ui";

type LoginNoticeModalProps = {
  message: string;
};

export function LoginNoticeModal({ message }: LoginNoticeModalProps) {
  const [isOpen, setIsOpen] = useState(true);
  const titleId = useId();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center px-4">
      <button
        type="button"
        aria-label="알림 닫기"
        className="absolute inset-0 bg-black/30"
        onClick={() => setIsOpen(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-[420px] rounded-2xl border border-gray-300 bg-white p-6 shadow-xl"
      >
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-danger/10 text-danger">
            <AlertTriangle aria-hidden="true" className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <h2
              id={titleId}
              className="text-lg font-semibold text-gray-700"
            >
              세션 만료
            </h2>
            <p className="mt-2 text-sm leading-5 text-gray-600">{message}</p>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
            aria-label="알림 닫기"
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-6 flex justify-end">
          <Button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-lg bg-cta px-4 py-2 text-sm font-semibold text-white"
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  );
}
