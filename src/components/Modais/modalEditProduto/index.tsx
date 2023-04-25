import styles from "./modalEditProduto.module.scss";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { MdDelete, MdModeEdit } from "react-icons/md";
import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { IProduto } from "../../../compartilhado/IProduto";
import { httpApiMockada, httpProduto } from "../../../http";

import { categories } from "../../../compartilhado/variaveis/categorias-variaveis";
import styled from "styled-components";

interface modalEditarProps {
  idSelecionado: string;
  setarLista: (listaAtualizada: string[]) => void;
  snackbarOpenEdit: boolean;
  setSnackbarEditOpen: (open: boolean) => void;
}

const ModalEditarProduto = ({
  idSelecionado,
  setarLista,
  setSnackbarEditOpen,
  snackbarOpenEdit
}: modalEditarProps) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  // STATES PARA CAPTURA DE CAMPOS
  const [nomeProduto, setNomeProduto] = useState("");
  const [descricao, setDescricao] = useState("");
  const [urlImagem, setUrlImagem] = useState("");
  const [publico, setPublico] = useState("");
  const [categoria, setCategoria] = useState("");
  const [subCategoria, setSubCategoria] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [preco, setPreco] = useState("");
  const [empresaid, setEmpresaId] = useState("1")
  const [peso, setPeso] = useState("");
  const [tamanho, setTamanho] = useState("");
  const [colorPrimary, setColorPrimary] = useState("");


  const [isSubCategoriaDisable, setIsSubCategoriaDisable] = useState(false);

  const [subcategories, setSubcategories] = useState(
    categories[0].subcategories
  );

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: "900px",
    maxWidth: "1200px",
    width: "100vw",
    bgcolor: "background.paper",
    boxShadow: 24,
    display: "flex",
    justifyContent: "center",
    p: 4,
  };

  const targetAudienceList = [
    {
      value: "MASCULINO",
      label: "Masculino",
    },
    {
      value: "FEMININO",
      label: "Feminino",
    },
    {
      value: "UNISSEX",
      label: "Unissex",
    },
    {
      value: "CRIANÇA",
      label: "Criança",
    },
  ].map((option) => (
    <MenuItem key={option.value} value={option.value}>
      {option.label}
    </MenuItem>
  ));

  const categorias = categories.map((category) => (
    <MenuItem key={category.value} value={category.value}>
      {category.label}
    </MenuItem>
  ));

  const sub = subcategories.map((option) => (
    <MenuItem key={option.value} value={option.value}>
      {option.label}
    </MenuItem>
  ));



  const regastarInformacoesProdutoSelecionado = () => {
    // httpProduto
    //   .get<IProduto>(`/api/products/${idSelecionado}`)
    httpApiMockada
      .get<IProduto>(`produtos/${idSelecionado}`)
      .then((resp) => {
        console.log(resp.data)
        setNomeProduto(resp.data.nome);
        setDescricao(resp.data.descricao);
        setUrlImagem(resp.data.img);
        setPublico(resp.data.publico);
        setCategoria(resp.data.categoria);
        setSubCategoria(resp.data.sub_categoria);
        setPreco(resp.data.preco);
        setPeso(resp.data.detalhes_produto.peso);
        setTamanho(resp.data.detalhes_produto.tamanho)
        setQuantidade(resp.data.detalhes_produto.quantidade);
        setColorPrimary(resp.data.detalhes_produto.cor);
        setarSubCategorias(categoria)
      })
      .catch((err) => alert(err));
  };


  const categoriasLista = categories.map((option) => (
    <MenuItem key={option.value} value={option.value}>
      {option.label}
    </MenuItem>
  ));


  function setarSubCategorias(nomeCategoriaSelecionada: string) {
    if (nomeCategoriaSelecionada === "Calçados") {
      setSubcategories(categories[0].subcategories);
    } else if (nomeCategoriaSelecionada === "Roupas") {
      setSubcategories(categories[1].subcategories);
    } else if (nomeCategoriaSelecionada === "Suplementos") {
      setSubcategories(categories[2].subcategories);
    } else if (nomeCategoriaSelecionada === "Esportes") {
      setSubcategories(categories[3].subcategories);
    } else if (nomeCategoriaSelecionada === "Acessórios") {
      setSubcategories(categories[4].subcategories);
    }
  }


  function atirarFuncoes() {
    handleOpen(), regastarInformacoesProdutoSelecionado();
  }




  function regastarListaProdutos() {
    // httpProduto
    //   .get('/api/products')
    httpApiMockada
      .get('produtos')
      .then((response) => { setarLista(response.data) })
      .catch((error) => console.error);
  }

  const atualizarProduto = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const produtoAtualizado: IProduto = {
      empresa_id: empresaid,
      nome: nomeProduto,
      descricao: descricao,
      img: urlImagem,
      publico: publico,
      categoria: categoria,
      sub_categoria: subCategoria,
      preco: preco,
      detalhes_produto: {
        peso: peso,
        quantidade: quantidade,
        tamanho: tamanho, 
        cor: colorPrimary
      }
    };
    // httpProduto
    //   .put(`produtos/${idSelecionado}`, produtoAtualizado)
    //   .then((response) => setOpen(false))
    //   .then((resp) => {
    //     regastarListaProdutos();
    //   })
    //   .catch((err) => console.log(err));
    httpApiMockada
      .put(`produtos/${idSelecionado}`, produtoAtualizado)
      .then((response) => setOpen(false))
      .then((resp) => {
        regastarListaProdutos();
        setSnackbarEditOpen(true)
      })
      .catch((err) => console.log(err));
  };
  // <h1>PRODUTO DE CÓDIGO: {idSelecionado} </h1>



  const PrimaryColor = styled.div`
    height: 55px; 
    width: 50px; 
    background-color: #${colorPrimary};
    border: 1px solid #000
  `

  return (
    <div>
      <MdModeEdit className={styles.product__edit} onClick={atirarFuncoes} />
      <Modal keepMounted open={open} onClose={handleClose}>
        <Box sx={style}>
          <form className={styles.form}>
            <div className={styles.product}>
              <div className={styles.photo}>
                <img src={urlImagem} alt={nomeProduto} />
              </div>
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
                onChange={(e) => {
                  setCategoria(e.target.value), setIsSubCategoriaDisable(false);
                }}
                value={categoria}
              >
                {categoriasLista}
              </TextField>
              <TextField
                select
                disabled={isSubCategoriaDisable}
                label="Subcategoria"
                className={styles.subcategory}
                onChange={(e) => {
                  setSubCategoria(e.target.value),
                    setarSubCategorias(categoria);
                }}
                value={subCategoria}
              >
                {sub}
              </TextField>
              <TextField
                type="number"
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
              <TextField
                label="Tamanho"
                className={styles.size}
                onChange={(e) => setTamanho(e.target.value)}
                value={tamanho}
              />
              <TextField
                label="Peso"
                className={styles.weight}
                onChange={(e) => setPeso(e.target.value)}
                value={peso}
              />

              <div className={styles.colors}>
                <TextField
                  label="Cor Primária"
                  className={styles.weight}
                  onChange={(e) => setColorPrimary(e.target.value)}
                  value={colorPrimary}
                />
                <PrimaryColor />
              </div>
              

            </div>


            <Button
              variant="contained"
              onClick={(e) => atualizarProduto(e)}
              type="submit"
              className={styles.submit_btn}
            >
              Salvar
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalEditarProduto;
