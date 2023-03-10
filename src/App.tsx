import HomePage from './HomePage';
import styles from './App.module.css';
import { createEffect, createSignal, on } from 'solid-js';

export default function App() {
  const onHomePage = true;
  const [bought, setBought] = createSignal(false);

  const getButtonText = () => (bought() ? 'Remove' : 'Buy');

  function toggleBought() {
    setBought(!bought());
  }

  createEffect<void>(
    on(
      bought, () => {
        const logText = bought() ? 'An item has been bought' : 'No items in the basket';
        console.log(logText);
      },
      { defer: true }
    )
  );

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
        <button onClick={toggleBought}>{getButtonText()}</button>
      </header>
    </div>
  );
}
