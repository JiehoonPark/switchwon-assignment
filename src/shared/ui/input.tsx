import * as React from "react";

type InputProps = React.ComponentProps<"input">;

function Input({ className, ...props }: InputProps) {
  return <input data-slot="input" className={className} {...props} />;
}

export { Input };
export type { InputProps };
