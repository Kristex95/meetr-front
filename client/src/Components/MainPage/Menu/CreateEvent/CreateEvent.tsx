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

import './CreateEvent.css';
import '../Menu.css'
import UsersList from "./UsersList";

import { WebApi } from "../../../../Scripts/webApi";
import MenuInput from "../MenuInput";

export const CreateEvent = (props: {
  isOpen: boolean,
  onOpenChange: (value: boolean) => void,
}) => {
  const [isOpen, setIsOpen] = React.useState(props.isOpen);
  const [step, setStep] = React.useState(0);

  const [eventName, setEventName] = React.useState("");
  const [eventDate, setEventDate] = React.useState<Date | null | undefined>(null);
  const [eventDescription, setEventDescription] = React.useState("");
  const [eventMembers, setEventMembers] = React.useState<WebApi.User[]>([]);
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
    setStep(0);
    setEventName("");
    setEventDate(null);
    setEventDescription("");
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
    setEventMembers(members);
    setValidationMessage("");
  }

  const handle_Cancel_Click = () => {
    setEventMembers([]);
    setValidationMessage("");

    if (step > 0) {
      setStep(step - 1);
    } else {
      closeDialog();
    }
  }

  const handle_Next_Click = async () => {
    setValidationMessage("");

    if (step === 1) {
      console.log(eventMembers);
      if (eventMembers.length === 0) {
        setValidationMessage("Please add at least one user.");
        return;
      }

      setSaving(true);

      try {
        await WebApi.createEventChat({
          name: eventName,
          description: eventDescription,
          participants: eventMembers,
          startDateTime: eventDate?.toISOString(),
          chats: [
            {
              users: eventMembers
            }
          ]
        } as WebApi.Event);

        setSaving(false);
      }
      catch (e: any) {
        setValidationMessage(e.message);
        setSaving(false);

        return;
      }

      closeDialog();
    } else if (step === 0) {
      if (!eventName || !eventDescription || !eventDate) {
        setValidationMessage("Please fill all the fields.");
        return;
      }

      setStep(step + 1);
    }
  }



  return (
    <Dialog open={isOpen} onOpenChange={(event, data) => handle_Dialog_OpenChange(data.open)}>
      <DialogSurface className={`event-create-dialog step` + step} >
        <DialogBody className="dialog-body" >
          <DialogContent>
            <div className="dialog-form">
              {step === 0 ? (
                <div className="dialog-form">
                  <MenuInput value={eventName}>
                    <Input placeholder="Event name" appearance="underline"
                      value={eventName}
                      onChange={(e, d) => setEventName(d.value)} />
                  </MenuInput>

                  <MenuInput value={eventDate}>
                    <DatePicker ref={datePickerRef} placeholder="Event date" appearance="underline"
                      value={eventDate}
                      onSelectDate={d => setEventDate(d)}
                      onOpenChange={(o) => { if (!o) datePickerRef.current.blur() }} />
                  </MenuInput>

                  <MenuInput value={eventDescription}>
                    <Textarea placeholder="Event desctiption" appearance="filled-lighter"
                      value={eventDescription}
                      onChange={(e, d) => setEventDescription(d.value)} />
                  </MenuInput>


                </div>
              ) :
                step === 1 ? (
                  <div style={{ overflowX: "clip" }}>
                    <UsersList onChange={handle_UserList_Change} />
                  </div>

                ) : null}

              {validationMessage &&
                <div className='validation-error'>
                  {validationMessage}
                </div>}
            </div>
          </DialogContent>
          <DialogActions>
            <Button appearance="secondary" onClick={handle_Cancel_Click}>Cancel</Button>
            <Button appearance="primary" onClick={handle_Next_Click}>{step === 1 ? (saving ? <Spinner size="tiny" /> : "Create") : "Next"}</Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};