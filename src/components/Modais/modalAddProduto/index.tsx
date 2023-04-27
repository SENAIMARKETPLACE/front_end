import styles from "./modalAddProduct.module.scss";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Button, FormControl, OutlinedInput, Select } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import { useState } from "react";
import { httpApiMockada, httpProduto } from "../../../http";
import { IProdutoPost } from "../../../compartilhado/IProdutoPost";
import { BsPlus } from "react-icons/bs";
import ModalInformacaoCadastro from "../modalInformacaoCadastro";
import { IconType } from "react-icons/lib";
import { MdCheckCircle, MdError } from "react-icons/md";
import styled from "styled-components";

// Modern or es5 bundle (pay attention to the note below!)
import PickrComponent from "../../PickrComponent";
import { IProdutoGet } from "../../../compartilhado/IProdutoGet";
import { ICategory } from "../../../compartilhado/ICategory";
import { IDetalhesProduto } from "../../../compartilhado/IDetalhesProduto";

interface modalAddProductProp {
  setarLista: (listaAtualizada: string[]) => void;
  setarMensagemEEstadoRequisicao: (
    isOpenProps: boolean,
    mensagemProps: string
  ) => void;
  snackbarOpen: boolean;
  setSnackbarOpen: (open: boolean) => void;
  categoriesAndSubCategories: string[];
}
export default function ModalAddProduto({
  setarLista,
  categoriesAndSubCategories,
  setarMensagemEEstadoRequisicao,
  snackbarOpen,
  setSnackbarOpen,
}: modalAddProductProp) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNomeProduto("");
    setDescricao("");
    setUrlImagem("");
    setPublico("");
    setCategoria("");
    setQuantidade("");
    setSubCategoria("");
    setPreco("");
    setIsSubCategoriaDisable(true);
  };

  const [openModalRegister, setOpenModalRegister] = useState(false);
  const [mensagemModal, setMensagemModal] = useState<string>("");
  const [descricaoModal, setDescricaoModal] = useState<string>("");
  const [legendaBotao, setLegendaBotao] = useState<string>("");
  const [corModal, setCorModal] = useState<string>("");
  const [iconModal, setIconModal] = useState<IconType>();
  const [categoriasESubCategorias, setCategoriasESubCategorias ] = useState<string>("")

  // STATES PARA CAPTURA DE CAMPOS
  const [nomeProduto, setNomeProduto] = useState("");
  const [descricao, setDescricao] = useState("");
  const [urlImagem, setUrlImagem] = useState("");
  const [publico, setPublico] = useState("");
  const [categoria, setCategoria] = useState("");
  const [subCategoria, setSubCategoria] = useState("");
  const [preco, setPreco] = useState("");
  const [empresaid, setEmpresaId] = useState("1");
  const [peso, setPeso] = useState("");
  const [tamanho, setTamanho] = useState("");
  const [quantidade, setQuantidade] = useState("");

  const [colorPrimary, setColorPrimary] = useState("");
  const [colorSecondary, setColorSecondary] = useState("");
  const [colors, setColors] = useState("");

  let  [subCategoriasTeste, setSubCategoriasTeste] = useState("");


  const [isSubCategoriaDisable, setIsSubCategoriaDisable] = useState(true);
  const [index, setIndex] = useState(0);



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
    const categorias = categoriesAndSubCategories.filter(c => c.id === idCategorieSelected)
    let subCategoriasLista =  categorias[0].subCategorias.map((option) => (
      <MenuItem key={option.id} value={option.id}>
        {option.nome}
      </MenuItem>
    ));

    setSubCategoriasTeste(subCategoriasLista)
  }


  

  const resgatarListaProdutos = () => {
    httpProduto
      .get("/api/products")
      .then((resp) => {
        setarLista(resp.data.content);
      })
      .catch((err) => console.log(err));
    // httpApiMockada
    //   .get("produtos")
    //   .then((resp) => {
    //     setarLista(resp.data);
    //   })
    //   .catch((err) => console.log(err));
  };




 
  const criarProduto = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // SETAR VARIÁVEL DO TIPO CATEGORIA
    let detalhes_produto: IDetalhesProduto = {
      tamanho: tamanho, 
      peso: peso, 
      cor: colorPrimary, 
      quantidade: quantidade
    }
    let produto: IProdutoPost = {
      empresa_id: empresaid,
      nome: nomeProduto,
      descricao: descricao,
      img: urlImagem,
      publico,
      categoria_id: categoria,
      sub_categoria_id: subCategoria,
      preco,
      detalhes_do_produto: detalhes_produto
    };

    httpProduto
      .post("/api/products", produto)
    // httpApiMockada
    //   .post("produtos-post", produto)
    //   .then((resp) => {
    //     console.log("Produto Criado com Sucesso");
    //   })
      .then((resp) => {
        resgatarListaProdutos();
        setOpen(false);
        setSnackbarOpen(true);
        setNomeProduto("");
        setDescricao("");
        setUrlImagem("");
        setPublico("");
        setCategoria("");
        setQuantidade("");
        setSubCategoria("");
        setPreco("");
        setTamanho("");
        setPeso("");
        setColorPrimary("")
        setIsSubCategoriaDisable(true);
      })
      .catch((erro: any) => console.log(erro));
    setIsSubCategoriaDisable(true);
  };

  const PrimaryColor = styled.div`
    height: 55px; 
    width: 50px; 
    background-color: #${colorPrimary};
    border: 1px solid #000
  `
  const SecondaryColor = styled.div`
    height: 55px; 
    width: 50px; 
    background-color: #${colorSecondary};
    border: 1px solid #000
  `

  React.useEffect(() => {
    

    
  });

  return (
    <div>
      <Button
        variant="outlined"
        startIcon={<BsPlus />}
        onClick={handleOpen}
        className={styles.open_btn}
      >
        Adicionar produto
      </Button>
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
                label="Subcategoria"
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
              onClick={criarProduto}
              variant="contained"
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
}
