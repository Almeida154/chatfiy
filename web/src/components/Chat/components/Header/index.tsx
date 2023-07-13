import './styles.css';

interface IHeader {
  title: string;
  onClose: () => void;
}

const Header = ({ title, onClose }: IHeader) => (
  <div class="header-container">
    <h4 class="title">{title}</h4>

    <div role="button" class="icon-container" onClick={onClose}>
      <v-icon name="hi-x-circle" scale="1.5" />
    </div>
  </div>
);

export { Header };
