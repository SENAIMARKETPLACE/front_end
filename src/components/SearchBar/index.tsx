import styles from './SearchBar.module.scss';

const SearchBar = () => {
  return (
    <input
      type="search"
      placeholder="Buscar produtos"
      className={styles.searchbar}
    />
  );
};

export default SearchBar;
