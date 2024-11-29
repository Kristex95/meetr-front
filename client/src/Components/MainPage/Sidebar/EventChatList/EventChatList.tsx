import './EventChatList.css';
import {
  makeStyles,
  Avatar
} from '@fluentui/react-components';
import { WebApi } from '../../../../Scripts/webApi';

export default function EventChatList(props: {
  onClick: any,
  chats: WebApi.Chat[],
  events: WebApi.Event[]
}) {
  return (
    <div className="event-chat-list-container">
      {props.events?.map(event => (
        <div className="avatar-container" onClick={() => props.onClick(event)}>
          <Avatar
            color="colorful"
            aria-label={event.name}
            name={event.name}
          />
          <div className="avatar-label">
            <span>
              {event.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}