import '../LoginPage.css';
import React from 'react';
import {
  Input,
} from '@fluentui/react-components';
import { WarningRegular } from '@fluentui/react-icons';

export default function FormInput(props: React.ComponentProps<any> | {
  validation: any,
}) {
  const validationMessage = props.validation && props.validation[props.name];

  return !validationMessage ? (
    <Input {...props} />
  ) : (
    <div style={{width: "100%"}}>
      <Input
        className='error'
        contentAfter={<WarningRegular className='error' />}
        {...props} />
      <div className='error'>
        {validationMessage}
      </div>
    </div>
  );
}