import { useState } from "react";

export function useFormErrors() {
  const [formError, setFormError] = useState<string | null>(null);
  const [lastSubmitErrorInput, setLastSubmitErrorInput] = useState<
    string | null
  >(null);

  const clearFormError = () => {
    if (formError) {
      setFormError(null);
    }
  };

  const resetFormErrors = () => {
    if (lastSubmitErrorInput) {
      setLastSubmitErrorInput(null);
    }
    clearFormError();
  };

  const resetSubmitErrorOnAmountChange = (nextValue: string) => {
    if (lastSubmitErrorInput && lastSubmitErrorInput !== nextValue) {
      setLastSubmitErrorInput(null);
    }
  };

  return {
    clearFormError,
    formError,
    lastSubmitErrorInput,
    resetFormErrors,
    resetSubmitErrorOnAmountChange,
    setFormError,
    setLastSubmitErrorInput,
  };
}
