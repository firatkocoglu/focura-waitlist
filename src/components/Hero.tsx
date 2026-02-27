import WaitlistForm from '@/components/WaitlistForm';

const Hero = () => {
  return (
    <section className='hero'>
      <div className='hero-copy'>
        <p className='eyebrow'>Built for iOS</p>
        <h1>Focus better. Execute deeper. Ship consistently.</h1>
        <p>
          Focura is a minimalist focus and execution app designed to eliminate
          distraction and increase daily output.
        </p>
        <div className='hero-points'>
          <span>Structure intentional sessions</span>
          <span>Track meaningful progress</span>
          <span>Turn momentum into daily execution</span>
        </div>
      </div>
      <div className='hero-form'>
        <h2>Join the waitlist</h2>
        <p>Get early access and launch updates.</p>
        <WaitlistForm source='landing-main-cta' />
      </div>
    </section>
  );
};

export default Hero;
