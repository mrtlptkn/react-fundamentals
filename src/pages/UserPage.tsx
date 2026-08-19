
// Page component olması sebebi ile şuan props yapmadık

import { useCallback, useEffect, useState } from "react";
import UsersTable, { type User } from "../components/UsersTable";
import { fetchUsers, fetchUsersWithAxios } from "../clients/UserClient";
import _ from "lodash";

const UserPage: React.FC  = () => {


   
    // React da apiden veri yüklerken önce sayfa doma mount edilir. first render
    // daha sonra useEffect hook içinde async load fetch function çalışıyor. setState ile
    // state güncelleniyor. O sırada 2.render'a giriyoruz. re-render
    // sayfa 2.render üzerinden yüklü açılıyor

    console.log('...rendering')

    const [users,setUsers] = useState<User[]>([]);
    const [loading,setLoading] = useState(true);

    useEffect(() => {

        // await fetchUsers();
        // `await` is only allowed within async functions and at the top levels of modules
        // sayfa ilk açıldığında api çağırıları tek sefere mahsus ilk yüklemede burada yapılır
       (async () => {
         const response = await fetchUsersWithAxios();
         setUsers(response);
         setLoading(false);
       })();  
       // kendi kendine tetiklenen function yaz.
       // Self-Invoking Functions

       console.log('useEffect');

    }, []);


    // Func memoisation
        // setUsers'a bir fonksiyon verdiğimizde, React bize her zaman
    // en güncel users dizisini 'prevUsers' parametresi ile sağlar.
    // 19.2.8 -> bu verisyona özel bir yazım şeklimi ? 
        // Shallow Copy ile Deep Copy arasındaki fark nedir ? 
        // Referans type değişkenlerde referans değişmez ise virtual dom tetiklenmez.

    //    const newUsers =  _.cloneDeep([...users,item]);
    //     setUsers(newUsers);
    
         // artık yeni dizideki her bir item içinde ... spread operatörü ile yeniden her bir item referansında kopar yepyeni bir referans ile state güncelle. (deep Copy)
    const onItemAddListener = useCallback((item:User) => {
        console.log('item', item);
     

    // lodashsiz versiyon
    setUsers(prevUsers => {
        // En doğru, standart ve performanslı yöntem sığ kopyadır (Shallow Copy).
        // Sadece dizinin referansını yeniliyoruz ve yeni item'ı sonuna ekliyoruz.
        return [...prevUsers, item];
    });
         
    
    },[]) // [] genelde boş dependency kullanırız. Çünkü fonksiyonları genel olarak sayfa unmount olduğı sürece yeniden oluşturmak gereksiz bir maliyettir.

    return <>

    <button onClick={() => {setLoading(!loading)}}>Loading Test</button>

{/* ternary if */}
    {/* {loading ?   <>Loading....</>: <UsersTable users={data} />} */}

    <UsersTable users={users} onItemAdded={onItemAddListener} />
     
    
    </>

}

export default UserPage;