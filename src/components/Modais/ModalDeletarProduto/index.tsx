import styles from './ModalDeletarProduto.module.scss';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { MdDelete } from 'react-icons/md';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import { httpApiMockada, httpProduto } from '../../../http';
import { Button } from '@mantine/core';

interface modalDeletarProps {
  idExcluir?: string;
  setarLista: (listaAtualizada: string[]) => void;
  snackbarDeleteOpen: boolean;
  setSnackbarDeleteOpen: (open: boolean) => void;
  snackbarErrorOpen: boolean;
  setSnackbarErrorOpen: (open: boolean) => void;
}

const ModalDeletarProduto = ({
  idExcluir,
  setarLista,
  snackbarDeleteOpen,
  setSnackbarDeleteOpen,
  snackbarErrorOpen,
  setSnackbarErrorOpen,
}: modalDeletarProps) => {
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

  function regastarListaProdutos() {
    httpProduto
      .get('/api/products')
      .then((response) => {
        setarLista(response.data.content);
      })
      .catch((err) => {
        setSnackbarErrorOpen(true);
        console.log(err);
      });
    // httpApiMockada.get('produto-get')
    // .then((response) => {setarLista(response.data)})
    // .catch((err) => {
    //   setSnackbarErrorOpen(true);
    //   console.log(err);
    // });
  }

  const deletarProduto = () => {
    httpProduto
      .delete(`/api/products/${idExcluir}`)
      .then((resp) => {
        regastarListaProdutos();
        setSnackbarDeleteOpen(true);
        setOpen(false);
      })
      .catch((err) => {
        setSnackbarErrorOpen(true);
        console.log(err);
      });
    // httpApiMockada
    //   .delete(`produto-get/${idExcluir}`)
    //   .then((resp) => {
    //     regastarListaProdutos()
    //     setOpen(false);
    //     setSnackbarDeleteOpen(true)

    //   })
    // .catch((err) => {
    //   setSnackbarErrorOpen(true);
    //   console.log(err);
    // });
  };

  return (
    <div>
      <MdDelete className={styles.product__remove} onClick={handleOpen} />
      <Modal keepMounted open={open} onClose={handleClose}>
        <Box sx={style}>
          <p>Deseja excluir este produto?</p>
          <div className={styles.btns__container}>
            <Button onClick={deletarProduto} mr={'md'} mt={'xl'} color="red">
              {' '}
              Sim
            </Button>
            <Button onClick={handleClose} variant="outline" color="dark">
              Não
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalDeletarProduto;
