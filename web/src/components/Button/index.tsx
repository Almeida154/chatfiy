import { CSSProperties } from 'vue';

interface IButtonProps {
  text: string;
  icon?: string;
  style?: Partial<CSSProperties>;
  onPress: () => void;
}

import './styles.css';

const Button = ({ text, icon, style, onPress }: IButtonProps) => (
  <div role="button" class="button-container" onClick={onPress} style={style}>
    {icon && <v-icon name={icon} />}
    <p>{text}</p>
  </div>
);

export { Button };
