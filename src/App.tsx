import HomePage from './HomePage';
import styles from './App.module.css';
import { createSignal, createMemo, createResource, on } from 'solid-js';

export interface ShopItem {
  name: string;
  price: number;
  description: string;
  image_url: string;
}

async function fetchData() {
  const data = await fetch('src/api/data.json');
  const json = await data.json();
  return json.items;
}

export default function App() {
  const onHomePage = true;
  const [bought, setBought] = createSignal(false);
  const [items] = createResource<ShopItem[]>(fetchData);
  const getButtonText = () => (bought() ? 'Remove' : 'Buy');
  const notification = createMemo(
    on(
      bought,
      () => {
        const message = bought() ? 'An item has been bought' : 'No items in the basket';
        return message;
      },
      { defer: true }
    )
  );

  function toggleBought() {
    setBought(!bought());
  }

  const homepageProps = {
    items,
    getButtonText,
    toggleBought
  }

  return (
    <div class={styles.header}>
      <header>
        <nav class={styles.navigation}>
          <a href="#" classList={{ [styles.active]: onHomePage }}>
            Home
          </a>
          <a href="#">About</a>
          <a href="#">Checkout</a>
        </nav>
        <h1>Solid Shop</h1>
      </header>
      <p>{notification()}</p>
      <HomePage {...homepageProps} />
    </div>
  );
}
