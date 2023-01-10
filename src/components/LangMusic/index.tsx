import MobileConsumer from '../../contexts/MobileContext';
import './style.css';

export default function LangMusic(props: { children: React.ReactNode }) {
  const MobileContext = MobileConsumer();
  return (
    <div className={`lang-music ${MobileContext.mobile ? 'mobile' : ''}`}>
      {props.children}
    </div>
  );
}
