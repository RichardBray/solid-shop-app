import { createSignal, For } from 'solid-js';
import type { Resource } from 'solid-js';
import { Portal, Show } from 'solid-js/web';

import type { ShopItem } from '../App';
import styles from './HomePage.module.css';
import Modal from '../components/Modal/Modal';

interface HomePageProps {
  items: Resource<ShopItem[]>;
  getButtonText: () => string;
  toggleBought: () => void;
}

export default function HomePage({ items, getButtonText, toggleBought }: HomePageProps) {
  const [showModal, setShowModal] = createSignal(false);
  const [modalItem, setModalItem] = createSignal<ShopItem>({
    name: '',
    price: 0,
    description: '',
    image_url: ''
  });

  function revealModal(item: ShopItem) {
    setModalItem(item);
    if (!showModal()) setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <>
      <h2>Viewing {items()?.length} Products</h2>
      <div class={styles.container}>
        <For each={items()}>
          {(item) => (
            <article class={styles.item}>
              <button onClick={[revealModal, item]}>
                <img src={item.image_url} alt={item.name} />
              </button>
              <section class={styles.info}>
                {item.name}
                <strong>£{item.price}</strong>
              </section>
              <button class={styles.button} onClick={toggleBought}>{getButtonText()}</button>
            </article>
          )}
        </For>
      </div>
      <Show when={showModal()}>
        <Modal closeFn={closeModal}>
          <section class={styles['modal-content']}>
            <div>
              <img src={modalItem().image_url} alt={modalItem().name} />
            </div>
            <div>
              <h3>{modalItem().name}</h3>
              <p>{modalItem().description}</p>
              <strong class={styles['modal-price']}>£{modalItem().price}</strong>
            </div>
          </section>
        </Modal>
      </Show>
    </>
  );
}
