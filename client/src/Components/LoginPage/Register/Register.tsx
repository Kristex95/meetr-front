import '../LoginPage.css';
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

import Message from '../../MainPage/Message/Message';
import moment from 'moment';

import { WebApi } from '../../../Scripts/webApi';
import FormInput from '../FormInput/FormInput';

export default function Register(props: {
  onBackToLoginClick: () => void,
  onSignUpClick: (data: WebApi.RegisterInfo) => void,
}) {
  const [validation, setValidation] = React.useState<any>({});

  const validateLogIn = (data: WebApi.RegisterInfo) => {
    if (!data?.username || !data?.password) {
      const newValidation: any = {};

      if (!data?.username) {
        newValidation.username = "Please enter a valid username.";
      }
      if (!data?.email) {
        newValidation.email = "Please enter a valid email.";
      }
      if (!data?.password) {
        newValidation.password = "Please enter a valid password.";
      }

      setValidation(newValidation);

      return false;
    } else {
      setValidation({});
    }

    return true;
  }

  const handle_SignUp_Click = (e: any) => {
    e.preventDefault();

    const data = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    if (!validateLogIn(data)) {
      return;
    }

    console.log(data);
    props.onSignUpClick(data);
  }

  return (
    <div className='form-container register-form-container'>
      <form className='login-form' onSubmit={handle_SignUp_Click}>
        <FormInput type="text" placeholder='Username' name="username" validation={validation} />

        <FormInput type="email" placeholder='Email' name="email" validation={validation} />
        
        <FormInput type="password" placeholder='Password' name="password" validation={validation} />

        <Button type='submit' appearance='primary'>Sign up</Button>
        <Button type='submit' appearance='secondary' onClick={props.onBackToLoginClick}>Back to Log in</Button>
      </form>
    </div>
  );
}