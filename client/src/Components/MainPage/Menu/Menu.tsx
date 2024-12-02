import * as React from "react";
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Drawer,
  Button,
  useRestoreFocusSource,
  useRestoreFocusTarget,
  FluentProvider,
  webDarkTheme,
} from "@fluentui/react-components";
import { NavigationRegular, PeopleTeamRegular, SettingsRegular } from "@fluentui/react-icons";

import './Menu.css';
import { CreateEvent } from "./CreateEvent/CreateEvent";
import { UserSettings } from "./UserSettings/UserSettings";
import { YesNoDialog } from "./SimpleDialogs/YesNoDialog";


export default function Menu(props: any & {
  onLogOut: () => void;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isNewEventOpen, setIsNewEventOpen] = React.useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [isLogOutOpen, setIsLogOutOpen] = React.useState(false);

  const restoreFocusTargetAttributes = useRestoreFocusTarget();
  const restoreFocusSourceAttributes = useRestoreFocusSource();

  const handle_NewEvent_Click = () => {
    setIsNewEventOpen(!isNewEventOpen);
    setIsOpen(false);
  }

  const handle_Settings_Click = () => {
    setIsSettingsOpen(!isSettingsOpen);
    setIsOpen(false);
  }

  const handle_EventCreate_OpenChange = (value: boolean) => {
    setIsNewEventOpen(value);
  }

  const handle_Settings_OpenChange = (value: boolean) => {
    setIsSettingsOpen(value);
  }

  const handle_LogOut_Click = () => {
    setIsLogOutOpen(true);
  }

  const handle_LogOut_OpenChange = (value: boolean) => {
    setIsLogOutOpen(value);

    if (!value) {
      setIsOpen(false);
    }
  }

  const handle_LogOut = () => {
    props.onLogOut();
  }


  return (
    <FluentProvider theme={webDarkTheme}>
      <div>
        <Drawer
          {...restoreFocusSourceAttributes}
          type={"overlay"}
          separator
          open={isOpen}
          onOpenChange={(_, { open }) => setIsOpen(open)}
        >
          <DrawerHeader>
            <DrawerHeaderTitle>
              Settings
            </DrawerHeaderTitle>
          </DrawerHeader>

          <div className="menu-container">
            <Button
              className="menu-button"
              appearance="subtle"
              icon={<PeopleTeamRegular />}
              onClick={handle_NewEvent_Click} >
              New Event
            </Button>
            <Button
              className="menu-button"
              appearance="subtle"
              icon={<SettingsRegular />}
              onClick={handle_Settings_Click} >
              Settings
            </Button>
            <Button
              className="menu-button end"
              appearance="transparent"
              onClick={handle_LogOut_Click} >
              Log out
            </Button>
          </div>
        </Drawer>

        <Button
          {...restoreFocusTargetAttributes}
          appearance="subtle"
          icon={<NavigationRegular />}
          size="large"
          onClick={() => setIsOpen(!isOpen)}
        >
        </Button>

        <CreateEvent
          isOpen={isNewEventOpen}
          onOpenChange={handle_EventCreate_OpenChange} />

        <UserSettings
          isOpen={isSettingsOpen}
          onOpenChange={handle_Settings_OpenChange} />

        <YesNoDialog content="Are you sure you want to log out?"
          yesLabel="Log out"
          noLabel="Cancel"
          open={isLogOutOpen}
          onYes={handle_LogOut}
          onOpenChange={handle_LogOut_OpenChange}
        />
      </div>
    </FluentProvider>
  );
};