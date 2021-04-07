import { FunctionalComponent } from 'preact';
import style from './style.css';

type Props = {};

const Header: FunctionalComponent<Props> = () => (
  <header class={style.header}>
    <h1>Impfterminspection</h1>
  </header>
);

export default Header;
