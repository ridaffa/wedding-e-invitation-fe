import { Link } from 'react-router-dom';
import LangConsumer from '../../contexts/LangContexts';
import MobileConsumer from '../../contexts/MobileContext';
import MusicConsumer from '../../contexts/MusicContexts';
import './style.css';

export default function LandingButton() {
  const MobileContext = MobileConsumer();
  const MusicContext = MusicConsumer();
  const langContext = LangConsumer();
  return (
    <div className={`landing-btn ${MobileContext.mobile ? 'mobile' : ''}`}>
      <Link to='/invitation'>
        <button
          onClick={() => {
            MusicContext.setMusic?.(true);
          }}
        >
          {langContext.lang.landing.button}
        </button>
      </Link>
    </div>
  );
}
