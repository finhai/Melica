export function currencyFormat(num) {
  return `${num
    .toFixed(2)
    .replace('.', ',')
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, 'R$ 1.')}`;
}
