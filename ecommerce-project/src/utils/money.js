export function formatMoney(amountCentt){
    return `$${(amountCentt / 100).toFixed(2)}`;
}