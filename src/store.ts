import { createStore, unwrap } from 'solid-js/store';
import type { ShopItem } from './App';

export const [boughtItems, setBoughtItems] = createStore<ShopItem[]>([]);

export function addBoughtItem(item: ShopItem) {
  setBoughtItems([...boughtItems, item]);
}
