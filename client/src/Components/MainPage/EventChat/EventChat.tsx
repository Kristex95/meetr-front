import './EventChat.css';

import React from 'react';
import {
  Avatar,
  Textarea,
  Button,
  TextareaProps,
} from '@fluentui/react-components';
import { SendRegular } from '@fluentui/react-icons';

import Message from './Message/Message';
import moment from 'moment';

import { WebApi } from '../../../Scripts/webApi';
import { WsTypes } from '../../../Scripts/messagingWs';

export default function EventChat(
  props: { chat: WebApi.Chat, 
  event: WebApi.Event, 
  onSendMessageClick: (message: string) => void,
}) {
  const [users, setUsers] = React.useState<WebApi.User[]>();
  const [loadedMessages, setLoadedMessages] = React.useState<WebApi.Message[]>();
  const [messageText, setMessage] = React.useState<string>("");
  const authToken = localStorage.getItem("authToken");
  const [wsService, setWsService] = React.useState<WebSocket | null>(null);

  React.useEffect(() => {
    console.log("Render Event Chat");
    const token = authToken != null ? authToken : "";

    // Load data when chat is available
    const loadData = async () => {
      if (props.chat) {
        const users: WebApi.User[] = await WebApi.getUsers(props.chat.id);
        const messages: WebApi.Message[] = await WebApi.getChatMessages(props.chat.id);
        setUsers(users);
        setLoadedMessages(messages);

        // Create WebSocket connection if chat is present
        const ws = new WebSocket(`ws://localhost:8089/ws?token=${encodeURIComponent(token)}`);

        // WebSocket Event Handlers
        ws.onopen = () => {
          console.log("onOpen");
          const subscriptionMessage = {
            data: { chatId: props.chat.id },
            channel: "message",
            type: "subscribe",
            token: token
          };
          ws.send(JSON.stringify(subscriptionMessage));
        };
    
        ws.onmessage = (event) => {
          setMessage(event.data);
        };
    
        ws.onclose = (event) => {
          console.log('WebSocket closed. Reason:', event.reason);
        };
    
        ws.onerror = (error) => {
          console.error('WebSocket Error:', error);
        };

        // Set WebSocket service
        setWsService(ws);
      }
    };

    loadData();

    // Cleanup WebSocket connection when chat changes or component unmounts
    return () => {
      if (wsService) {
        wsService.close();
      }
    };
  }, [props.chat, props.event]);

  const sendMessage = (msg: any) => {
    if (wsService) {
      msg = JSON.stringify(msg);
      wsService.send(msg);
    }
  };

  const handle_SendMessage_Click = () => {
    if (messageText) {
      props.onSendMessageClick(messageText);

      const preparedMsg : WsTypes.WsMessage = {
        data : {
          chatId: props.chat.id,
          content: messageText
        },
        channel: "message",
        type: "send"
      }
      sendMessage(preparedMsg);
      setMessage("");
    }
  };

  const handle_Message_Change: TextareaProps["onChange"] = (ev, data) => {
    setMessage(data.value);
  };

  const messagesData = loadedMessages?.map((message, i) => ({
    isFromNextUser: loadedMessages[i + 1]?.senderId !== message.senderId,
    fromUser: users?.find(u => message.senderId === u.id),
    content: message.content,
  }));

  return (
    <div className="event-chat-container">
      {messagesData ? (
        <div className="chat-message-list-container">
          <div className="chat-messages-container">
            <Message
              className="chat-message event"
              data={{ message: "Sample event " + props.event.name }}
              event
              startsSequence
              endsSequence />

            {messagesData.map(message => message.isFromNextUser ? (
              <div className='flex-container'>
                <Avatar className='avatar'
                  color="colorful"
                  idForColor={message.fromUser?.id.toString()}
                  aria-label={message.fromUser?.username}
                  name={message.fromUser?.username}/>
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
            <Textarea value={messageText} onChange={handle_Message_Change} />
            <Button icon={<SendRegular />} onClick={handle_SendMessage_Click}></Button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
