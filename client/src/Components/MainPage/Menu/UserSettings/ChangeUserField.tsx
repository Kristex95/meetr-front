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
import MenuInput from "../MenuInput";

export const ChangeUserField = (props: {
  isOpen: boolean,
  fieldName: string,
  fieldLabel: string,
  onOpenChange: (value: boolean) => void,
}) => {
  const [isOpen, setIsOpen] = React.useState(props.isOpen);
  const [fieldValue, setFieldValue] = React.useState("");
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
    setFieldValue("");
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
    closeDialog();
  }

  const handle_Save_Click = async () => {
    if (!fieldValue) {
      setValidationMessage(`${props.fieldLabel} is empty.`);
      return;
    }

    setSaving(true);

    try {
      await WebApi.changeUserData(({[props.fieldName]: fieldValue} as unknown) as WebApi.User);

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
              <MenuInput value={fieldValue}>
                <Input appearance="underline"
                  placeholder={props.fieldLabel}
                  value={fieldValue}
                  onChange={(e, d) => setFieldValue(d.value)} />
              </MenuInput>


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