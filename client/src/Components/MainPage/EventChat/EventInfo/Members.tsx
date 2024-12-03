import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
} from "@fluentui/react-components";
import { WebApi } from "../../../../Scripts/webApi";
import './Members.css';

export const Members = (props: {
  event: WebApi.Event,
  isOpen: boolean,
  onOpenChange: (value: boolean) => void,
}) => {
  const [isOpen, setIsOpen] = React.useState(props.isOpen);
  const [friends, setFriends] = React.useState<WebApi.User[]>([]);
  const [validationMessage, setValidationMessage] = React.useState<string>("");

  React.useEffect(() => {
    setIsOpen(props.isOpen);

    if (props.isOpen) {
      setDefaultState();
      fetchExistingParticipants();
    }
  }, [props.isOpen]);

  React.useEffect(() => {
    if (isOpen) {
      setDefaultState();
      fetchExistingParticipants();
    }
  }, [isOpen]);

  const setDefaultState = () => {
    setValidationMessage("");
  };

  const fetchExistingParticipants = async () => {
    try {
      // Ensure WebApi.getFriends() always returns an array.
      const currentFriends = await WebApi.getChatParticipants(props.event.id) || [];
      setFriends(currentFriends);
    } catch (e: any) {
      setValidationMessage("Failed to fetch members.");
    }
  };

  const closeDialog = () => {
    setIsOpen(false);
    props.onOpenChange(false);
  };

  const handle_Dialog_OpenChange = (value: boolean) => {
    setIsOpen(value);
    props.onOpenChange(value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(event, data) => handle_Dialog_OpenChange(data.open)}>
      <DialogSurface className="friends-dialog">
        <DialogBody className="dialog-body">
          <DialogContent>
            <div className="dialog-form">
              <div style={{ overflowX: "clip" }}>
                <h3>Event Members</h3>
                {/* Render the list of existing friends */}
                <ul>
                  {friends?.length > 0 ? (
                    friends.map((friend) => (
                      <li key={friend.id}>
                        {friend.username}
                      </li>
                    ))
                  ) : (
                    <li>No members found.</li>
                  )}
                </ul>
              </div>

              {validationMessage && (
                <div className='validation-error'>
                  {validationMessage}
                </div>
              )}
            </div>
          </DialogContent>
          <DialogActions>
            <Button appearance="secondary" onClick={closeDialog}>Close</Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};