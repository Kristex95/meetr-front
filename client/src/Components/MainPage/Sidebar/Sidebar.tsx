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
    </div>
  );
}