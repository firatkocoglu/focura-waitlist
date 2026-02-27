import { NextRequest, NextResponse } from 'next/server';
import { sendWaitlistThankYouEmail } from '@/lib/email';
import { getSupabaseAdmin } from '@/lib/supabase';
import { isValidEmail, normalizeEmail } from '@/lib/validation';

type RateEntry = {
  count: number;
  resetAt: number;
};

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;
const rateMap = new Map<string, RateEntry>();

const getClientIp = (req: NextRequest) => {
  const header = req.headers.get('x-forwarded-for');
  if (header) {
    return header.split(',')[0].trim();
  }

  return 'unknown';
};

const isRateLimited = (ip: string) => {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (entry.count >= MAX_REQUESTS) {
    return true;
  }

  entry.count += 1;
  return false;
};

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);

    if (isRateLimited(ip)) {
      return NextResponse.json({ ok: false, reason: 'rate_limited' }, { status: 429 });
    }

    const body = await req.json();
    const email = typeof body.email === 'string' ? normalizeEmail(body.email) : '';
    const source =
      typeof body.source === 'string' && body.source.trim().length > 0
        ? body.source.trim()
        : 'landing-main-cta';
    const honeypot = typeof body.company === 'string' ? body.company : '';

    if (honeypot.trim().length > 0) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ ok: false, reason: 'invalid_email' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    const { data: existing, error: existingError } = await supabase
      .from('waitlist_subscribers')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (existingError) {
      return NextResponse.json({ ok: false, reason: 'server_error' }, { status: 500 });
    }

    if (existing) {
      return NextResponse.json({ ok: false, reason: 'duplicate' }, { status: 409 });
    }

    const { error: insertError } = await supabase
      .from('waitlist_subscribers')
      .insert({ email, source });

    if (insertError) {
      return NextResponse.json({ ok: false, reason: 'server_error' }, { status: 500 });
    }

    await sendWaitlistThankYouEmail(email);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false, reason: 'server_error' }, { status: 500 });
  }
}
