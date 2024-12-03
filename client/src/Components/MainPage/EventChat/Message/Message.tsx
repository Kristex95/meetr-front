import './Message.css';
import moment from 'moment';

export default function Message(props: React.ComponentProps<any> | {
  data: {timestamp: any, message: string, username: string},
  event?: boolean,
  mine?: boolean,
  startsSequence?: boolean,
  endsSequence?: boolean,
  showTimestamp?: boolean
}) {
  const {
    data,
    mine,
    event,
    startsSequence,
    endsSequence,
    starting,
    showTimestamp
  } = props;

  const friendlyTimestamp = moment(data.timestamp).format('LLLL');
  return (
    <div {...props} className={[
      'message',
      `${event ? 'event' : ''}`,
      `${mine ? 'mine' : ''}`,
      `${startsSequence ? 'start' : ''}`,
      `${endsSequence ? 'end' : ''}`
    ].concat(props.className?.split(' ') ?? []).join(' ')}>
      {
        showTimestamp &&
          <div className="timestamp">
            { friendlyTimestamp }
          </div>
      }

      <div className="bubble-container">
        <div className="bubble" title={friendlyTimestamp}>
        {
          starting && 
          <div className='starting'>{data.username}</div>
        }
        { <div className='bubble-message'>{data.message}</div> }
        </div>
      </div>
    </div>
  );
}