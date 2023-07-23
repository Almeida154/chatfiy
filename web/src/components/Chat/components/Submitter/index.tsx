import { CSSProperties, InputHTMLAttributes } from 'vue';

interface ISubmitterProps extends InputHTMLAttributes {
  containerStyle?: Partial<CSSProperties>;
  onSubmit: () => void;
}

import './styles.css';
import { Button } from '@/components';

const Submitter = ({ containerStyle, onSubmit, ...rest }: ISubmitterProps) => {
  return (
    <div class="submitter-container" style={containerStyle}>
      <input type="text" class="submitter" {...rest} />

      <div class="submitter-button-wrapper">
        <Button onPress={onSubmit} icon="hi-solid-arrow-sm-up" />
      </div>
    </div>
  );
};

export { Submitter };
