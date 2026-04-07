interface Env {
  ASSETS: Fetcher
  TURNSTILE_SECRET_KEY?: string
  FORMSUBMIT_EMAIL?: string
}

interface Fetcher {
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>
}

interface TurnstileResult {
  success: boolean
  'error-codes'?: string[]
}

const DEFAULT_FORMSUBMIT_EMAIL = 'mklotzbach@yahoo.com'
const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

const json = (payload: unknown, status = 200): Response =>
  new Response(JSON.stringify(payload), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
    },
  })

const verifyTurnstile = async (
  secret: string,
  token: string,
  remoteIp: string | null,
): Promise<TurnstileResult> => {
  const body = new URLSearchParams({
    secret,
    response: token,
  })

  if (remoteIp) {
    body.set('remoteip', remoteIp)
  }

  const response = await fetch(TURNSTILE_VERIFY_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    body,
  })

  return (await response.json()) as TurnstileResult
}

const handleOrderRequest = async (request: Request, env: Env): Promise<Response> => {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        Allow: 'POST, OPTIONS',
      },
    })
  }

  if (request.method !== 'POST') {
    return json({ success: false, message: 'Method not allowed.' }, 405)
  }

  let payload: Record<string, unknown>
  try {
    payload = (await request.json()) as Record<string, unknown>
  } catch {
    return json({ success: false, message: 'Invalid request payload.' }, 400)
  }

  const token = typeof payload.turnstileToken === 'string' ? payload.turnstileToken.trim() : ''
  if (!token) {
    return json({ success: false, message: 'Captcha verification is required.' }, 400)
  }

  const secret = env.TURNSTILE_SECRET_KEY
  if (!secret) {
    return json({ success: false, message: 'Server captcha secret is not configured.' }, 500)
  }

  const turnstile = await verifyTurnstile(secret, token, request.headers.get('CF-Connecting-IP'))
  if (!turnstile.success) {
    return json(
      {
        success: false,
        message: 'Captcha verification failed.',
        errors: turnstile['error-codes'] ?? [],
      },
      400,
    )
  }

  const { turnstileToken: _token, ...orderData } = payload
  const recipientEmail = (env.FORMSUBMIT_EMAIL ?? DEFAULT_FORMSUBMIT_EMAIL).trim()
  const requestOrigin = request.headers.get('Origin')
  const requestReferer = request.headers.get('Referer')
  const formSubmitHeaders: Record<string, string> = {
    'content-type': 'application/json',
    accept: 'application/json',
  }

  if (requestOrigin) {
    formSubmitHeaders.origin = requestOrigin
  }

  if (requestReferer) {
    formSubmitHeaders.referer = requestReferer
  }

  const formSubmitResponse = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(recipientEmail)}`,
    {
      method: 'POST',
      headers: formSubmitHeaders,
      body: JSON.stringify({
        ...orderData,
        _captcha: 'false',
        _template: 'table',
      }),
    },
  )

  const formSubmitText = await formSubmitResponse.text()
  let formSubmitResult: { success?: boolean; message?: string } | null = null
  try {
    formSubmitResult = JSON.parse(formSubmitText) as {
      success?: boolean
      message?: string
    }
  } catch {
    formSubmitResult = null
  }

  if (!formSubmitResponse.ok || (formSubmitResult && !formSubmitResult.success)) {
    return json(
      {
        success: false,
        message: 'Unable to send order email right now.',
      },
      502,
    )
  }

  return json({ success: true, message: 'Order request sent.' })
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === '/api/order') {
      try {
        return await handleOrderRequest(request, env)
      } catch {
        return json({ success: false, message: 'Unexpected server error.' }, 500)
      }
    }

    return env.ASSETS.fetch(request)
  },
}
