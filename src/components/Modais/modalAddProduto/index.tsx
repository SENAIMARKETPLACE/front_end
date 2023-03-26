import styles from './modalAddProduct.module.scss';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button, FormControl, OutlinedInput } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import { useState } from 'react';
import http from '../../../http';
import { IProduto } from '../../../compartilhado/IProduto';

export default function ModalAddProduto() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // STATES PARA CAPTURA DE CAMPOS
  const [nomeProduto, setNomeProduto] = useState('');
  const [descricao, setDescricao] = useState('');
  const [urlImagem, setUrlImagem] = useState('');
  const [publico, setPublico] = useState('');
  const [categoria, setCategoria] = useState('');
  const [subCategoria, setSubCategoria] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '900px',
    maxWidth: '1200px',
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

  const categories = [
    {
      value: 'Acessórios',
      label: 'Acessórios',
    },
    {
      value: 'Suplementos',
      label: 'Suplementos',
    },
    {
      value: 'Esportes',
      label: 'Esportes',
    },
    {
      value: 'Roupas',
      label: 'Roupas',
    },
    {
      value: 'Calçados',
      label: 'Calçados',
    },
  ].map((option) => (
    <MenuItem key={option.value} value={option.value}>
      {option.label}
    </MenuItem>
  ));

  const subscategories = [
    {
      value: 'corrida',
      label: 'Corrida',
    },
    {
      value: 'casual',
      label: 'Casual',
    },
  ].map((option) => (
    <MenuItem key={option.value} value={option.value}>
      {option.label}
    </MenuItem>
  ));

  const criarProduto = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let produto: IProduto = {
      nome_produto: nomeProduto,
      descricao: descricao,
      url_imagem: urlImagem,
      publico,
      categoria,
      sub_categoria: subCategoria,
      quantidade,
      preco,
    };
    http
      .post('/produtos', produto)
      .then((resp: any) => console.log('Produto Criado com Sucesso', resp))
      .then((resp) => {
        setOpen(false);
        setNomeProduto('');
        setDescricao('');
        setUrlImagem('');
        setPublico('');
        setCategoria('');
        setQuantidade('');
        setSubCategoria('');
        setPreco('');
      })
      .catch((erro: any) => console.log(erro));
  };

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
              <TextField
                label="Nome do produto"
                className={styles.name}
                onChange={(e) => setNomeProduto(e.target.value)}
                value={nomeProduto}
              />
              <TextField
                label="Descrição"
                onChange={(e) => {
                  setDescricao(e.target.value);
                }}
                multiline
                rows={4}
                className={styles.description}
                value={descricao}
              />
              <TextField
                label="URL da imagem"
                className={styles.url}
                onChange={(e) => setUrlImagem(e.target.value)}
                value={urlImagem}
              />
              <TextField
                select
                label="Público"
                className={styles.genre}
                onChange={(e) => setPublico(e.target.value)}
                value={publico}
              >
                {targetAudienceList}
              </TextField>
              <TextField
                select
                label="Categoria"
                className={styles.category}
                onChange={(e) => setCategoria(e.target.value)}
                value={categoria}
              >
                {categories}
              </TextField>
              <TextField
                select
                label="Subcategoria"
                className={styles.subcategory}
                onChange={(e) => setSubCategoria(e.target.value)}
                value={subCategoria}
              >
                {subscategories}
              </TextField>
              <TextField
                label="Quantidade"
                className={styles.amount}
                onChange={(e) => setQuantidade(e.target.value)}
                value={quantidade}
              />
              <FormControl className={styles.price}>
                <InputLabel>Preço</InputLabel>
                <OutlinedInput
                  startAdornment={
                    <InputAdornment position="start">R$</InputAdornment>
                  }
                  label="Amount"
                  value={preco}
                  onChange={(e) => setPreco(e.target.value)}
                />
              </FormControl>
            </div>

            <Button
              onClick={criarProduto}
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
