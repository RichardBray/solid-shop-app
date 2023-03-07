import HomePage from './HomePage';
import styles from './App.module.css'

export default function App() {
  return (
    <div class={styles.header}>
      <nav class={styles.navigation}>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Checkout</a>
      </nav>
      <header>
        <h1>Solid Shop</h1>
        <HomePage totalItems={340} />
      </header>
    </div>
  );
}
