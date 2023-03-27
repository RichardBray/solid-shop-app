import { createSignal, For } from 'solid-js';

import type { ShopItem } from '../App';
import styles from './HomePage.module.css';
import Modal from '../components/Modal/Modal';
import { useShopContext } from '../context';

export default function HomePage() {
  const [showModal, setShowModal] = createSignal(false);
  const [modalItem, setModalItem] = createSignal<ShopItem>({
    name: '',
    price: 0,
    description: '',
    image_url: '',
  });
  const [{ items }, { toggleBoughtItem }] = useShopContext()!;

  function revealModal(item: ShopItem) {
    setModalItem(item);
    if (!showModal()) setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }
  return (
    <>
      <h2>Viewing {items.length} Products</h2>
      <div class={styles.container}>
        <For each={items}>
          {(item) => (
            <article class={styles.item}>
              <button onClick={[revealModal, item]}>
                <img src={item.image_url} alt={item.name} />
              </button>
              <section class={styles.info}>
                {item.name}
                <strong>£{item.price}</strong>
              </section>
              <button class={styles.button} onClick={[toggleBoughtItem, item]}>
                {item.bought ? 'Remove' : 'Buy'}
              </button>
            </article>
          )}
        </For>
      </div>
      <Modal closeFn={closeModal} showSignal={showModal}>
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
    </>
  );
}
