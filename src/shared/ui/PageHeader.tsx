type PageHeaderProps = {
  title: string;
  description?: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-2 pt-10 pb-4">
      <h1 className="text-[40px] font-bold text-gray-700">{title}</h1>
      {description ? (
        <p className="text-base text-gray-700">{description}</p>
      ) : null}
    </header>
  );
}
