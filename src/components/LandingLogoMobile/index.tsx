import MobileConsumer from '../../contexts/MobileContext';
import './style.css';

export default function LandingLogoMobile() {
  const MobileContext = MobileConsumer();
  return (
    <div
      className={`landing-logo-mobile ${MobileContext.mobile ? 'active' : ''}`}
    >
      <img
        src={`${process.env.REACT_APP_FE_CDN}landing-logo-mobile.png`}
        alt=''
      />
    </div>
  );
}
