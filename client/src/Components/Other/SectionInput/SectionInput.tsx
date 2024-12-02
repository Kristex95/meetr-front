import * as React from "react";
import {
  makeStyles,
  Avatar,
  Tag,
  Input,
  TagGroup,
  SearchBox,
  Button
} from '@fluentui/react-components';

import './SectionInput.css';

export default function SectionInput(props: {
  children: any,
  name?: string,
  value: any,
}) {
  return (
    <div className='menu-input'>
      {props.children}
      <div className='menu-input-label'>
        {props.name ? props.name :
          props.value ? props.children.props?.placeholder : ""}
      </div>
    </div>
  );
}