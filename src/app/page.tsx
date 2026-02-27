import FeatureBlocks from '@/components/FeatureBlocks';
import FooterLegal from '@/components/FooterLegal';
import Hero from '@/components/Hero';
import SocialProof from '@/components/SocialProof';

export default function Home() {
  return (
    <main className='container'>
      <Hero />
      <SocialProof />
      <FeatureBlocks />
      <FooterLegal />
    </main>
  );
}
