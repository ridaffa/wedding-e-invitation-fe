import LangConsumer from '../../contexts/LangContexts';
import MobileConsumer from '../../contexts/MobileContext';
import './style.css';

export default function LandingDate() {
  const LangContext = LangConsumer();
  const MobileContext = MobileConsumer();
  return (
    <div className={`landing-date ${MobileContext.mobile ? 'inactive' : ''}`}>
      <h3>{LangContext.lang.header.date}</h3>
    </div>
  );
}
