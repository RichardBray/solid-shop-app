import HomePage from './HomePage';
import styles from './App.module.css';
import { createResource, createSignal, on, createMemo, For } from 'solid-js';

interface ShopItem {
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

  function toggleBought() {
    setBought(!bought());
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
        <For each={items()} fallback={<div>Loading...</div>}>
          {(item, index) => (
            <div>
              {index()} {item.name}
            </div>
          )}
        </For>
        <button onClick={toggleBought}>{getButtonText()}</button>
      </header>
    </div>
  );
}


// fallback={<div>Loading...</div>} is another prop passed to the <For> component that specifies what to render while the array is being loaded or if the array is empty. In this case, it renders a simple message saying "Loading..." using a <div> element.