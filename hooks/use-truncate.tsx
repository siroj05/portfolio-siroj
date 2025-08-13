/*
@Note
- Hook untuk memotong teks
* Mengembalikan teks yang dipotong jika melebihi panjang maksimum
*/
export function truncateText(text: string, maxLength: number) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}