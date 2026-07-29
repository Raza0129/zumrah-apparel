import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Only allow same-site relative paths to prevent open-redirect via a query param. */
export function safeCallbackUrl(url: string | null | undefined, fallback: string): string {
  if (url && url.startsWith("/") && !url.startsWith("//")) return url;
  return fallback;
}
