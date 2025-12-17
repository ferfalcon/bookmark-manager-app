import { getApiBaseUrl } from './env'

export type ReadyResponse = { status: 'ok' }

export async function fetchReady(): Promise<ReadyResponse> {
  const base = getApiBaseUrl()
  const res = await fetch(`${base}/readyz`, {
    headers: { Accept: 'application/json' },
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`API error ${res.status}: ${text || res.statusText}`)
  }

  return (await res.json()) as ReadyResponse
}
