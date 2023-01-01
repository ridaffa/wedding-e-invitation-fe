import LangConsumer from '../../contexts/LangContexts';
import './style.css';

export default function LandingTitle() {
  const LangContext = LangConsumer();
  const title =
    LangContext.lang === 'id' ? 'UNDANGAN PERNIKAHAN' : 'WEDDING INVITATION';
  return (
    <div className='landing-title'>
      <h2>{title}</h2>
    </div>
  );
}
