import { useRef, useState } from "react";

// React da render almadan değişkenin değerini arkaplanda saklamak için useRef hook kullanılır. useRef ile oluşturulan değişkenler component render edildiğinde yeniden oluşturulmaz. Componentin yaşam döngüsü boyunca aynı referans ile kalır. Bu sayede stale closure sorununu önleriz.
// stale closure açıklayalım
// React da component render edildiğinde, component içindeki fonksiyonlar ve değişkenler yeniden oluşturulur. Bu nedenle, bir fonksiyonun içinde bir değişkenin değerini kullanıyorsak, o değişkenin değeri render sırasında sabit kalır. Eğer o değişkenin değeri değişirse, fonksiyonun içinde o değişkenin eski değeri kullanılmaya devam eder. Bu duruma stale closure denir. useRef ile oluşturulan değişkenler ise component render edildiğinde yeniden oluşturulmaz ve aynı referans ile kalır. Bu sayede stale closure sorununu önleriz.

function UseRefDemo() {

console.log('...rendering UseRefDemo component');

  const [count, setCount] = useState(0); // localState
  const countRef = useRef(0); // useRef ile oluşturulan değişkenler component render edildiğinde yeniden oluşturulmaz. Componentin yaşam döngüsü boyunca aynı referans ile kalır. Bu sayede stale closure sorununu önleriz.

  const inputRef = useRef<HTMLInputElement>(null); // input elementine referans oluşturduk. input elementine erişmek için kullanacağız.

  // UseRef en çok kullanılan yer input text elemelneleri, çünkü input içerisinde bir değer yazıldığında sürekli state güncellenir ve componeti re-render zorlar. Bun durumda gereksiz render oluşur. Form gönderilene kadar input değerlerini optimizasyon amacı ile useRefe değişkenlerde saklarız. Ve böyle form işlemlerini daha verimli yönetiriz. 

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <button onClick={() => countRef.current++}>Increment Ref</button>
      
      
      <p>Ref Value: {countRef.current}</p>

        <br></br>
        <input ref={inputRef} />
        <button onClick={() => {console.log('Input Value:', inputRef.current?.value)
        }}>Show Input Value</button>
    </div>
  );
}

export default UseRefDemo;