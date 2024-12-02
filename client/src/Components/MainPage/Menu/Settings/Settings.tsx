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
} from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { Dismiss24Regular, LockClosedRegular, PersonRegular, MailRegular } from "@fluentui/react-icons";

import '../Menu.css';
import './Settings.css'

import SectionButton from "../../../Other/SectionButton/SectionButton";
import { ChangeFieldDialog } from "../../../Other/ChangeFieldDialog/ChangeFieldDialog";
import { ChangeUserPassword } from "./ChangeUserPassword";

export const Settings = (props: {
  isOpen: boolean,
  onOpenChange: (value: boolean) => void,
}) => {
  const [isOpen, setIsOpen] = React.useState(props.isOpen);

  React.useEffect(() => {
    setIsOpen(props.isOpen);
  }, [props.isOpen]);

  const handle_Dialog_OpenChange = (value: boolean) => {
    setIsOpen(value);
    props.onOpenChange(value);
  }

  const handle_Cancel_Click = () => {
    setIsOpen(false);
    props.onOpenChange(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={(event, data) => handle_Dialog_OpenChange(data.open)}>
      <DialogSurface className="user-settings-dialog">
        <DialogBody className="dialog-body">
          <DialogTitle action={
            <DialogTrigger action="close">
              <Button
                appearance="subtle"
                aria-label="close"
                icon={<Dismiss24Regular />}
                onClick={handle_Cancel_Click}
              />
            </DialogTrigger>
          }>
            Settings
          </DialogTitle>
          <DialogContent>
            <div className="menu-container">
              <SectionButton
                name="Change username"
                dialog={p => ChangeFieldDialog({fieldName: "username", fieldLabel: "Username", ...p})}
                icon={<PersonRegular />} >
              </SectionButton>

              <SectionButton
                name="Change email"
                dialog={p => ChangeFieldDialog({fieldName: "email", fieldLabel: "Email", ...p})}
                icon={<MailRegular />} >
              </SectionButton>
              
              <SectionButton
                name="Change password"
                dialog={ChangeUserPassword}
                icon={<LockClosedRegular />} >
              </SectionButton>
            </div>
          </DialogContent>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};