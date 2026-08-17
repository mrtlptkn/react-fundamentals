
// Props: componente dışarıdan constructordan gönderilen initial değerler

import { useState } from "react";

type ButtonProps = {
    text?:string; // ? opsiyonel
    onButtonTextChanged?(newState:string):void; // action Props -> Componentten Parent Componete bende birşeyler oldu diyerek event fırlatma durumu.

}

// MyButton büyük olmalı önemli. React da component isimleri büyük yazılır
function MyButton({text,onButtonTextChanged}:ButtonProps){
    console.log('...Button render');

    // propstan gelen değer ile state ilk değerini verdik.
    // deconstruction
    // getter,setter
    // btnText -> değeri okur
    // setButtonText -> setter
    const [btnText,setButtonText] = useState(text);

     // Hook -> Function component içerisindeki akışı yönetmemizi sağlayan özel fonsiyonlar
    // JSX render edecek olan görüntü
    // returndeki JSX yazılım {modelName} model binding ama yukarıdaki {text}:VeriTipi propsa özgü typescript tip tanımlama şekli.
    // text = 'Props Değişti';

    // setTimeout(() => {
    //     console.log('3sn sonra');
    //     // propslar immutable çalışır ve sadece initial value olarak değer atanır.
    //     text = 'Props Değişti';
    // },3000)

    // button tıklandığında çalışacak olan kod
    // arrow function
    const btnClick = () => {
        alert('Button tıklandı');
        // Bu işlemi yapmak için State yapısına ihtiyaç. Sayfanın yeninden render edilmesi re-render edilmesi için props değil state değişmelidir. 
        // propslar immutable çalışır ve sadece initial 
        text='Button Değişti'; // Button1,Button2,Button3
        const newValue = 'Button ' + Math.round(Math.random() * 10);
        setButtonText(newValue);

        // event fırlattık
        if(onButtonTextChanged)
            onButtonTextChanged(newValue)
    }
    // her butonu tıklmada buttonText değişecek. ve ekran bu değişimi render edecek. çünkü state değişimleri virtual domda diff algoritmasını tetikler. component state dğişimi sonrsı yeniden yeni değer ile re-render edilir.

    // event binding onClick={btnClick} -> model binding {text}
    return <button onClick={btnClick}>
        Props -: {text}
        ---------------
        State -: {btnText} 
        </button>
}

// export ettik başka componetten bunu çağıralım
export default MyButton;


// 1.Import & Export Function
// npm run dev
// 2.Props
// 3. Event and Model Bindings
// 4.State
// 5.Hook 


// Component Lifecyles

// Mounting
// Rendering
// Unmounting


