import React from "react";
import { createContext } from "react";

// o işe özgü veriyi tutuğumuz yapı
export const CounterContext = createContext<CounterContextType | undefined>(undefined);

export type CounterContextType = {
  count: number; // sayacın değerini tutan state
  increment: () => void; // sayacı artıran fonksiyon
  decrement: () => void; // sayacı azaltan fonksiyon
};

// provider ise işi yöneten state yönetim fonksiyonlarını tutan yapı (servis)
// children ise bu state paylaşacağımız componentlerdir. (Consumer)
export const CounterProvider = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = React.useState(localStorage.getItem('count') ? parseInt(localStorage.getItem('count')!) : 0); // sayacın değerini tutan state

  const increment = () => {
    setCount(count + 1);
    localStorage.setItem('count', (count + 1).toString());
  };
  const decrement = () => {
    setCount(count - 1);
    localStorage.setItem('count', (count - 1).toString());
  };

  return (
    <CounterContext.Provider value={{ count, increment, decrement }}>
      {children}
    </CounterContext.Provider>
  );
};

// <AStateProvider value={{sayac: 0, increment: () => {}, decrement: () => {}}>
    // <ComponentA />
    // <ComponentB />
// <AStateProvider/>

