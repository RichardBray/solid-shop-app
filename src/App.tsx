import HomePage from './HomePage';
import styles from './App.module.css';
import { createResource, createSignal, on, createMemo } from 'solid-js';

interface ShopItem {
  name: string,
  price: number,
  description: string,
  image_url: string
}

async function fetchData(id: number) {
  const data = await fetch('src/api/data.json');
  const json = await data.json();
  return json.items[id];
}

export default function App() {
  const onHomePage = true;
  const [bought, setBought] = createSignal(false);
  const [item, { mutate, refetch }] = createResource<Partial<ShopItem>, number>(9, fetchData);

  const getButtonText = () => (bought() ? 'Remove' : 'Buy');

  function toggleBought() {
    setBought(!bought());
    mutate((prevData) => ({...prevData, msg: 'lol'}));
    refetch();
  }

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
        <p>{notification()}</p>
        <div>{JSON.stringify(item())}</div>
        <button onClick={toggleBought}>{getButtonText()}</button>
      </header>
    </div>
  );
}
