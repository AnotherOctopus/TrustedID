import React, { useState, useEffect } from "react";
import './App.css';
import Routes from "./Routes";
import { CookiesProvider } from 'react-cookie';
import { AppContext } from "./libs/contextLib";
//import { Nav, Navbar, NavItem, Button } from "react-bootstrap";
//import { Auth }

// useEffect(() => {
//   onLoad();
// }, []);

// async function onLoad() {
//   try {
//     await Auth.currentSession();
//     userHasAuthenticated(true);
//   }
//   catch(e) {
//     if (e !== 'No current user') {
//       alert(e);
//     }
//   }

//   setIsAuthenticating(false);
// }

//push to main page upon https://serverless-stack.com/chapters/redirect-on-login-and-logout.html
//or use authenticated and unauthenticated Routing

function App() {
  //const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  return (
    <div className="App">
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <CookiesProvider>
          <Routes />
        </CookiesProvider>
      </AppContext.Provider>
    </div>
  );
}

export default App;
