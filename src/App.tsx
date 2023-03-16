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
type PageName = 'home' | 'checkout' | 'about';

async function fetchData() {
  const data = await fetch('src/api/data.json');
  const json = await data.json();
  return json.items;
}

export default function App() {
  const [bought, setBought] = createSignal(false);
  const [page, setPage] = createSignal<PageName>('home');

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

  function navButtonProps(name: PageName) {
    return {
      onClick: () => setPage(name),
      classList: { [styles.active]: page() === name },
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
      <Show when={page() === 'home'}>
        <HomePage {...homepageProps} />
      </Show>
      <Show when={page() === 'checkout'}>
        <CheckoutPage />
      </Show>
      <Show when={page() === 'about'} fallback={<em>Not the about page</em>}>
        <h3>On the about page</h3>
      </Show>
    </div>
  );
}
