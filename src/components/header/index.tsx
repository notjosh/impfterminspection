import { FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';

type Props = {};

const Header: FunctionalComponent<Props> = () => (
  <header class={style.header}>
    <h1>Preact App</h1>
    <nav>
      <Link activeClassName={style.active} href="/">
        Home
      </Link>
    </nav>
  </header>
);

export default Header;
