import React from 'react';
import { WebApi } from '../../../Scripts/webApi';
import EventChatList from './EventChatList/EventChatList';
import NoEventChats from './NoEventChats/NoEventChats';
import "./Sidebar.css"

export default function Sidebar(props: { 
  onSelectEventClick: (event: WebApi.Event) => void,
  onOpenMenuClick: () => void
}) {
  const [chats, setChats] = React.useState<WebApi.Chat[]>([]);
  const [events, setEvents] = React.useState<WebApi.Event[]>([]);
  const handle_EventChatList_Click = async (event: any) => {
    console.log(event);
    props.onSelectEventClick(event);
  };

  const openMenu = () => {
    props.onOpenMenuClick();
  };

  React.useEffect(() => {
    const loadData = async () => {
      const apiChats : WebApi.Chat[] = await WebApi.getCurrentUserChats();
      const apiEvents : WebApi.Event[] = await WebApi.getCurrentUserEvents();
      setChats(apiChats);
      setEvents(apiEvents);
    };

    loadData();
  }, []);

  return (
    <div className="sidebar-container">
      <div className='sidebar-events'>
        {events.length > 0 ? (
          <EventChatList onClick={handle_EventChatList_Click} chats={chats as any} events={events as any} />
        ) : (
          <NoEventChats/>
        )}
      </div>
      <div className='sidebar-bottom'>
        <div className='sidebar-menu-btn' onClick={openMenu}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 18L20 18" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
            <path d="M4 12L20 12" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
            <path d="M4 6L20 6" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
}