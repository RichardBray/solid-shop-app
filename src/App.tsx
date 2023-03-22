import HomePage from './HomePage/HomePage';
import styles from './App.module.css';
import * as Solid from 'solid-js';
import { boughtItems } from './store';


const { Switch, Match, Suspense } = Solid;

export interface ShopItem {
  name: string;
  price: number;
  description: string;
  image_url: string;
}
type PageName = 'home' | 'checkout' | 'about';

const CheckoutPage = Solid.lazy(async () => {
  return import('./CheckoutPage/CheckoutPage');
});

async function fetchData(): Promise<ShopItem[]> {
  const data = await fetch('src/api/data.json');
  const json = await data.json();
  return json.items;
}

export default function App() {
  const [bought, setBought] = Solid.createSignal(false);
  const [page, setPage] = Solid.createSignal<PageName>('home');

  const [items] = Solid.createResource<ShopItem[]>(fetchData);
  const getButtonText = () => (bought() ? 'Remove' : 'Buy');
  const notification = Solid.createMemo(
    Solid.on(
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
            Checkout ({boughtItems.length})
          </a>
          <a href="#" {...navButtonProps('about')}>
            About
          </a>
        </nav>
        <h1>Solid Shop</h1>
      </header>
      <p>{notification()}</p>
      <Switch fallback={<div>Not Found</div>}>
        <Match when={page() === 'home'}>
          <Suspense fallback={<div>Loading...</div>}>
            <HomePage {...homepageProps} />
          </Suspense>
        </Match>
        <Match when={page() === 'checkout'}>
          <Suspense fallback={<p>Loading...</p>}>
            <CheckoutPage />
          </Suspense>
        </Match>
        <Match when={page() === 'about'}>
          <h2>About Page</h2>
        </Match>
      </Switch>
    </div>
  );
}
