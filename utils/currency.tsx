export function formatCurrency(value: number | null) {
    if (value === null) return null;
    return new Intl.NumberFormat("id-ID", {
        currency: "IDR",
        currencyDisplay: "symbol",
        currencySign: "standard",
        style: "currency",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}