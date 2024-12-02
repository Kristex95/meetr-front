import * as React from "react";
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Drawer,
  Button,
  useRestoreFocusSource,
  useRestoreFocusTarget,
} from "@fluentui/react-components";

import './SectionInfo.css';


export default function SectionInfo(props: {
  content?: JSX.Element | string | null,
  icon: React.ElementType<{
    fontSize: number,
    color: string,
  }>,
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handle_Dialog_OpenChange = (value: boolean) => {
    setIsOpen(value);
  }

  return (
    <div className="section-info">
      <div className="section-info-icon">
        <props.icon fontSize={21} color="white" />
      </div>
      <div className="section-info-text">
        {props.content}
      </div>
    </div>
  );
};