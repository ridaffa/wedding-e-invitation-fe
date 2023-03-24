import { MouseEvent } from 'react';
import LangConsumer from '../../contexts/LangContexts';
import MobileConsumer from '../../contexts/MobileContext';
import { LangEn } from '../../lang/LangEn';
import { LangId } from '../../lang/LangId';
import './style.css';

export default function LangIcon() {
  const LangContext = LangConsumer();
  const MobileContext = MobileConsumer();

  const handleLang = (el: MouseEvent<HTMLDivElement>) => {
    if (el.currentTarget.id === 'langId') {
      LangContext.setLang?.(LangId);
    }
    if (el.currentTarget.id === 'langEn') {
      LangContext.setLang?.(LangEn);
    }
  };

  return (
    <div className={`lang-icon ${MobileContext.mobile ? 'active-lang' : ''}`}>
      <div
        id='langId'
        onClick={handleLang}
        className={`lang-icon-left ${
          LangContext.lang === LangId ? 'active' : ''
        }`}
      >
        <span>ID</span>
      </div>
      <div
        id='langEn'
        onClick={handleLang}
        className={`lang-icon-right ${
          LangContext.lang === LangEn ? 'active' : ''
        }`}
      >
        <span>EN</span>
      </div>
    </div>
  );
}
