import type { JSXElement } from 'solid-js';
import { Portal } from 'solid-js/web';
import styles from "./Modal.module.css"

interface ModalProps {
  children: JSXElement;
  closeFn: () => void;
}

export default function Modal({ children, closeFn }: ModalProps) {
  return (
    <Portal mount={document.getElementById('modal') as HTMLElement}>
      <div class={styles.container}>
        <div class={styles.content}>
          <button class={styles.close} onClick={closeFn}>x</button>
          {children}
        </div>
      </div>
    </Portal>
  );
}
