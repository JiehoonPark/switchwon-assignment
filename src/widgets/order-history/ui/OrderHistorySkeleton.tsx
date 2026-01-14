import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui";

const HEADERS = ["거래 ID", "거래 일시", "매수 금액", "적용 환율", "매도 금액"];
const SKELETON_ROWS = 6;

function SkeletonCell() {
  return <div className="h-4 w-full animate-pulse rounded bg-gray-300/60" />;
}

export function OrderHistorySkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-300">
      <Table className="min-w-full text-left text-sm">
        <TableHeader className="bg-gray-0">
          <TableRow>
            {HEADERS.map((header) => (
              <TableHead key={header} className="px-4 py-3 font-medium text-gray-600">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: SKELETON_ROWS }).map((_, idx) => (
            <TableRow key={idx} className="border-t border-gray-300">
              <TableCell className="px-4 py-3">
                <SkeletonCell />
              </TableCell>
              <TableCell className="px-4 py-3">
                <SkeletonCell />
              </TableCell>
              <TableCell className="px-4 py-3">
                <SkeletonCell />
              </TableCell>
              <TableCell className="px-4 py-3">
                <SkeletonCell />
              </TableCell>
              <TableCell className="px-4 py-3">
                <SkeletonCell />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
