import './styles.css';

import { CSSProperties, TextareaHTMLAttributes } from 'vue';

interface ITextareaProps extends TextareaHTMLAttributes {
  label?: string;
  containerStyle?: Partial<CSSProperties>;
}

const Textarea = ({ label, containerStyle, ...rest }: ITextareaProps) => {
  return (
    <div class="textarea-container" style={containerStyle}>
      {!!label && <label class="label">{label}</label>}
      <textarea class="textarea" {...rest} />
    </div>
  );
};

export { Textarea };
