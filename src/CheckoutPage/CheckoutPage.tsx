import { For } from 'solid-js';
import { ShopItem } from '../App';
import { boughtItems, toggleBoughtItem } from '../store';
import styles from './CheckoutPage.module.css';
import homePageStyles from '../HomePage/HomePage.module.css';

export default function CheckoutPage() {
  function calculateTotal(items: ShopItem[]) {
    const total = items.reduce((acc, curr) => acc + curr.price, 0);
    return total.toFixed(2);
  }
  return (
    <>
      <h2>You have {boughtItems().length} products checked out</h2>
      <div class={styles.container}>
        <section>
          <For each={boughtItems()}>
            {(item) => (
              <article class={styles.row}>
                <img src={item.image_url} alt={item.name} />
                <section class={styles.info}>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <strong class={styles.price}>£{item.price}</strong>
                  <footer class={styles['button-container']}>
                    <button class={homePageStyles.button} onClick={[toggleBoughtItem, item]}>
                      Remove
                    </button>
                  </footer>
                </section>
              </article>
            )}
          </For>
        </section>
        <section>
          <div class={styles.total}>
            <h3>Total</h3>
            <span>£{calculateTotal(boughtItems())}</span>
          </div>
        </section>
      </div>
    </>
  );
}
