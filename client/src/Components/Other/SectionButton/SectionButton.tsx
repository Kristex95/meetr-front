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
import { NavigationRegular, PeopleTeamRegular, SettingsRegular } from "@fluentui/react-icons";

import './SectionButton.css';


export default function SectionButton(props: React.HTMLAttributes<HTMLDivElement> & {
  name: string;
  icon: JSX.Element,
  dialog: React.ElementType<{
    isOpen: boolean,
    onOpenChange: (value: boolean) => void,
  }>,
  onClick?: () => void;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handle_MenuButton_Click = () => {
    setIsOpen(!isOpen);
    
    if (props.onClick) {
      props.onClick();
    }
  }

  const handle_Dialog_OpenChange = (value: boolean) => {
    setIsOpen(value);
  }

  return (
    <div>
      <Button
        className="section-button"
        appearance="subtle"
        icon={props.icon}
        onClick={handle_MenuButton_Click} >
        {props.name}
      </Button>
      <props.dialog
        isOpen={isOpen}
        onOpenChange={handle_Dialog_OpenChange}/>
    </div>
  );
};