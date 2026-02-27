import FooterLegal from '@/components/FooterLegal';
import Hero from '@/components/Hero';

export default function Home() {
  return (
    <main className='landing'>
      <div className='ambient ambient-1' aria-hidden='true' />
      <div className='ambient ambient-2' aria-hidden='true' />

      <Hero />
      <FooterLegal />
    </main>
  );
}
