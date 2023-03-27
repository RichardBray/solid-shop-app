import HomePage from './HomePage/HomePage';
import styles from './App.module.css';
import * as Solid from 'solid-js';
import { useShopContext } from './context';

const { Switch, Match, Suspense } = Solid;

export interface ShopItem {
  name: string;
  price: number;
  description: string;
  image_url: string;
  bought?: boolean;
}

type PageName = 'home' | 'checkout' | 'about';

const CheckoutPage = Solid.lazy(async () => {
  return import('./CheckoutPage/CheckoutPage');
});

async function fetchData(): Promise<ShopItem[]> {
  const data = await fetch('src/api/data.json');
  const json: { items: ShopItem[] } = await data.json();
  const itemsWithBought: ShopItem[] = json.items.map((item) => ({ ...item, bought: false }));

  return itemsWithBought;
}

export default function App() {
  const [page, setPage] = Solid.createSignal<PageName>('home');
  const [{ boughtItems }, { addItems }] = useShopContext()!;

  const [items] = Solid.createResource<ShopItem[]>(fetchData);

  Solid.createEffect(
    Solid.on(items, () => {
      if (items()) addItems(items()!);
    })
  );

  function navButtonProps(name: PageName) {
    return {
      onClick: () => setPage(name),
      classList: { [styles.active]: page() === name },
    };
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
      <Switch fallback={<div>Not Found</div>}>
        <Match when={page() === 'home'}>
          <Suspense fallback={<div>Loading...</div>}>
            <HomePage />
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
