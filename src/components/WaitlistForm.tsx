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

        const gtag = (window as Window & {
          gtag?: (command: string, eventName: string, params?: Record<string, string>) => void;
        }).gtag;

        gtag?.('event', 'waitlist_signup', { source });
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
      <div className='waitlist-row'>
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
        <button type='submit' disabled={status === 'loading'}>
          {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
        </button>
      </div>

      <input
        type='text'
        name='company'
        tabIndex={-1}
        autoComplete='off'
        className='honeypot'
        aria-hidden='true'
      />

      <div className='waitlist-messages'>
        {status === 'success' && <p className='success'>You&apos;re on the list. Check your inbox.</p>}
        {status === 'duplicate' && <p className='info'>You are already on the waitlist.</p>}
        {status === 'invalid' && <p className='error'>Please enter a valid email address.</p>}
        {status === 'error' && <p className='error'>Something went wrong. Please try again.</p>}
      </div>
    </form>
  );
};

export default WaitlistForm;
