export function getApiBaseUrl(): string {
  const url = import.meta.env.VITE_API_BASE_URL as string | undefined
  if (!url) return 'http://localhost:3000'
  return url.replace(/\/+$/, '') // remove trailing slashes
}
