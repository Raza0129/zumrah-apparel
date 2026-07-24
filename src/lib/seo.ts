export const SITE_NAME = "Zumrah Apparel";

function stripAndTruncate(text: string, maxLength: number): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= maxLength) return clean;
  return clean.slice(0, maxLength - 1).trimEnd() + "…";
}

export function buildMetaTitle(input: string | null | undefined, fallbackSource: string): string {
  const provided = input?.trim();
  if (provided) return provided;
  return `${stripAndTruncate(fallbackSource, 60)} | ${SITE_NAME}`;
}

export function buildMetaDescription(input: string | null | undefined, fallbackSource: string): string {
  const provided = input?.trim();
  if (provided) return stripAndTruncate(provided, 160);
  return stripAndTruncate(fallbackSource, 160);
}
