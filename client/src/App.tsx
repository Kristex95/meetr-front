import React from 'react';

import axios from 'axios';
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

  const handle_LogIn_Click = (data: {user: WebApi.LogInfo, token: string}) => {
    setLogData(data);
    console.log('LOGDATA', data);
    setPageType('main');
  };

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
