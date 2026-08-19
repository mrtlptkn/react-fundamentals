import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import MyButton from './components/MyButton'
import UsersTable, { type User } from './components/UsersTable'
import UseRefDemo from './pages/UseRefDemo'
import ContextAPIPage from './pages/ContextAPIPage'


export const AppDefault = ()=> {
  const [count, setCount] = useState(0)
  const onButtonTextChanged = (value:string) => {
    console.log('buton ismi güncellendi' + value);
    setCount(count + 10);
  }

  return <>
   <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
        {/* props ile component içine initial değeri attık */}
       <MyButton />
        <MyButton text='Button2' onButtonTextChanged={onButtonTextChanged} />
        <MyButton text='Button3' onButtonTextChanged={(value:string) => {
          console.log('buton ismi güncellendi' + value);
          setCount(count + 5);
        }}  />
        <MyButton 
        text='Button4' 
        onButtonTextChanged={onButtonTextChanged} />
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
  </>
}

export const Demo01 = () => {

   // ilk açılışta ekranda userTable görünmesin istiyoruz.
  const [showUserTable,setShowUserTable] = useState(false);
  // mockData
  const [users,setUsers] = useState<User[]>([
    {
      id:1,
      name:'Ahmet',
      email:'ahmet@test.com',
      phone:'535 510 13 13'
    },
    {
      id:2,
      name:'Ayşe',
      email:'ayşe@test.com', 
      phone:'532 232 52 25'
    }
  ]); // complex type data array object


  const onItemAddedSubscriber = (user:User) => {
    // [...users,user] -> spread operator ile users object array yeni user object ekle
    setUsers([...users,user]);
  }

  return   <section id="spacer">

{/* setShowUserTable() bizi re-render'a zorlar */}
{/* artık UsersTable güncel showUserTable değişken değeri üzerine re-rendera yer alır. */}

        <input type='checkbox' 
        checked={showUserTable} 
        onChange={(e) => setShowUserTable(e.target.checked)} /> User Table Show/Hide
        <br></br>
        
        {/* güvenli dom manuplasyonu ya domda var yada yok */}
        {showUserTable && <UsersTable users={users} onItemAdded={onItemAddedSubscriber} />}

{/* bu yöntemde state kopyalandığı her UsersTable componenti aynı object refrensını props olarak alır birebir kopya grid oluşur.  */}
        {showUserTable && <UsersTable users={users} onItemAdded={onItemAddedSubscriber} />}

        

      </section>
}




function App() {
  
 
  
  return (
    <>

    {/* <UserPage /> */}

    {/* <AppDefault /> */}

    {/* <Demo01 /> */}

    {/* {<UseRefDemo />} */}

    <ContextAPIPage />
     
    
    </>
  )
}

export default App
