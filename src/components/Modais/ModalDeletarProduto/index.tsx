import styles from './ModalDeletarProduto.module.scss';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { MdDelete } from 'react-icons/md';
import TextField from '@mui/material/TextField';
import { Button, FormControl, OutlinedInput } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import { httpApiMockada, httpProduto } from '../../../http';

interface modalDeletarProps {
  idExcluir?: string;
  setarLista: (listaAtualizada: string[]) => void
  snackbarDeleteOpen: boolean;
  setSnackbarDeleteOpen: (open: boolean) => void;
}

const ModalDeletarProduto = ({ idExcluir, setarLista, snackbarDeleteOpen, setSnackbarDeleteOpen }: modalDeletarProps) => {
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


  function regastarListaProdutos(){
    httpProduto.get('/api/products')
    .then((response) => {setarLista(response.data.content)})
    .catch((error) => console.error)
    // httpApiMockada.get('produto-get')
    // .then((response) => {setarLista(response.data)})
    // .catch((error) => console.error)
  }

  const deletarProduto = () => {
    httpProduto
      .delete(`/api/products/${idExcluir}`)
      .then((resp) => {
        regastarListaProdutos()
        setOpen(false);
      })
      .catch((err) => console.error(err));
    // httpApiMockada
    //   .delete(`produto-get/${idExcluir}`)
    //   .then((resp) => {
    //     regastarListaProdutos()
    //     setOpen(false);
    //     setSnackbarDeleteOpen(true)
        
    //   })
    //   .catch((err) => console.error(err));
  };

  return (
    <div>
      <MdDelete className={styles.product__remove} onClick={handleOpen} />
      <Modal keepMounted open={open} onClose={handleClose}>
        <Box sx={style}>
          <p>Deseja excluir este produto? {idExcluir}</p>
          <div className={styles.btns_container}>
            <Button onClick={deletarProduto}> Sim</Button>
            <Button onClick={handleClose}>Não</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalDeletarProduto;
