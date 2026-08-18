import axios from "axios";
import type { User } from "../components/UsersTable";


// user client fetchUsers, getUsersByName, getUsersById bunları export ettiğiniz
//başka componentlerden bunları çağırabiliriz.

export const fetchUsers = async ():Promise<User[]> => {

          // ES7  -> yazılan bu koda aslında aşağıdaki kod bloğu tarayıcı engine tarafından yorumlanır.
   const response =  await fetch('https://jsonplaceholder.typicode.com/users') // non bloking çalışır
   const data = await response.json();

    return data;
        
}

// Axios response otomatik olarak json parse eder.
// Axios kendi içinde fatch farklı olarak AxiosResponse, AxiosError gibi typeları vardır
// Fetch API den farklı olarak axios get,post,put,delete gibi methodlara çalışır
// axiosda istek başlangıçı ve bitiş araya girilerek izlenebilir. (Interceptor)

// Not: Sadece clientside çalışırken mantıklı bir çözüm
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    // Request gönderilmeden önce araya girip birşeyler yapar
     console.log('interceptor-request',config);
    return config;
  },function(err) {
    console.log('err',err);
});

axios.interceptors.response.use(function(data) {
    // istek gönderildikten sonra veri çekilmeden önce
    // const data = await response.data; bunu almadan önce araya girdiğimiz kısım.
    console.log('interceptor-response',data);
    return data;
}, function(err) {
    console.log('err',err);
})

export const fetchUsersWithAxios = async ():Promise<User[]> => {

const response =  await axios.get('https://jsonplaceholder.typicode.com/users') // non bloking çalışır
const data = await response.data;

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

