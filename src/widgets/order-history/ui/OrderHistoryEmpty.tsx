export function OrderHistoryEmpty() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-gray-300 bg-gray-0 px-6 py-10 text-center text-gray-600">
      <p className="text-lg font-semibold text-gray-700">환전 내역이 없습니다.</p>
      <p className="text-sm">첫 환전을 진행해보세요.</p>
    </div>
  );
}
