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
import { httpApiMockada, httpProduto } from "../../../http";

import styled from "styled-components";
import { IProdutoPost } from "../../../compartilhado/IProdutoPost";
import { IProdutoGet } from "../../../compartilhado/IProdutoGet";
import { IDetalhesProduto } from "../../../compartilhado/IDetalhesProduto";


interface modalEditarProps {
  idSelecionado: string;
  setarLista: (listaAtualizada: string[]) => void;
  snackbarOpenEdit: boolean;
  setSnackbarEditOpen: (open: boolean) => void;
  categoriesAndSubCategories: string[];
}

const ModalEditarProduto = ({
  idSelecionado,
  categoriesAndSubCategories,
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
  const [peso, setPeso] = useState<string>("");
  const [tamanho, setTamanho] = useState("");
  const [colorPrimary, setColorPrimary] = useState("");
  const [subCategoriasTeste, setSubCategoriasTeste] = useState("");
  const [isSubCategoriaDisable, setIsSubCategoriaDisable] = useState(false);
  const [subCategoriaAtual, setSubCategoriaAtual] = useState("");




  
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



 


  const categoriasLista = categoriesAndSubCategories.map((option) => (
    <MenuItem key={option.id} value={option.id}>
      {option.nome}
    </MenuItem>
  ));




  
  const setarSub = (idCategorieSelected: string) => {
    let categorias = categoriesAndSubCategories.filter(c => c.id === idCategorieSelected)
    const subCategoriasLista = categorias[0].sub_categorias.map((option) => (
      <MenuItem key={option.id} value={option.id}>
        {option.nome}
      </MenuItem>
    ));

    setSubCategoriasTeste(subCategoriasLista)
  }


  const regastarInformacoesProdutoSelecionado = () => {
    // httpProduto
    //   .get<IProduto>(`/api/products/${idSelecionado}`)
    httpApiMockada
      .get<IProdutoGet>(`produto-get/${idSelecionado}`)
      .then((resp) => {
        console.log(resp.data)
        setNomeProduto(resp.data.nome);
        setDescricao(resp.data.descricao);
        setUrlImagem(resp.data.img);
        setPublico(resp.data.publico);
        setCategoria(resp.data.categoria.id);
        setSubCategoria(resp.data.categoria.sub_categoria.id);
        setPreco(resp.data.preco);
        setPeso(resp.data.detalhes_dos_produtos[0].peso);
        setTamanho(resp.data.detalhes_dos_produtos[0].tamanho)
        setQuantidade(resp.data.detalhes_dos_produtos[0].quantidade);
        setColorPrimary(resp.data.detalhes_dos_produtos[0].cor);
        setarSub(resp.data.categoria.id)
    
      })
      .then((resp) => console.log(subCategoria.nome))
      .then((resp) => console.log(subCategoria.id))
      .catch((err) => alert(err));
  };





  

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
    const detalhesProduto: IDetalhesProduto ={
      tamanho: tamanho, 
      quantidade: quantidade, 
      peso: peso, 
      cor: colorPrimary
    }
    const produtoAtualizado: IProdutoPost = {
      empresa_id: empresaid,
      nome: nomeProduto,
      descricao: descricao,
      img: urlImagem,
      publico: publico,
      categoria_id: categoria,
      sub_categoria_id: subCategoria,
      preco: preco,
      detalhes_do_produto: detalhesProduto
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
                onBlur={(e) => {
                  setarSub(categoria)
                }}
                value={categoria}
              >
                {categoriasLista}
              </TextField>
              <TextField
                select
                disabled={isSubCategoriaDisable}
                label="Sub-categoria"
                className={styles.subcategory}
                onChange={(e) => {
                  setSubCategoria(e.target.value)
                }}
                value={subCategoria}
              >
                {subCategoriasTeste}
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
