import '../LoginPage.css';
import React from 'react';
import FormInput from '../FormInput/FormInput';
import { WebApi } from '../../../Scripts/webApi';

import {
  Button,
} from '@fluentui/react-components';

export default function Login(props: {
  onCreateNewAccountClick: () => void,
  onLogInClick: (data: WebApi.LogInfo) => Promise<void>,
}) {
  const [validation, setValidation] = React.useState<any>({});
  const [validationMessage, setValidationMessage] = React.useState<string>('');

  const validateLogIn = (data: WebApi.LogInfo) => {

    if (!data?.username || !data?.password) {
      const newValidation: any = {};

      if (!data?.username) {
        newValidation.username = "The username you entered isn’t connected to an account.";
      }
      if (!data?.password) {
        newValidation.password = "The password you’ve entered is incorrect.";
      }

      setValidation(newValidation);

      return false;
    } else {
      setValidation({});
    }

    return true;
  }

  const handle_LogIn_Click = async (e: any) => {
    e.preventDefault();

    const data = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    if (!validateLogIn(data)) {
      return;
    }

    try {
      await props.onLogInClick(data);
    }
    catch (e: any) {
      setValidationMessage(e.message);
    }
  }

  return (
    <div className='form-container login-form-container'>
      <form className='login-form' onSubmit={handle_LogIn_Click}>
        <FormInput type="text" placeholder='Username' name="username" validation={validation} />

        <FormInput type="password" placeholder='Password' name="password" validation={validation} />

        {validationMessage &&
          <div className='error'>
            {validationMessage}
          </div>}

        <Button type='submit' appearance='primary'>Log in</Button>
        <Button appearance='secondary' onClick={props.onCreateNewAccountClick}>Create new account</Button>
      </form>
    </div>
  );
}