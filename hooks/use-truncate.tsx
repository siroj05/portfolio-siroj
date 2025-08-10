import { useMemo } from "react";

/*
@Note
- Hook untuk memotong teks
* Menggunakan useMemo untuk menghindari perhitungan ulang
* Mengembalikan teks yang dipotong jika melebihi panjang maksimum
*/
export function useTruncate(text: string, maxLength: number) {
  return useMemo(() => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  }, [text, maxLength]);
}
