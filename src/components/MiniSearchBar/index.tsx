import styles from './MiniSearchBar.module.scss';
import { IoMdOptions } from 'react-icons/io';
import { BiSearch } from 'react-icons/bi';

const MiniSearchBar = () => {
  return (
    <div className={styles.search}>
      <span className={styles.search__icon}>
        <BiSearch />
      </span>
      <input
        className={styles.search__input}
        type="search"
        placeholder="Pesquisar produtos"
      />
      <span className={styles.search__filter}>
        <IoMdOptions onClick={() => alert('Pesquisando!')} />
      </span>
    </div>
  );
};

export default MiniSearchBar;
