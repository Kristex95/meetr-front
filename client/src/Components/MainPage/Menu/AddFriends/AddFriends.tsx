import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
  Input,
  Textarea,
  Spinner,
} from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";

import './AddFriends.css';
import '../Menu.css'
import UsersList from "../../../Other/UsersList/UsersList";

import { WebApi } from "../../../../Scripts/webApi";
import SectionInput from "../../../Other/SectionInput/SectionInput";
import { AddUsersDialog } from "../../../Other/AddUsersDialog/AddUsersDialog";

export const AddFriends = (props: {
  isOpen: boolean,
  onOpenChange: (value: boolean) => void,
}) => {

  const getUsersExceptMe = async () => {
    const users = await WebApi.getUsers();
    const currentUser = await WebApi.getLoggedInUser();

    console.log(currentUser);
    return users.filter(f => f.id !== currentUser.id);
  }

  return (
    <AddUsersDialog
          title="Add friend"
          isOpen={props.isOpen}
          onOpenChange={props.onOpenChange}
          onSave={async (users) => {
            const friendIds = users.map(friend => friend.id);

            await WebApi.addFriends(friendIds);
          }}
          getUsers={getUsersExceptMe} />
  );
};