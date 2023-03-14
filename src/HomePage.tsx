import { For } from 'solid-js';
import type { Resource } from 'solid-js';
import type { ShopItem } from './App';

interface HomePageProps {
  items: Resource<ShopItem[]>;
  getButtonText: () => string;
  toggleBought: () => void;
}

export default function HomePage({ items, getButtonText, toggleBought }: HomePageProps) {

  return (
    <div>
      <h2>You are viewing {items()?.length} Products</h2>
      <For each={items()} fallback={<div>Loading...</div>}>
        {(item, index) => (
          <div>
            {index()} {item.name}
            <button onClick={toggleBought}>{getButtonText()}</button>
          </div>
        )}
      </For>
    </div>
  );
}
