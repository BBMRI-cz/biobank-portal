import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { ConfigProvider } from './ConfigProvider'
import { useConfig } from './configContext'

const validConfig = {
  oidc: {
    authority: 'https://login.example.org/realms/biobank',
    clientId: 'biobank-portal',
    scope: 'openid profile email',
  },
}

function ClientId() {
  return <p>{useConfig().oidc.clientId}</p>
}

function renderProvider() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={queryClient}>
      <ConfigProvider apiBaseUrl="http://localhost:8080/api">
        <ClientId />
      </ConfigProvider>
    </QueryClientProvider>,
  )
}

describe('ConfigProvider', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders children with the loaded config', async () => {
    vi.stubGlobal('fetch', vi.fn<typeof fetch>().mockResolvedValue(Response.json(validConfig)))

    renderProvider()

    expect(screen.getByRole('status')).toHaveTextContent('Loading configuration')
    expect(await screen.findByText('biobank-portal')).toBeInTheDocument()
  })

  it('shows an error and retries on demand', async () => {
    const fetchFn = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(new Response(null, { status: 503 }))
      .mockResolvedValueOnce(Response.json(validConfig))
    vi.stubGlobal('fetch', fetchFn)

    renderProvider()

    expect(await screen.findByRole('alert')).toHaveTextContent('HTTP 503')
    await userEvent.click(screen.getByRole('button', { name: 'Try again' }))
    expect(await screen.findByText('biobank-portal')).toBeInTheDocument()
  })
})
