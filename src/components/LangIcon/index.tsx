import { MouseEvent } from 'react';
import LangConsumer from '../../contexts/LangContexts';
import './style.css';

export default function LangIcon() {
  const LangContext = LangConsumer();

  const handleLang = (el: MouseEvent<HTMLDivElement>) => {
    if (el.currentTarget.id === 'langId') {
      LangContext.setLang?.('id');
    }
    if (el.currentTarget.id === 'langEn') {
      LangContext.setLang?.('en');
    }
  };

  return (
    <div className='lang-icon'>
      <div
        id='langId'
        onClick={handleLang}
        className={`lang-icon-left ${
          LangContext.lang === 'id' ? 'active' : ''
        }`}
      >
        <span>ID</span>
      </div>
      <div
        id='langEn'
        onClick={handleLang}
        className={`lang-icon-right ${
          LangContext.lang === 'en' ? 'active' : ''
        }`}
      >
        <span>EN</span>
      </div>
    </div>
  );
}
