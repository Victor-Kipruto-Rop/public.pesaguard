export const docsBaseUrl = "https://docs.pesaguard.co.ke/";

export function docsUrl(path = ""): string {
  return new URL(path.replace(/^\/+/, ""), docsBaseUrl).toString();
}
