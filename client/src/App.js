import React, { useState } from 'react';
import './styles/App.scss';
import Header from './components/Header';
import Main from './Main';
import LogginBanner from './components/LogginBanner';
import { UserContext } from './context/LoginContext';

function App() {
  const [accessToken,setAccessToken] = useState(null);
  const [userInfo,setUserInfo] = useState({
    id: null,
    email: null,
    picture: null,
    verified_email: null,
    token_amount: null,
    address: null,
  })
  const [curRoute,setCurRoute] = useState('/');



  return (

    <div className="App">
      <UserContext.Provider value={{userInfo,setUserInfo,accessToken,setAccessToken}}>
        <Header curRoute={curRoute} setCurRoute={setCurRoute}></Header>
        <Main ></Main>
        {
          accessToken===null&&<LogginBanner ></LogginBanner>
        }

      </UserContext.Provider>
    </div>
  );
}

export default App;
