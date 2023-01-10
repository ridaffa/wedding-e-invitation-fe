import { Link } from 'react-router-dom';
import LangConsumer from '../../contexts/LangContexts';
import MobileConsumer from '../../contexts/MobileContext';
import './style.css';

export default function LandingButton() {
  const MobileContext = MobileConsumer();
  const langContext = LangConsumer();
  return (
    <div className={`landing-btn ${MobileContext.mobile ? 'mobile' : ''}`}>
      <Link to='/invitation'>
        <button>{langContext.lang.landing.button}</button>
      </Link>
    </div>
  );
}
