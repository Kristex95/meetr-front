import React from 'react';
import {
  useId,
  Label,
  Textarea,
  Button,
  TextareaProps,
  Input,
} from '@fluentui/react-components';
import { SendRegular, } from '@fluentui/react-icons';
import LogIn from './LogIn/LogIn';
import Register from './Register/Register';
import { WebApi } from '../../Scripts/webApi';

export default function LoginPage(props: {
  onLogInClick: (data: {user: WebApi.LogInfo, token: string}) => void,
}) {
  const [pageType, setPageType] = React.useState<string>('login');

  const handle_CreateNewAccount_Click = () => {
    setPageType('register');
  };

  const handle_toLogin_Click = () => {
    setPageType('login');
  };

  const handle_SignUp_Click = async (data: WebApi.RegisterInfo) => {
    await WebApi.registerUser(data);

    setPageType('login');
  };

  const handle_LogIn_Click = async (data: WebApi.LogInfo) => {
    try {
      const result: any = await WebApi.logUser(data);
      localStorage.setItem('authToken', result.data.token);
      WebApi.setAuthToken(result.data.token);
      props.onLogInClick({
        user: data,
        token: result.data.token
      });
    }
    catch (e: any) {
      throw new Error(e.response.data.message ?? e.response.data);
    }
  };

  return (
    <div className="login-main">
      <div className='login-main-container'>
        <div className="form-title">
          <h2>{pageType === 'login' ? 'Log in' : 'Register'}</h2>
        </div>
        {pageType === 'login' ?
          <LogIn
            onLogInClick={handle_LogIn_Click}
            onCreateNewAccountClick={handle_CreateNewAccount_Click} /> :
          <Register
            onBackToLoginClick={handle_toLogin_Click}
            onSignUpClick={handle_SignUp_Click} />
        }
      </div>
    </div>
  );
}