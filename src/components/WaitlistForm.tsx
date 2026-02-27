'use client';

import { FormEvent, useState } from 'react';

type Props = {
  source: string;
};

type Status = 'idle' | 'loading' | 'success' | 'duplicate' | 'invalid' | 'error';

const WaitlistForm = ({ source }: Props) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');

    try {
      const formData = new FormData(event.currentTarget);
      const company = String(formData.get('company') || '');

      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source, company }),
      });

      const payload = await response.json();

      if (response.ok) {
        setStatus('success');
        setEmail('');

        const plausible = (window as Window & {
          plausible?: (eventName: string, options?: { props?: Record<string, string> }) => void;
        }).plausible;

        plausible?.('waitlist_signup', { props: { source } });
        return;
      }

      if (payload.reason === 'duplicate') {
        setStatus('duplicate');
        return;
      }

      if (payload.reason === 'invalid_email') {
        setStatus('invalid');
        return;
      }

      setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <form className='waitlist-form' onSubmit={submit}>
      <input
        type='email'
        name='email'
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder='you@example.com'
        required
        autoComplete='email'
        aria-label='Email'
      />
      <input
        type='text'
        name='company'
        tabIndex={-1}
        autoComplete='off'
        className='honeypot'
        aria-hidden='true'
      />
      <button type='submit' disabled={status === 'loading'}>
        {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
      </button>

      {status === 'success' && <p className='success'>You're on the list. Check your inbox.</p>}
      {status === 'duplicate' && <p className='info'>You are already on the waitlist.</p>}
      {status === 'invalid' && <p className='error'>Please enter a valid email address.</p>}
      {status === 'error' && <p className='error'>Something went wrong. Please try again.</p>}
    </form>
  );
};

export default WaitlistForm;
