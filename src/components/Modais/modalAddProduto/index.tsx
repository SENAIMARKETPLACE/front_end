import styles from "./modalAddProduct.module.scss";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Button, FormControl, OutlinedInput } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import { useState } from "react";
import { httpApiMockada, httpProduto } from "../../../http";
import { IProduto } from "../../../compartilhado/IProduto";
import { BsPlus } from "react-icons/bs";
import { categories } from "../../../compartilhado/variaveis/categorias-variaveis";
import ModalInformacaoCadastro from "../modalInformacaoCadastro";
import { IconType } from "react-icons/lib";
import { MdCheckCircle, MdError } from "react-icons/md";

interface modalAddProductProp {
  setarLista: (listaAtualizada: string[]) => void;
  setarMensagemEEstadoRequisicao: (
    isOpenProps: boolean,
    mensagemProps: string
  ) => void;
  snackbarOpen: boolean;
  setSnackbarOpen: (open: boolean) => void;
}
export default function ModalAddProduto({
  setarLista,
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


  // STATES PARA CAPTURA DE CAMPOS
  const [nomeProduto, setNomeProduto] = useState("");
  const [descricao, setDescricao] = useState("");
  const [urlImagem, setUrlImagem] = useState("");
  const [publico, setPublico] = useState("");
  const [categoria, setCategoria] = useState("");
  const [subCategoria, setSubCategoria] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [preco, setPreco] = useState("");
  const [empresaid, setEmpresaId] = useState("1");

  const [isSubCategoriaDisable, setIsSubCategoriaDisable] = useState(true);
  const [index, setIndex] = useState(0);

  const [subcategories, setSubcategories] = useState(
    categories[index].subcategories
  );
  
  
 const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: "900px",
    maxWidth: "1200px",
    width: "95 %",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const targetAudienceList = [
    {
      value: "masculino",
      label: "Masculino",
    },
    {
      value: "feminino",
      label: "Feminino",
    },
    {
      value: "unissex",
      label: "Unissex",
    },
    {
      value: "criança",
      label: "Criança",
    },
  ].map((option) => (
    <MenuItem key={option.value} value={option.value}>
      {option.label}
    </MenuItem>
  ));

  const categoriasLista = categories.map((option) => (
    <MenuItem key={option.value} value={option.value}>
      {option.label}
    </MenuItem>
  ));

  const sub = subcategories.map((option) => (
    <MenuItem key={option.value} value={option.value}>
      {option.label}
    </MenuItem>
  ));

  const resgatarListaProdutos = () => {
    // httpProduto
    //   .get("/api/products")
    //   .then((resp) => {
    //     setarLista(resp.data.content);
    //   })
    //   .catch((err) => console.log(err));
    httpApiMockada
      .get("produtos")
      .then((resp) => {
        setarLista(resp.data);
      })
      .catch((err) => console.log(err));
  };

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

  const criarProduto = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let produto: IProduto = {
      empresa_id: empresaid,
      nome: nomeProduto,
      descricao: descricao,
      img: urlImagem,
      publico,
      categoria,
      sub_categoria: subCategoria,
      quantidade,
      preco,
    };
    // httpProduto
    //   .post("/api/products", produto)
    //   .then((resp) => {
    //     console.log("Produto Criado com Sucesso");
    //   })
    httpApiMockada
      .post("produtos", produto)
      .then((resp) => {
        console.log("Produto Criado com Sucesso");
      })
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
        setIsSubCategoriaDisable(true);
      })
      .catch((erro: any) => console.log(erro));
    setIsSubCategoriaDisable(true);
  };

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
              Salvar
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
