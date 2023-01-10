import './style.css';
import cover from '../../assets/Foto/cover.jpg';
import converMobile from '../../assets/Foto/cover-mobile.png';
import MobileConsumer from '../../contexts/MobileContext';

export default function LandingSection(props: { children: React.ReactNode }) {
  const MobileContext = MobileConsumer();
  return (
    <div className='landing-section'>
      <img
        className={`background-img ${MobileContext.mobile ? 'mobile' : ''}`}
        src={`${MobileContext.mobile ? converMobile : cover}`}
        alt='Uti dan Faisal'
      />
      {props.children}
    </div>
  );
}
