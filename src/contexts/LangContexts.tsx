import React, { createContext, Dispatch, useContext, useState } from 'react';
import { LangId } from '../lang/LangId';
import { ILang } from '../lang/LangInterface';

type LangType = {
  lang: ILang;
  setLang?: Dispatch<React.SetStateAction<ILang>>;
};

const initiateState: LangType = { lang: LangId };

const LangContext = createContext<LangType>(initiateState);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState(LangId);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export default function LangConsumer() {
  return useContext(LangContext);
}
