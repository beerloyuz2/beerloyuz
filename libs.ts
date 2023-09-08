import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  hour: "2-digit",
  minute: "2-digit"
})
