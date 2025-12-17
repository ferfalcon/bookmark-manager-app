import { useEffect, useState } from 'react'
import { fetchReady } from '../lib/api'
import { getApiBaseUrl } from '../lib/env'

type State =
  | { status: 'loading' }
  | { status: 'ok' }
  | { status: 'error'; message: string }

export function ApiStatus() {
  // Start in loading so we don't setState synchronously on mount.
  const [state, setState] = useState<State>({ status: 'loading' })

  async function check() {
    try {
      await fetchReady()
      setState({ status: 'ok' })
    } catch (err) {
      setState({
        status: 'error',
        message: err instanceof Error ? err.message : 'Unknown error',
      })
    }
  }

  async function recheck() {
    setState({ status: 'loading' })
    await check()
  }

  useEffect(() => {
    let cancelled = false

    void (async () => {
      try {
        await fetchReady()
        if (!cancelled) setState({ status: 'ok' })
      } catch (err) {
        if (!cancelled) {
          setState({
            status: 'error',
            message: err instanceof Error ? err.message : 'Unknown error',
          })
        }
      }
    })()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div style={{ padding: 16, border: '1px solid #444', borderRadius: 12 }}>
      <h2 style={{ marginTop: 0 }}>API connectivity</h2>
      <p style={{ margin: 0 }}>
        Base URL: <code>{getApiBaseUrl()}</code>
      </p>

      <div style={{ marginTop: 12 }}>
        {state.status === 'loading' && <p>Checking…</p>}
        {state.status === 'ok' && <p>✅ Backend is reachable (`/readyz`)</p>}
        {state.status === 'error' && (
          <p>
            ❌ Failed: <code>{state.message}</code>
          </p>
        )}
      </div>

      <button type="button" onClick={recheck} disabled={state.status === 'loading'}>
        Re-check
      </button>
    </div>
  )
}
