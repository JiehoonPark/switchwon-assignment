type SpinnerProps = {
  size?: number;
};

export function Spinner({ size = 32 }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="로딩 중"
      className="inline-block animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"
      style={{ width: size, height: size }}
    />
  );
}
