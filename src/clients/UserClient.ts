import type { User } from "../components/UsersTable";


// user client fetchUsers, getUsersByName, getUsersById bunları export ettiğiniz
//başka componentlerden bunları çağırabiliriz.

export const fetchUsers = async ():Promise<User[]> => {

          // ES7  -> yazılan bu koda aslında aşağıdaki kod bloğu tarayıcı engine tarafından yorumlanır.
   const response =  await fetch('https://jsonplaceholder.typicode.com/users') // non bloking çalışır
   const data = await response.json();

    return data;
        
}

// ES6 yazım şekli 
//     fetch('https://jsonplaceholder.typicode.com/users')
//    .then(response => {
//     return response.json()
//    })
//    .then(data => {
//      return data;
//    }).catch(err => {
//     console.log('err',err);
//    })

