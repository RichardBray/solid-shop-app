import { createContext, useContext, JSXElement } from 'solid-js';
import { createStore, unwrap } from 'solid-js/store';
import type { ShopItem } from './App';

type ContextValues = [
  { items: ShopItem[]; boughtItems: ShopItem[] },
  {
    addItems: (items: ShopItem[]) => void;
    toggleBoughtItem: (item: ShopItem) => void;
  }
];

const ShopContext = createContext<ContextValues>();

export function ShopProvider(props: { children: JSXElement }) {
  const [items, setItems] = createStore<ShopItem[]>([]);
  const [boughtItems, setBoughtItems] = createStore<ShopItem[]>([]);
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

  const providerValues: ContextValues = [
    { items, boughtItems },
    { addItems, toggleBoughtItem },
  ];

  return <Provider value={providerValues}>{props.children}</Provider>;
}

export function useShopContext() {
  return useContext<ContextValues | undefined>(ShopContext);
}
