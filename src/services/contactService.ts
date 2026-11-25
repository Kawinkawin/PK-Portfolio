import { env } from '../config/env';

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
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
    const isGoogleAppsScript =
      env.contactEndpoint.includes('script.google.com') ||
      env.contactEndpoint.includes('script.googleusercontent.com');

    if (isGoogleAppsScript) {
      await fetch(env.contactEndpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
          ...payload,
          submittedAt: new Date().toISOString(),
        }),
        signal,
      });

      return {
        success: true,
        message: 'Message Sent!',
      };
    }

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
