interface IButtonProps {
  text: string;
  onPress: () => void;
}

import './styles.css';

const Button = ({ text, onPress }: IButtonProps) => (
  <div role="button" class="button-container" onClick={onPress}>
    <v-icon name="hi-chat-alt-2" />
    <p>{text}</p>
  </div>
);

export { Button };
