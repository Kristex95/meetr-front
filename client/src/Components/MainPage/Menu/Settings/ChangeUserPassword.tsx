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
import { Dismiss24Regular, LockClosedRegular, PersonRegular } from "@fluentui/react-icons";

import '../Menu.css';

import { WebApi } from "../../../../Scripts/webApi";
import SectionInput from "../../../Other/SectionInput/SectionInput";

export const ChangeUserPassword = (props: {
  isOpen: boolean,
  onOpenChange: (value: boolean) => void,
}) => {
  const [isOpen, setIsOpen] = React.useState(props.isOpen);
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [newRepeatPassword, setNewRepeatPassword] = React.useState("");
  const [validationMessage, setValidationMessage] = React.useState<string>("");
  const [saving, setSaving] = React.useState<boolean>(false);

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
    setOldPassword("");
    setNewPassword("");
    setNewRepeatPassword("");
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

  const handle_Cancel_Click = () => {
    setIsOpen(false);
    props.onOpenChange(false);
  }

  const handle_Save_Click = async () => {
    if (!oldPassword || !newPassword || !newRepeatPassword) {
      setValidationMessage("Please fill all the fields.");
      return;
    }

    if (newPassword !== newRepeatPassword) {
      setValidationMessage("New password doesn't match repeat password.");

      return;
    }
    else {
      setValidationMessage("");
    }

    setSaving(true);

    try {
      await WebApi.changePassword(oldPassword, newPassword);

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
      <DialogSurface className="change-userinfo-dialog">
        <DialogBody className="dialog-body">
          <DialogContent>
            <div className="dialog-form">
              <SectionInput value={oldPassword}>
                <Input type="password" placeholder="Old password" appearance="underline"
                  value={oldPassword}
                  onChange={(e, d) => setOldPassword(d.value)} />
              </SectionInput>

              <SectionInput value={newPassword}>
                <Input type="password" placeholder="New password" appearance="underline"
                  value={newPassword}
                  onChange={(e, d) => setNewPassword(d.value)} />
              </SectionInput>

              <SectionInput value={newRepeatPassword}>
                <Input type="password" placeholder="Repeat new password" appearance="underline"
                  value={newRepeatPassword}
                  onChange={(e, d) => setNewRepeatPassword(d.value)} />
              </SectionInput>

              {validationMessage &&
                <div className='validation-error'>
                  {validationMessage}
                </div>}
            </div>
          </DialogContent>
          <DialogActions>
            <Button appearance="secondary" onClick={handle_Cancel_Click}>Cancel</Button>
            <Button appearance="primary" onClick={handle_Save_Click}>{saving ? <Spinner size="tiny" /> : "Save"}</Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};