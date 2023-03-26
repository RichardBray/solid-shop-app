import { createSignal, createContext, useContext, JSXElement } from 'solid-js';
import { createStore, unwrap } from 'solid-js/store';
import type { Accessor } from 'solid-js';
import type { ShopItem } from './App';

interface ContextValues {
  addItems: (items: ShopItem[]) => void;
  boughtItems: Accessor<ShopItem[]>;
  toggleBoughtItem: (item: ShopItem) => void;
  items: ShopItem[];
}

const ShopContext = createContext<ContextValues>();

export function ShopProvider(props: { children: JSXElement }) {
  const [items, setItems] = createStore<ShopItem[]>([]);
  const [boughtItems, setBoughtItems] = createSignal<ShopItem[]>([]);
  const { Provider } = ShopContext;

  function addItems(items: ShopItem[]) {
    setItems(items);
  }

  function toggleBoughtItem(item: ShopItem) {
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

  const providerValues = { addItems, boughtItems, toggleBoughtItem, items };

  return <Provider value={providerValues}>{props.children}</Provider>;
}

export function useShopContext() {
  return useContext<ContextValues | undefined>(ShopContext);
}
