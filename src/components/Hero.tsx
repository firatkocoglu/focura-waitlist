import Image from 'next/image';
import { FaApple } from 'react-icons/fa6';
import WaitlistForm from '@/components/WaitlistForm';

const Hero = () => {
  return (
    <section className='hero'>
      <div className='hero-content'>
        <div className='hero-meta'>
          <Image
            src='/images/focura.png'
            alt='Focura logo'
            width={132}
            height={132}
            className='hero-logo'
          />
          <p className='hero-chip'>
            <FaApple /> iOS Waitlist
          </p>
        </div>
        <h1>Focus better. Execute deeper. Every day.</h1>
        <p className='hero-description'>
          Focura is a minimalist focus and execution app designed to eliminate
          distraction and increase daily output.
        </p>

        <WaitlistForm source='landing-main-cta' />

        <ul className='hero-highlights'>
          <li>
            <strong>Built for iOS</strong>
            <span>Designed for speed and clarity on mobile.</span>
          </li>
          <li>
            <strong>Intentional time tracking</strong>
            <span>Measure real execution, not busywork.</span>
          </li>
          <li>
            <strong>Consistent momentum</strong>
            <span>Turn focused sessions into repeatable progress.</span>
          </li>
        </ul>
      </div>

      <div className='hero-visual' aria-hidden='true'>
        <div className='hero-glow' />
        <div className='phone-frame'>
          <div className='phone-notch' />
          <div className='phone-screen'>
            <div className='app-header'>
              <div className='app-brand'>
                <Image
                  src='/images/focura.png'
                  alt='Focura logo'
                  width={22}
                  height={22}
                />
                <span>Focura</span>
              </div>
              <span className='app-status' />
            </div>

            <div className='app-card app-card-primary'>
              <span>Deep Session</span>
              <strong>90 min</strong>
              <p>Intentional Start: &quot;Ship timer + log flow&quot;</p>
            </div>

            <div className='app-card'>
              <span>Session Controls</span>
              <ul>
                <li>Preset: 60 / 90 / 120 min</li>
                <li>Friction Pause: hold for 3 seconds</li>
                <li>Distraction Log: Social / Message (Home)</li>
              </ul>
            </div>

            <div className='app-card app-card-metric'>
              <div>
                <span>Weekly Focus Score</span>
                <strong>82 / 100</strong>
              </div>
              <div className='progress'>
                <span className='progress-fill' />
              </div>
            </div>

            <div className='app-card'>
              <span>Insights</span>
              <ul>
                <li>Dead Time: 3h 40m distraction cost</li>
                <li>Session Replay: 7 successful sessions</li>
                <li>Zero Distraction Streak: 4 days</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
