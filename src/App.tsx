import HomePage from './HomePage';
import CheckoutPage from './CheckoutPage';
import styles from './App.module.css';
import { createSignal, createMemo, createResource, on, Show } from 'solid-js';

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

const pageName = {
  home: 'home',
  checkout: 'checkout',
  about: 'about',
};

export default function App() {
  const [bought, setBought] = createSignal(false);
  const [page, setPage] = createSignal(pageName.home);

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
  const homepageProps = {
    items,
    getButtonText,
    toggleBought,
  };

  function navButtonProps(name: 'home' | 'checkout' | 'about') {
    return {
      onClick: () => setPage(name),
      classList: { [styles.active]: page() === pageName[name] },
    };
  }

  function toggleBought() {
    setBought(!bought());
  }

  return (
    <div class={styles.header}>
      <header>
        <nav class={styles.navigation}>
          <a href="#" {...navButtonProps('home')}>
            Home
          </a>
          <a href="#" {...navButtonProps('checkout')}>
            Checkout
          </a>
          <a href="#" {...navButtonProps('about')}>About</a>
        </nav>
        <h1>Solid Shop</h1>
      </header>
      <p>{notification()}</p>
      <Show when={page() === pageName.home}>
        <HomePage {...homepageProps} />
      </Show>
      <Show when={page() === pageName.checkout}>
        <CheckoutPage />
      </Show>
    </div>
  );
}
