
// Page component olması sebebi ile şuan props yapmadık

import { useEffect, useState } from "react";
import UsersTable, { type User } from "../components/UsersTable";
import { fetchUsers, fetchUsersWithAxios } from "../clients/UserClient";

const UserPage: React.FC  = () => {


   
    // React da apiden veri yüklerken önce sayfa doma mount edilir. first render
    // daha sonra useEffect hook içinde async load fetch function çalışıyor. setState ile
    // state güncelleniyor. O sırada 2.render'a giriyoruz. re-render
    // sayfa 2.render üzerinden yüklü açılıyor

    console.log('...rendering')

    const [data,setData] = useState<User[]>([]);
    const [loading,setLoading] = useState(true);

    useEffect(() => {

        // await fetchUsers();
        // `await` is only allowed within async functions and at the top levels of modules
        // sayfa ilk açıldığında api çağırıları tek sefere mahsus ilk yüklemede burada yapılır
       (async () => {
         const response = await fetchUsersWithAxios();
         setData(response);
         setLoading(false);
       })();  
       // kendi kendine tetiklenen function yaz.
       // Self-Invoking Functions

    }, []);

    return <>
{/* ternary if */}
    {loading ?   <>Loading....</>: <UsersTable users={data} />}
     
    
    
    </>

}

export default UserPage;