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
      <div>
        <For each={items()}>
          {(item) => (
            <article>
              <img src={item.image_url} alt={item.name} />
              <section>
                {item.name}
                <strong>£{item.price}</strong>
              </section>
              <button onClick={toggleBought}>{getButtonText()}</button>
            </article>
          )}
        </For>
      </div>
    </>
  );
}
