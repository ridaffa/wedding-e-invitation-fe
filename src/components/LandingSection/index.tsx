import './style.css';
import MobileConsumer from '../../contexts/MobileContext';

export default function LandingSection(props: { children: React.ReactNode }) {
  const MobileContext = MobileConsumer();
  return (
    <div className='landing-section'>
      <img
        className={`background-img ${MobileContext.mobile ? 'mobile' : ''}`}
        src={`${
          MobileContext.mobile
            ? `${process.env.REACT_APP_FE_CDN}images/foto/cover-mobile.png`
            : `${process.env.REACT_APP_FE_CDN}images/foto/cover.jpg`
        }`}
        alt='Uti dan Faishal'
      />
      {props.children}
    </div>
  );
}
