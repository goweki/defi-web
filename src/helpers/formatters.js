export function trancString(str, len) {
  if (str.length > len) return `${str.substring(0, len)} ...`;
  else return str;
}

export function numberWithCommas(number) {
  return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
