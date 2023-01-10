import React, { createContext, Dispatch, useContext, useState } from 'react';

type MobileType = {
  mobile: boolean;
  setMobile?: Dispatch<React.SetStateAction<boolean>>;
};

const initiateState: MobileType = { mobile: window.innerWidth < 768 };

const MobileContext = createContext<MobileType>(initiateState);

export function MobileProvider({ children }: { children: React.ReactNode }) {
  const [mobile, setMobile] = useState<boolean>(window.innerWidth < 768);

  return (
    <MobileContext.Provider value={{ mobile, setMobile }}>
      {children}
    </MobileContext.Provider>
  );
}

export default function MobileConsumer() {
  return useContext(MobileContext);
}
