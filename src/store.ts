import { createSignal } from 'solid-js';
import { createStore, unwrap } from 'solid-js/store';
import type { ShopItem } from './App';

export const [items, setItems] = createStore<ShopItem[]>([]);
export const [boughtItems, setBoughtItems] = createSignal<ShopItem[]>([]);

export function addItems(items: ShopItem[]) {
  setItems(items);
}

export function toggleBoughtItem(item: ShopItem) {
  updateItem(item, { bought: !item.bought });
}

function updateItem(item: ShopItem, update: Partial<ShopItem>) {
  setItems((items) => {
    const index = items.indexOf(unwrap(item));
    const itemsCopy = [...items];
    itemsCopy[index] = { ...item, ...update };

    return itemsCopy;
  });
  setBoughtItems(calculateBoughtItems());
}

function calculateBoughtItems() {
  return items.filter((item) => item.bought);
}
