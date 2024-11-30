import React, { useRef } from 'react';
import EventChat from "./EventChat/EventChat";
import { WebApi } from '../../Scripts/webApi';

import "./MainPage.css";
import Sidebar from './Sidebar/Sidebar';
import Menu from './Menu/Menu';

export default function MainPage() {
  const [selectedChat, setSelectedChat] = React.useState<any>(undefined);
  const [selectedEvent, setSelectedEvent] = React.useState<any>(undefined);
  const [isMenuActive, setIsMenuActive] = React.useState<boolean>(false);

  const handle_EventChatList_Click = async (event: WebApi.Event) => {
    const chat: WebApi.Chat = await WebApi.getEventMainChat(event.id);
    console.log(chat);
    setSelectedChat(chat);
    setSelectedEvent(event);
  };

  const handle_SendMessage_Click = async (message: string) => {
    //await WebApi.createMessage(selectedEventChat.chat.id, message);

    // const messages = await WebApi.getChatMessages(selectedEventChat.chat.id);

    // setSelectedEventChat({
    //   chat: selectedEventChat.chat,
    //   messages: messages
    // });
  };

  const handle_OpenCloseMenu_Click = () => {
    setIsMenuActive(!isMenuActive);
  }

  return (
    <div className="main-page-container">
        <Sidebar 
          onSelectEventClick={handle_EventChatList_Click} 
          onOpenMenuClick={handle_OpenCloseMenu_Click}
        />
        <EventChat chat={selectedChat} event={selectedEvent} onSendMessageClick={handle_SendMessage_Click} />
        <Menu active={isMenuActive} onCloseMenuClick={handle_OpenCloseMenu_Click}/>
    </div>
  );
}
