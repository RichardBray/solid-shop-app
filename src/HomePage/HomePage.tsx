import { For } from 'solid-js';
import type { Resource } from 'solid-js';
import type { ShopItem } from '../App';
import styles from './HomePage.module.css';

interface HomePageProps {
  items: Resource<ShopItem[]>;
  getButtonText: () => string;
  toggleBought: () => void;
}

export default function HomePage({ items, getButtonText, toggleBought }: HomePageProps) {

  return (
    <>
      <h2>Viewing {items()?.length} Products</h2>
<div class={styles.container}> {/* add container class here */}
  <For each={items()}>
    {(item) => (
      <article class={styles.item}> {/* item class here */}
        <img src={item.image_url} alt={item.name} />
        <section class={styles.info}> {/* info class here */}
          {item.name}
          <strong>£{item.price}</strong>
        </section>
        <button class={styles.button} onClick={toggleBought}>{getButtonText()}</button> {/* add class here*/}
      </article>
    )}
  </For>
</div>
    </>
  );
}
