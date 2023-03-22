import { createStore, unwrap } from 'solid-js/store';
import type { ShopItem } from './App';

export const [boughtItems, setBoughtItems] = createStore<ShopItem[]>([]);

export function addBoughtItem(item: ShopItem) {
  // prevent adding duplicate items
  console.log(unwrap(boughtItems).includes(item), 'boughtItems');
  console.log(item, 'item');
  if (unwrap(boughtItems).includes(item)) {
    throw new Error('This item already exists');
  }
  setBoughtItems([...boughtItems, item]);
}
