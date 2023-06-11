import styles from './MiniSearchBar.module.scss';
import { IoMdOptions } from 'react-icons/io';
import { BiSearch } from 'react-icons/bi';

interface MiniSearchBarProps{
  prepararCampoParaBusca?: () => void;
}


const MiniSearchBar = ({prepararCampoParaBusca}: MiniSearchBarProps) => {

  

  const funcaoTeste = () => {
    alert("Abrir Modal")
  }

  return (
    <div className={styles.search}>
      <button className={styles.search__icon} onClick={prepararCampoParaBusca}>
        <BiSearch />
      </button>
      <input
        className={styles.search__input}
        onChange={prepararCampoParaBusca}
        type="search"
        placeholder="Pesquisar produtos"
      />
      {/* <span className={styles.search__filter}>
        <IoMdOptions onClick={() => alert('Pesquisando!')} />
      </span> */}
    </div>
  );
};

export default MiniSearchBar;
