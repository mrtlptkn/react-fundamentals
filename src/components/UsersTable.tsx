// Kullanıcı bilgilerini tabloda göstermek istediğimiz bir component. Bu componentin içerisinde kullanıcı bilgilerini göstermek için bir tablo oluşturacağız. Kullanıcı bilgilerini props olarak alacağız ve bu bilgileri tablo satırlarında göstereceğiz.
// Kullanıcı bilgilerini props olarak almak için bir interface tanımlayacağız. Bu interface içerisinde kullanıcı bilgilerini tutacak olan değişkenleri tanımlayacağız. Bu değişkenler id, name, email ve phone olacak. Bu değişkenlerin tiplerini de belirleyeceğiz. id number, name string, email string ve phone string olacak.

import { da, faker } from "@faker-js/faker";
import _ from "lodash";
import React, { useCallback, useMemo, useState, type CSSProperties } from "react";
import { useEffect } from "react";

// Bu component hangi tipte bir veri ile çalışacak
// Backend geliştiren kişiler için front ile back arasındaki veriler için kullandığımız tipler.
// Backend için Dto, Frontend için interface
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface UsersTableProps {
  users: User[];
  onItemAdded?(user:User):void;
}

export function UsersTable01({ users }: UsersTableProps) {
  return (
    <></>
  );
};

// React.FC -> Function Component ile Arrow Function yazım şekli
const UsersTable: React.FC<UsersTableProps> = ({ users,onItemAdded }) => {


    console.log('...child rendering');

    const [userCount,setUserCount] = React.useState(users.length);
    const [searchText,setSearchText] = useState('');

    // React Component  lifecyle
    // 1. mount -> first render
    // 2. updated -> re-render
    // 3. unmount -> component virtual domdan kaldırıldı

    // Test Case 1: useEfect de [] ve [] olmadan kullanımın arasındaki farklar tespit edildi
    // useEffect(() =>{},[]); yerine useEffect(() =>{}) bu şekilde kullanım gereksiz render sorunlarına sebep verir ve tarayıcda istenmeyen peformans sorunları açar dikkat edelim.
    useEffect(() => {
        console.log('UsersTable component mount edildi');

        return () => { // clean up function, component domdan çıkınca tetiklenir.
            console.log('UserTabale component unmounted');
        }

    },[])

    // [userCount] -> userCount state takibi
    useEffect(() => {
        if(userCount > users.length) {
            console.log('UserTabale component state updated');
        }
        
    }, [userCount])


 const tableStyle: CSSProperties = {
    marginTop:'10px',
    borderCollapse: 'collapse',
    width: '100%',
  };

  const cellStyle:CSSProperties = {
    border: '1px solid #ccc',
    padding: '8px',
    textAlign: 'left',
  };


  const addUser = () => {
    // virtual dom tetiklenmesi için ve güncel state değerlerinin react tarafından algılanması için setState şart.
    // 1. Yöntem
    //users.push({id:users.length + 1, name:faker.internet.username(),email:faker.internet.email(),phone:faker.phone.number()})

    


    // 2.Yöntem Parent componente event olarak fırlat ve parent componentte set state çalıştırma
    // 2.Yöntem daha best practice ve daha kullanışlık bir zayıf bağlılık sağlayan bir teknik. 

    // Böyle bir eventimiz varsa
    if(onItemAdded) {
      const event = {id:faker.number.int(), name:faker.internet.username(),email:faker.internet.email(),phone:faker.phone.number()};
      // eventi publish edelim.
      onItemAdded(event);
    }
    

    // Eğer component içinden state değişimi olacaksa props'a değer eklendikten sonra virtual bu durumu anlasın diye setState çalıştırmak zorundayız.
    // setUserCount(userCount + 1)
  }

  // yani component içindeki bir değerin component render aındığında yeniden hesaplanmaması için
  // useMemo hook kullanırız
  // searchText değer değişirse evet filtered Value değişkeni hesaplansın ama bişey değişmezse 
  // başka bir state değişir ve componen render zorlarsa benim filtered value tekrar hesaplanmasın.
 
  const calculateFilteredValue = () => {
      console.log('calculateFilteredValue çalıştı');
    return users.filter(x=> x.name.includes(searchText));
  }

  // Component içindeki bazı hesaplamaların gereksiz yere state değişimlerinde tekrar tekrar hesaplanmaması için değişken değerleri useMemo kullanılarak memoize edilir.
  //useMemo sadece [searchText] değiştiğinde kendini güncellesin şeklinde bir tanımlama yaptık.  
  const filteredValue = useMemo(() => calculateFilteredValue(),[users, searchText]);
  // const filteredValueNoMemo = calculateFilteredValue();



  // Arama yaparken debounce işlemleri ile aranacak değerini değeri kullanıcı arama hızına göre ayarlanmasını sağlayarak gereksiz her bir tuşa basıştaki render almaları ortadan kaldırıyoruz
  const debouncedSearch = useCallback(
  _.debounce((searchValue: string) => {
    console.log('Debounced Arama İsteği Gidiyor:', searchValue);
    // API isteği veya asıl arama işlemi burada yapılır
    // server side search için ise api istekleri arka arkaya atılmaz network istekleri daha rahat yönetilir.
    setSearchText(searchValue);
    // clientside search için rendering işlemleri daha rahat olur
  }, 500),
  [] // Sadece bileşen ilk yüklendiğinde yaratılsın
);


  const onSearchText = (e:any) => {
    console.log('input-value', e.target.value);
    //  setSearchText(e.target.value);
    debouncedSearch(e.target.value);
  }

  return (
    <>
    Toplam Kullanıcı Sayısı: {users.length}
    <br></br>
    <button onClick={addUser}>1  Adet Kullanıcı Ekle</button>
    <br></br>

    <input type="text" onInput={onSearchText} placeholder="arama yapınız" />


<table style={tableStyle}>
    <thead>
    <tr>
        {/* inline-style */}
        <th style={{border:'1px solid #ccc',padding:'8px',textAlign:'left'}}>Ad</th>
        <th style={cellStyle}>Email</th>
        <th style={cellStyle}>Telefon</th>
    </tr>
    </thead>
    {/* reactda listeleme işlemlerinde map function kullanılır */}
    <tbody>
    {filteredValue.map((user:User) =>  

    <tr key={user.id}>
        <td style={cellStyle}>{user.name}</td>
        <td style={cellStyle}>{user.email}</td>
        <td style={cellStyle}>{user.phone}</td>
    </tr>)}
    </tbody>
</table>

    </>
  );
};


// export edilirken component memoisation yapıldı
// ama hala rendering olmaya devam edecek çünkü propstan geçilen değerler ref type değişkenler
// %90 props ref type çalışacak.
// export default UsersTable;
export default React.memo(UsersTable);


// Son Test -> Component React.memo ile sarmalladığında eğer propsları ref type ise bu durumda onItemAdded değerleri için useCallback kullanmak zorundayız. Bunu yazmazsak, component memoise olsada function işi bozuyor. 

