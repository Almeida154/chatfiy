import { CSSProperties, TextareaHTMLAttributes } from 'vue';

interface ITextareaProps extends TextareaHTMLAttributes {
  label?: string;
  containerStyle?: Partial<CSSProperties>;
}

import './styles.css';

const Textarea = ({ label, containerStyle, ...rest }: ITextareaProps) => {
  return (
    <div class="textarea-container" style={containerStyle}>
      {!!label && <label class="label">{label}</label>}
      <textarea class="textarea" {...rest} />
    </div>
  );
};

export { Textarea };
