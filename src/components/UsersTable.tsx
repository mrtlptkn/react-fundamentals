// Kullanıcı bilgilerini tabloda göstermek istediğimiz bir component. Bu componentin içerisinde kullanıcı bilgilerini göstermek için bir tablo oluşturacağız. Kullanıcı bilgilerini props olarak alacağız ve bu bilgileri tablo satırlarında göstereceğiz.
// Kullanıcı bilgilerini props olarak almak için bir interface tanımlayacağız. Bu interface içerisinde kullanıcı bilgilerini tutacak olan değişkenleri tanımlayacağız. Bu değişkenler id, name, email ve phone olacak. Bu değişkenlerin tiplerini de belirleyeceğiz. id number, name string, email string ve phone string olacak.

import { faker } from "@faker-js/faker";
import React, { type CSSProperties } from "react";
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
}

export function UsersTable01({ users }: UsersTableProps) {
  return (
    <></>
  );
};

// React.FC -> Function Component ile Arrow Function yazım şekli
const UsersTable: React.FC<UsersTableProps> = ({ users }) => {

    const [userCount,setUserCount] = React.useState(users.length);

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
    users.push({id:users.length + 1, name:faker.internet.username(),email:faker.internet.email(),phone:faker.phone.number()})

    // 2.Yöntem Parent componente event olarak fırlat ve parent componentte set state çalıştırma
    

    // Eğer component içinden state değişimi olacaksa props'a değer eklendikten sonra virtual bu durumu anlasın diye setState çalıştırmak zorundayız.
    setUserCount(userCount + 1)
  }

  return (
    <>
    Toplam Kullanıcı Sayısı: {userCount}
    <br></br>
    <button onClick={addUser}>1  Adet Kullanıcı Ekle</button>
    <br></br>


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
    {users.map((user:User) =>  

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

export default UsersTable;

