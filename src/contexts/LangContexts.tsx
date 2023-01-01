import React, { createContext, Dispatch, useContext, useState } from 'react';

type Props = {};

type LangType = {
  lang: string;
  setLang?: Dispatch<React.SetStateAction<string>>;
};

const initiateState: LangType = { lang: 'id' };

const LangContext = createContext<LangType>(initiateState);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState('id');

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export default function LangConsumer() {
  return useContext(LangContext);
}
