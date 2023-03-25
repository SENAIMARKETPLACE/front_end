import styles from './ModalDeletarProduto.module.scss';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Button, FormControl, OutlinedInput } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';

const ModalDeletarProduto = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <button className={styles.open_btn} onClick={handleOpen}>
        Open modal
      </button>
      <Modal keepMounted open={open} onClose={handleClose}>
        <Box sx={style}>
          <p>Deseja excluir este produto?</p>
          <div className={styles.btns_container}>
            <Button>Sim</Button>
            <Button>Não</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalDeletarProduto;
