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

export const AddFriends = (props: {
  isOpen: boolean,
  onOpenChange: (value: boolean) => void,
}) => {
  const [isOpen, setIsOpen] = React.useState(props.isOpen);

  const [friends, setFriends] = React.useState<WebApi.User[]>([]);
  const [validationMessage, setValidationMessage] = React.useState<string>("");
  const [saving, setSaving] = React.useState<boolean>(false);

  const datePickerRef: any = React.useRef();

  React.useEffect(() => {
    setIsOpen(props.isOpen);

    if (props.isOpen) {
      setDefaultState();
    }
  }, [props.isOpen]);

  React.useEffect(() => {
    if (isOpen) {
      setDefaultState();
    }
  }, [isOpen]);

  const setDefaultState = () => {
    setValidationMessage("");
  }

  const closeDialog = () => {
    setIsOpen(false);
    props.onOpenChange(false);
  }

  const handle_Dialog_OpenChange = (value: boolean) => {
    setIsOpen(value);
    props.onOpenChange(value);
  }

  const handle_UserList_Change = (members: WebApi.User[]) => {
    setFriends(members);
    setValidationMessage("");
  }

  const handle_Cancel_Click = () => {
    setFriends([]);
    setValidationMessage("");

    closeDialog();
  }

  const handle_Add_Click = async () => {
    setValidationMessage("");

    if (friends.length === 0) {
      setValidationMessage("Please add at least one user.");
      return;
    }

    setSaving(true);

    try {
      const friendIds = friends.map(friend => friend.id);

      await WebApi.addFriends(friendIds);

      setSaving(false);
    }
    catch (e: any) {
      setValidationMessage(e.message);
      setSaving(false);

      return;
    }

    closeDialog();
  }



  return (
    <Dialog open={isOpen} onOpenChange={(event, data) => handle_Dialog_OpenChange(data.open)}>
      <DialogSurface className="friends-dialog" >
        <DialogBody className="dialog-body" >
          <DialogContent>
            <div className="dialog-form">
              <div style={{ overflowX: "clip" }}>
                <UsersList title="Add friend" onChange={handle_UserList_Change} />
              </div>

              {validationMessage &&
                <div className='validation-error'>
                  {validationMessage}
                </div>}
            </div>
          </DialogContent>
          <DialogActions>
            <Button appearance="secondary" onClick={handle_Cancel_Click}>Cancel</Button>
            <Button appearance="primary" onClick={handle_Add_Click}>Add</Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};