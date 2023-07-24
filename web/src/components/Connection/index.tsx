import './styles.css';

import { BaseHTMLAttributes } from 'vue';

interface IConnectionProps extends BaseHTMLAttributes {
  email?: string;
  wasAttended?: boolean;
}

const Connection = ({ email, wasAttended, ...rest }: IConnectionProps) => (
  <div role="button" class="connection-container" {...rest}>
    {!!email && <p class="connection-email">{email}</p>}
    {!wasAttended && <div class="connection-notification"></div>}
  </div>
);

export { Connection };
