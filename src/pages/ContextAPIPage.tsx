
// client state management için React Context API kullanımı

import React from "react";
import { CounterContext, CounterProvider } from "../contexts/CounterContext"


export const Step1 = () => {
    console.log('...Step1 rendering');

    // güncel state dinler dinleyici
    // güncel ortak global state için CounterContext subscribe olur.

    const { count } = React.useContext(CounterContext)!; // ! ile undefined olamayacağını garanti ettik.

    return (
        <div>
            <h1>Context API Step1</h1>
            <p>Count: {count}</p>
        </div>
    )
}

export const Step2 = () => {

    console.log('...Step2 rendering');

    // bu state günceller

     const { increment, decrement } = React.useContext(CounterContext)!; // ! ile undefined olamayacağını garanti ettik.

    return (
        <div>
            <h1>Context API Step2</h1>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    )
}

// Amaç ortak state kullanımı
//  CounterProvider içerisindeki componentler birbirlerine props drilling yapmadan ortak state paylaşabilecekler.
function ContextAPIPage() {

    const [randomValue, setRandomValue] = React.useState(Math.random());

  return (
    <>
    <button onClick={() => setRandomValue(Math.random())}>Random Value: {randomValue}</button>
        <hr />
        <h1>Context API Demo</h1>
    <CounterProvider>
      <Step1 />
      <Step2 />
    </CounterProvider>
        </>
   
  )
}

export default ContextAPIPage