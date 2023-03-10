import HomePage from './HomePage';
import styles from './App.module.css';
import { createSignal } from 'solid-js';

export default function App() {
  const onHomePage = true;
  const [bought, setBought] = createSignal(false);

  const getButtonText = () => bought() ? 'Remove' : 'Buy';

  function toggleBought() {
    setBought(!bought());
  }

  return (
    <div class={styles.header}>
      <nav class={styles.navigation}>
        <a href="#" classList={{ [styles.active]: onHomePage }}>
          Home
        </a>
        <a href="#">About</a>
        <a href="#">Checkout</a>
      </nav>
      <header>
        <h1>Solid Shop</h1>
        <HomePage totalItems={340} />
        <button onClick={toggleBought}>{getButtonText}</button>
      </header>
    </div>
  );
}
