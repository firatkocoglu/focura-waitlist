import Link from 'next/link';

const FooterLegal = () => {
  return (
    <footer className='footer'>
      <section className='legal'>
        <span>© {new Date().getFullYear()} Focura</span>
        <div>
          <Link href='/privacy'>Privacy</Link>
          <Link href='/terms'>Terms</Link>
        </div>
      </section>
    </footer>
  );
};

export default FooterLegal;
