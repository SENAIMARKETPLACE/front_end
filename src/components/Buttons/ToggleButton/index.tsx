import styles from './ToggleButton.module.scss';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { FaListUl } from 'react-icons/fa';

const alertMsg = () => {
  alert('Ainda não implementado.');
};
const ToggleBtn = () => {
  return (
    <ToggleButtonGroup
      exclusive
      aria-label="text alignment"
      className={styles.searchBar__view}
    >
      <ToggleButton value="left" aria-label="left aligned" onClick={alertMsg}>
        <BsFillGrid3X3GapFill />
      </ToggleButton>
      <ToggleButton value="right" aria-label="right aligned" onClick={alertMsg}>
        <FaListUl />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ToggleBtn;
