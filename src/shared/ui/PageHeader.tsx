import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
};

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-2">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-700">{title}</h1>
          {description ? (
            <p className="text-base text-gray-600">{description}</p>
          ) : null}
        </div>
        {actions}
      </div>
    </header>
  );
}
