import LangConsumer from '../../contexts/LangContexts';
import './style.css';

export default function LandingDate() {
  const LangContext = LangConsumer();
  const date =
    LangContext.lang === 'id' ? '28 JANUARI 2023' : 'JANUARY 28th 2023';
  return (
    <div className='landing-date'>
      <h3>{date}</h3>
    </div>
  );
}
