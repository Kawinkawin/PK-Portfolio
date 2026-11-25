import { env } from '../config/env';

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface ContactSubmissionResult {
  success: boolean;
  message: string;
}

export async function submitContactMessage(
  payload: ContactPayload,
  signal?: AbortSignal
): Promise<ContactSubmissionResult> {
  if (env.contactEndpoint) {
    const response = await fetch(env.contactEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
      signal,
    });

    if (!response.ok) {
      throw new Error(`Failed to send message (${response.status})`);
    }

    return {
      success: true,
      message: 'Message Sent!',
    };
  }

  // Preserves original simulated delivery timing when no backend endpoint is configured
  await new Promise<void>((resolve, reject) => {
    const timer = window.setTimeout(resolve, 1500);
    if (signal) {
      signal.addEventListener(
        'abort',
        () => {
          window.clearTimeout(timer);
          reject(new DOMException('Aborted', 'AbortError'));
        },
        { once: true }
      );
    }
  });

  return {
    success: true,
    message: 'Message Sent!',
  };
}
