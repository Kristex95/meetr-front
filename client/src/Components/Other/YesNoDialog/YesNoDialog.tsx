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

import './YesNoDialog.css';

export const YesNoDialog = (props: {
  open: boolean,
  title?: string,
  content: string,
  yesLabel?: string,
  noLabel?: string,
  onYes: () => void,
  onNo?: () => void,
  onOpenChange: (value: boolean) => void,
}) => {
  const [isOpen, setIsOpen] = React.useState(props.open);

  React.useEffect(() => {
    setIsOpen(props.open);
  }, [props.open]);

  const closeDialog = () => {
    setIsOpen(false);
    props.onOpenChange(false);
  }

  const handle_Dialog_OpenChange = (value: boolean) => {
    setIsOpen(value);
    props.onOpenChange(value);
  }

  const handle_Yes_Click = async () => {
    closeDialog();
    props.onYes();
  }

  const handle_No_Click = () => {
    closeDialog();

    if (props.onNo)
      props.onNo();
  }

  return (
    <Dialog open={isOpen} onOpenChange={(event, data) => handle_Dialog_OpenChange(data.open)}>
      <DialogSurface className="yesno-dialog">
        <DialogBody className="dialog-body">
          {props.title && (
            <DialogTitle>Dialog title</DialogTitle>
          )}
          <DialogContent>
            {props.content}
          </DialogContent>
          <DialogActions>
            <Button appearance="secondary" onClick={handle_No_Click}>{props.noLabel ?? "No"}</Button>
            <Button appearance="primary" onClick={handle_Yes_Click}>{props.yesLabel ?? "Yes"}</Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};