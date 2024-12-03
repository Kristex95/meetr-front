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
  Avatar,
} from "@fluentui/react-components";
import { NavigationRegular, PeopleRegular, PeopleAddRegular, PeopleTeamRegular, SettingsRegular } from "@fluentui/react-icons";

import './Menu.css';
import { NewEvent } from "./NewEvent/NewEvent";
import { Settings } from "./Settings/Settings";
import { YesNoDialog } from "../../Other/YesNoDialog/YesNoDialog";
import { AddFriends } from "./AddFriends/AddFriends";
import { WebApi } from "../../../Scripts/webApi";
import { Friends } from "./Friends/Friends";
import { AddUsersDialog } from "../../Other/AddUsersDialog/AddUsersDialog";


export default function Menu(props: any & {
  user: WebApi.User,
  onLogOut: () => void;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isNewEventOpen, setIsNewEventOpen] = React.useState(false);
  const [isAddFriendsOpen, setIsAddFriendsOpen] = React.useState(false);
  const [isFriendsOpen, setIsFriendsOpen] = React.useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [isLogOutOpen, setIsLogOutOpen] = React.useState(false);

  const restoreFocusTargetAttributes = useRestoreFocusTarget();
  const restoreFocusSourceAttributes = useRestoreFocusSource();

  const handle_NewEvent_Click = () => {
    setIsNewEventOpen(!isNewEventOpen);
    setIsOpen(false);
  }

  const handle_Friends_Click = () => {
    setIsFriendsOpen(!isFriendsOpen);
    setIsOpen(false);
  }

  const handle_AddFriends_Click = () => {
    setIsAddFriendsOpen(!isAddFriendsOpen);
    setIsOpen(false);
  }

  const handle_Settings_Click = () => {
    setIsSettingsOpen(!isSettingsOpen);
    setIsOpen(false);
  }

  const handle_EventCreate_OpenChange = (value: boolean) => {
    setIsNewEventOpen(value);
  }

  const handle_Friends_OpenChange = (value: boolean) => {
    setIsFriendsOpen(value);
  }

  const handle_AddFriends_OpenChange = (value: boolean) => {
    setIsAddFriendsOpen(value);
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
              <div className="menu-avatar-container">
                <Avatar
                  color="colorful"
                  size={48}
                  aria-label={"user.username"}
                  name={"user.username"}
                />
                <div style={{ fontSize: "16px" }}>{props.user ? props.user.username : "Loading..."}</div>
              </div>
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
              icon={<PeopleRegular />}
              onClick={handle_Friends_Click} >
              Friends
            </Button>
            <Button
              className="menu-button"
              appearance="subtle"
              icon={<PeopleAddRegular />}
              onClick={handle_AddFriends_Click} >
              Add Friends
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

        <NewEvent
          isOpen={isNewEventOpen}
          onOpenChange={handle_EventCreate_OpenChange} />

        <Friends
          isOpen={isFriendsOpen}
          onOpenChange={handle_Friends_OpenChange} />

        <AddUsersDialog
          title="Add friend"
          isOpen={isAddFriendsOpen}
          onOpenChange={handle_AddFriends_OpenChange}
          onSave={async (users) => {
            const friendIds = users.map(friend => friend.id);

            await WebApi.addFriends(friendIds);
          }} />

        <Settings
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