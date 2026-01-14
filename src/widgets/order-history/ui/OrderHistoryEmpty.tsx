export function OrderHistoryEmpty() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 py-10 text-center text-gray-600">
      <p className="text-lg font-semibold text-gray-700">
        환전 내역이 없습니다.
      </p>
      <p className="text-sm">첫 환전을 진행해보세요.</p>
    </div>
  );
}
