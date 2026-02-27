const RESEND_API_URL = 'https://api.resend.com/emails';

export const sendWaitlistThankYouEmail = async (recipient: string) => {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.WAITLIST_FROM_EMAIL;

  if (!apiKey || !from) {
    return;
  }

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #0f172a;">
      <h2>You're on the Focura waitlist</h2>
      <p>Thanks for joining. We'll keep you posted about iOS launch updates.</p>
      <p>Focura Team</p>
    </div>
  `;

  await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [recipient],
      subject: 'You are on the Focura waitlist',
      html,
    }),
  });
};
