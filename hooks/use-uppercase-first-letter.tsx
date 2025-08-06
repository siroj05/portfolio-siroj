export function capitalizeFirstLetter(str:string) {
  if (str.length === 0) {
    return ""; // Handle empty strings
  }
  const firstLetter = str.charAt(1).toUpperCase();
  const restOfString = str.slice(2);
  return firstLetter + restOfString;
}