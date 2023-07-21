import { CSSProperties, InputHTMLAttributes } from 'vue';

interface IInputProps extends InputHTMLAttributes {
  label?: string;
  containerStyle?: Partial<CSSProperties>;
}

import './styles.css';

const Input = ({ label, containerStyle, ...rest }: IInputProps) => {
  return (
    <div class="input-container" style={containerStyle}>
      {!!label && <label class="label">{label}</label>}
      <input type="text" class="input" {...rest} />
    </div>
  );
};

export { Input };
