import LangConsumer from '../../contexts/LangContexts';
import './style.css';

export default function LandingButton() {
  const langContext = LangConsumer();
  const button =
    langContext.lang === 'id' ? 'BUKA UNDANGAN' : 'OPEN INVITATION';
  return (
    <div className='landing-btn'>
      <button>{button}</button>
    </div>
  );
}
