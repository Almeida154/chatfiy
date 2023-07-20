import { CSSProperties, InputHTMLAttributes } from 'vue';

interface IInputProps extends InputHTMLAttributes {
  label?: string;
  containerStyle?: Partial<CSSProperties>;
  style?: Partial<CSSProperties>;
}

import './styles.css';

const Input = ({ label, containerStyle, style, ...rest }: IInputProps) => {
  return (
    <div class="input-container" style={containerStyle}>
      {!!label && <label class="label">{label}</label>}
      <input type="text" class="input" style={style} {...rest} />
    </div>
  );
};

export { Input };
