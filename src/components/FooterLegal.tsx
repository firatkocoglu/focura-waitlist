import Link from 'next/link';
import WaitlistForm from '@/components/WaitlistForm';

const FooterLegal = () => {
  return (
    <footer className='footer'>
      <div className='footer-cta'>
        <h2>Ready to build consistent output?</h2>
        <WaitlistForm source='landing-footer-cta' />
      </div>
      <div className='legal'>
        <span>© {new Date().getFullYear()} Focura</span>
        <div>
          <Link href='/privacy'>Privacy</Link>
          <Link href='/terms'>Terms</Link>
        </div>
      </div>
    </footer>
  );
};

export default FooterLegal;
