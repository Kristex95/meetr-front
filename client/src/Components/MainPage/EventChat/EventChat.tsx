import './EventChat.css';
import React from 'react';
import {
  Avatar,
  Textarea,
  Button,
  TextareaProps,
} from '@fluentui/react-components';
import { SendRegular, } from '@fluentui/react-icons';

import Message from './Message/Message';
import moment from 'moment';

import { WebApi } from '../../../Scripts/webApi';

export default function EventChat(props: {
  data: {
    chat: {
      eventName: string,
    }
    messages: [
      {
        content: string,
        fromUserId: string,
      }
    ],
  },
  onSendMessageClick: (message: string) => void,
}) {
  const [users, setUsers] = React.useState<any[] | undefined>(undefined);
  const [message, setMessage] = React.useState<string>("");

  React.useEffect(() => {
    const loadData = async () => {
      const users = await WebApi.getUsers();

      //setUsers(users);
    };

    loadData();
  }, []);

  const handle_SendMessage_Click = () => {
    if (message) {
      props.onSendMessageClick(message);
      setMessage("");
    }
  };

  const handle_Message_Change: TextareaProps["onChange"] = (ev, data) => {
    setMessage(data.value);
  };

  const messagesData = props.data?.messages.map((message, i) => ({
    isFromNextUser: props.data.messages[i + 1]?.fromUserId !== message.fromUserId,
    fromUser: users?.find(u => message.fromUserId === u.id),
    content: message.content,
  }));

  return (
    <div className="event-chat-container">
      {messagesData ? (
        <div className="chat-message-list-container">
          <div className="chat-messages-container">
            <Message
              className="chat-message event"
              data={{ message: "Sample event " + props.data.chat.eventName }}
              event
              startsSequence
              endsSequence />

            {messagesData.map(message => message.isFromNextUser ? (
              <div className='flex-container'>
                <Avatar className='avatar'
                  color="colorful"
                  idForColor={message.fromUser?.id}
                  aria-label={message.fromUser?.name}
                  name={message.fromUser?.name}/>
                <Message className="chat-message avatar"
                  data={{ message: message.content }}
                  startsSequence />
              </div>
            ) : (
              <Message
                className="chat-message"
                data={{ message: message.content }}
                startsSequence
                endsSequence />
            ))}
            
          </div>
          <div className='send-message-containter'>
            <Textarea value={message} onChange={handle_Message_Change} />
            <Button icon={<SendRegular />} onClick={handle_SendMessage_Click}></Button>
          </div>
        </div>
      ) : (
        <div>
        </div>
      )}

    </div>
  );
}