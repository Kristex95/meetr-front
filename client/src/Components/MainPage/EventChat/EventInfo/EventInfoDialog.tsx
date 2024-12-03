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
  FluentProvider,
  webDarkTheme,
} from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { Dismiss24Regular, LockClosedRegular, PersonRegular, InfoRegular, PeopleAddRegular } from "@fluentui/react-icons";

import './EventInfoDialog.css'
import { WebApi } from "../../../../Scripts/webApi";
import SectionButton from "../../../Other/SectionButton/SectionButton";
import { ChangeFieldDialog } from "../../../Other/ChangeFieldDialog/ChangeFieldDialog";
import SectionInfo from "../../../Other/SectionInfo/SectionInfo";
import { AddUsersDialog } from "../../../Other/AddUsersDialog/AddUsersDialog";

export const EventInfoDialog = (props: {
  isOpen: boolean,
  event: WebApi.Event,
  onOpenChange: (value: boolean) => void,
}) => {
  const [isOpen, setIsOpen] = React.useState(props.isOpen);

  React.useEffect(() => {
    setIsOpen(props.isOpen);
  }, [props.isOpen]);

  const handle_Dialog_OpenChange = (value: boolean) => {
    console.log(props.event);
    setIsOpen(value);
    props.onOpenChange(value);
  }

  const handle_Cancel_Click = () => {
    setIsOpen(false);
    props.onOpenChange(false);
  }

  const handle_AddMember_Click = async (users: WebApi.User[], eventId: number) => {
    for (const user of users) {
      await WebApi.addEventMembers(props.event.id, user.id);
    }
  }

  return (
    <FluentProvider theme={webDarkTheme}>
      <Dialog open={isOpen} onOpenChange={(event, data) => handle_Dialog_OpenChange(data.open)}>
        <DialogSurface className="event-info-dialog">
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
              {props.event?.name}
            </DialogTitle>
            <DialogContent>
              <div className="menu-container">
                <SectionInfo
                  content={"Description: " + props.event?.description}
                  icon={InfoRegular} />
                <SectionButton
                  name="Change event name"
                  dialog={p => ChangeFieldDialog({ fieldName: "name", fieldLabel: "Name", ...p })}
                  icon={<PersonRegular />} >
                </SectionButton>
                <SectionButton
                  name="Add Members"
                  dialog={p => AddUsersDialog({...p, title: "Add member", onSave: u => handle_AddMember_Click(u, props.event.id), getUsers: WebApi.getFriends})}
                  icon={<PeopleAddRegular />} >
                </SectionButton>
              </div>
            </DialogContent>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </FluentProvider>
  );
};