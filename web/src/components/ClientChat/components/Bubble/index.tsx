import './styles.css';

import moment from 'moment';

interface IBubble {
  isMessageByCurrentUser?: boolean;
  message: string;
  timestamp: Date;
}

const Bubble = ({ message, timestamp, isMessageByCurrentUser = false }: IBubble) => {
  return (
    <div
      class={
        isMessageByCurrentUser ? 'bubble-container from-current' : 'bubble-container'
      }
    >
      <div class="bubble">
        <p>{message}</p>
      </div>

      <p class="bubble-timestamp">{moment(timestamp).format('HH:mm')}</p>
    </div>
  );
};

export { Bubble };
