import MobileConsumer from '../../contexts/MobileContext';
import './style.css';

export default function LandingTitle(props: { title: string }) {
  const MobileContext = MobileConsumer();
  return (
    <div className={`landing-title ${MobileContext.mobile ? 'mobile' : ''}`}>
      <h2>{props.title}</h2>
    </div>
  );
}
