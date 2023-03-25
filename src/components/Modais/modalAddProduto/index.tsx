import styles from './modalAddProduct.module.scss';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button, FormControl, OutlinedInput } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';

export default function ModalAddProduto() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '900px',
    maxWidth: '900px',
    width: '95 %',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  const targetAudienceList = [
    {
      value: 'masculino',
      label: 'Masculino',
    },
    {
      value: 'feminino',
      label: 'Feminino',
    },
    {
      value: 'unissex',
      label: 'Unissex',
    },
    {
      value: 'criança',
      label: 'Criança',
    },
  ].map((option) => (
    <MenuItem key={option.value} value={option.value}>
      {option.label}
    </MenuItem>
  ));

  return (
    <div>
      <button className={styles.open_btn} onClick={handleOpen}>
        Open modal
      </button>
      <Modal keepMounted open={open} onClose={handleClose}>
        <Box sx={style}>
          <form className={styles.form}>
            <div className={styles.product}>
              <div className={styles.photo}></div>
              <TextField label="Nome do produto" className={styles.name} />
              <TextField
                label="Descrição"
                multiline
                rows={4}
                className={styles.description}
              />
              <TextField label="URL da imagem" className={styles.url} />
              <TextField select label="Público" className={styles.genre}>
                {targetAudienceList}
              </TextField>
              <TextField select label="Categoria" className={styles.category}>
                {targetAudienceList}
              </TextField>
              <TextField
                select
                label="Subcategoria"
                className={styles.subcategory}
              >
                {targetAudienceList}
              </TextField>
              <TextField label="Quantidade" className={styles.amount} />
              <FormControl className={styles.price}>
                <InputLabel>Amount</InputLabel>
                <OutlinedInput
                  startAdornment={
                    <InputAdornment position="start">R$</InputAdornment>
                  }
                  label="Amount"
                />
              </FormControl>
            </div>

            <Button
              variant="contained"
              type="submit"
              className={styles.submit_btn}
            >
              Adicionar produto
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
