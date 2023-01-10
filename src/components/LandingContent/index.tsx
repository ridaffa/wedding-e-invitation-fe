import MobileConsumer from '../../contexts/MobileContext';
import './style.css';

export default function LandingContent() {
  const MobileContext = MobileConsumer();
  return (
    <div className={`landing-content ${MobileContext.mobile ? 'mobile' : ''}`}>
      <h1>UTI</h1>
      <h1>&nbsp;&&nbsp;</h1>
      <h1>FAISAL</h1>
    </div>
  );
}
