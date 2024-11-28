import React from 'react';
import EventChat from "./EventChat/EventChat";
import EventChatList from "./EventChatList/EventChatList";
import NoEventChats from "./NoEventChats/NoEventChats";
import { WebApi } from '../../Scripts/webApi';

import "./MainPage.css";

export default function MainPage() {
  const [chats, setChats] = React.useState<WebApi.Chat[]>([]);
  const [events, setEvents] = React.useState<WebApi.Event[]>([]);
  const [selectedEventChat, setSelectedEventChat] = React.useState<any>(undefined);

  const handle_EventChatList_Click = async (eventChat: any) => {
    const messages = await WebApi.getChatMessages(eventChat.id);

    setSelectedEventChat({
      chat: eventChat,
      messages: messages
    });
  };

  const handle_SendMessage_Click = async (message: string) => {
    await WebApi.createMessage(selectedEventChat.chat.id, message);

    const messages = await WebApi.getChatMessages(selectedEventChat.chat.id);

    setSelectedEventChat({
      chat: selectedEventChat.chat,
      messages: messages
    });
  };

  React.useEffect(() => {
    const loadData = async () => {
      const loggedInUser = await WebApi.getLoggedInUser();

      if (!loggedInUser) {
        return;
      }

      const apiChats : WebApi.Chat[] = await WebApi.getCurrentUserChats(loggedInUser.id);
      const apiEvents : WebApi.Event[] = await WebApi.getCurrentUserEvents(loggedInUser.id);
      setChats(apiChats);
      setEvents(apiEvents);
    };

    loadData();
  }, []);

  return (
    <div className="main-page-container">
        {events.length > 0 ? (
          <EventChatList onClick={handle_EventChatList_Click} chats={chats as any} events={events as any} />
        ) : (
          <NoEventChats/>
        )}
        <EventChat data={selectedEventChat} onSendMessageClick={handle_SendMessage_Click} />
    </div>
  );
}
