import React, { createContext, Dispatch, useContext, useState } from 'react';

type MusicType = {
  music: boolean;
  setMusic?: Dispatch<React.SetStateAction<boolean>>;
};

const initiateState: MusicType = { music: false };

const MusicContext = createContext<MusicType>(initiateState);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [music, setMusic] = useState<boolean>(false);

  return (
    <MusicContext.Provider value={{ music, setMusic }}>
      {children}
    </MusicContext.Provider>
  );
}

export default function MusicConsumer() {
  return useContext(MusicContext);
}
