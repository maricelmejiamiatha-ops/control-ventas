export function calculateSubTotal(
  amount: number,
  unitPrice: number,
  discount: number = 0,
): number {
  return Number((amount * unitPrice - discount).toFixed(2));
}