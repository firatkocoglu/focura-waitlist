create extension if not exists pgcrypto;

create table if not exists public.waitlist_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  source text not null default 'landing-main-cta',
  created_at timestamptz not null default now(),
  confirmed boolean not null default false
);

create unique index if not exists waitlist_subscribers_email_unique
  on public.waitlist_subscribers (email);

create index if not exists waitlist_subscribers_created_at_idx
  on public.waitlist_subscribers (created_at desc);
