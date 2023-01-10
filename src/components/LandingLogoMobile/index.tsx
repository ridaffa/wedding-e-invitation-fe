import LandingLogoMobileImg from '../../assets/landing-logo-mobile.png';
import MobileConsumer from '../../contexts/MobileContext';
import './style.css';

export default function LandingLogoMobile() {
  const MobileContext = MobileConsumer();
  return (
    <div
      className={`landing-logo-mobile ${MobileContext.mobile ? 'active' : ''}`}
    >
      <img src={LandingLogoMobileImg} alt='' />
    </div>
  );
}
