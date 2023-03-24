import { Fade } from 'react-awesome-reveal';
import MobileConsumer from '../../contexts/MobileContext';
import './style.css';

export default function LandingTitle(props: { title: string }) {
  const MobileContext = MobileConsumer();
  return (
    <Fade key={props.title}>
      <div className={`landing-title ${MobileContext.mobile ? 'mobile' : ''}`}>
        <h2>{props.title}</h2>
      </div>
    </Fade>
  );
}
