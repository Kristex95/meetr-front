import React from 'react';

import LoginPage from './Components/LoginPage/LoginPage';
import MainPage from './Components/MainPage/MainPage';
import { WebApi } from './Scripts/webApi';

import './variables.css'

import {
  Button,
  FluentProvider,
  webLightTheme,
} from "@fluentui/react-components";

export default function App() {
  const [pageType, setPageType] = React.useState<string>('login');
  const [logData, setLogData] = React.useState<any>(undefined);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if(authToken){
      WebApi.setAuthToken(authToken);
      WebApi.getLoggedInUser()
      .then((response) => {
        if (response) {
          setLogData({ user: response, token: authToken });
          setPageType('main');
        } else {
          console.log("removing token");
          localStorage.removeItem('authToken'); // Clear invalid token
        }
      })
      .catch((error) => {
        console.error('Error validating token:', error);
        localStorage.removeItem('authToken'); // Clear token if validation fails
      })
      .finally(() => setIsLoading(false));
    }
    else {
      setIsLoading(false);
    }
  }, [])

  const handle_LogIn_Click = (data: {user: WebApi.LogInfo, token: string}) => {
    setLogData(data);
    setPageType('main');
  };

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator while checking the token
  }

  return (
    <FluentProvider theme={webLightTheme}>
      {pageType === 'login' ? (
        <LoginPage 
        onLogInClick={handle_LogIn_Click}/>
      ) : (
        <MainPage/>
      )}
      
    </FluentProvider>
  );
}
