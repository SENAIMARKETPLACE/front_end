import styles from './itemMenuLateral.module.scss';

interface ItemMenuLateralProps {
  key: number;
  text: string;
  icon: any;
  url: string;
}

const ItemMenuLateral = ({ text, icon, url }: ItemMenuLateralProps) => {
  return (
    <li className={styles.item}>
      <span className={styles.item__icon}>{icon}</span>
      <p className={styles.item__text}>{text}</p>
    </li>
  );
};

export default ItemMenuLateral;
