export function normalizeAmountInput(value: string, zeroValue = "0") {
  if (!value) return zeroValue;
  const sanitized = value.replace(/[^0-9.]/g, "");
  if (!sanitized) return zeroValue;

  const [integerPart, ...decimalParts] = sanitized.split(".");
  const normalizedInteger = integerPart.replace(/^0+(?=\d)/, "") || "0";
  if (decimalParts.length === 0) return normalizedInteger;
  const decimalPart = decimalParts.join("");
  return `${normalizedInteger}.${decimalPart}`;
}
