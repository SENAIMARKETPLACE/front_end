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
import { httpProduto } from "../../../http";

import { categories } from "../../../compartilhado/variaveis/categorias-variaveis";

interface modalEditarProps {
  idSelecionado: string;
  setarLista: (listaAtualizada: string[]) => void;
}

const ModalEditarProduto = ({
  idSelecionado,
  setarLista,
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
    httpProduto
      .get<IProduto>(`/api/products/${idSelecionado}`)
      .then((resp) => {
        setNomeProduto(resp.data.nome);
        setDescricao(resp.data.descricao);
        setUrlImagem(resp.data.img);
        setPublico(resp.data.publico);
        setCategoria(resp.data.categoria);
        setSubCategoria(resp.data.sub_categoria);
        setQuantidade(resp.data.quantidade);
        setPreco(resp.data.preco);
        setarSubCategorias(categoria)

      })
      .catch((err) => alert(err));
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

  
  function atirarFuncoes() {
    handleOpen(), regastarInformacoesProdutoSelecionado();
  }


 

  function regastarListaProdutos() {
    httpProduto
      .get('/api/products')
      .then((response) => {setarLista(response.data.content)})
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
      quantidade: quantidade,
      preco: preco,
    };
    httpProduto
      .put(`/api/products/${idSelecionado}`, produtoAtualizado)
      .then((response) => setOpen(false))
      .then((resp) => {
        regastarListaProdutos();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <MdModeEdit className={styles.product__edit} onClick={atirarFuncoes} />
      <Modal keepMounted open={open} onClose={handleClose}>
        <Box sx={style}>
          <h1>PRODUTO DE CÓDIGO: {idSelecionado} </h1>
          <form className={styles.form}>
            <div className={styles.product}>
              <div className={styles.photo}>
                <img src={urlImagem} alt={nomeProduto} />
              </div>
              <TextField
                InputLabelProps={{ shrink: true }}
                label="Nome do produto"
                className={styles.name}
                onChange={(e) => setNomeProduto(e.target.value)}
                value={nomeProduto}
              />
              <TextField
                InputLabelProps={{ shrink: true }}
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
                InputLabelProps={{ shrink: true }}
                label="URL da imagem"
                className={styles.url}
                onChange={(e) => setUrlImagem(e.target.value)}
                value={urlImagem}
              />
              <TextField
                InputLabelProps={{ shrink: true }}
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
                InputLabelProps={{ shrink: true }}
                label="Categoria"
                className={styles.category}
                onChange={(e) =>  {setCategoria(e.target.value)}}
                value={categoria}
              >
                {categorias}
              </TextField>
              <TextField
                InputLabelProps={{ shrink: true }}
                select
                label="Sub-categoria"
                disabled={false}
                className={styles.subcategory}
                onChange={(e) => {setSubCategoria(e.target.value), setarSubCategorias(categoria)}}
                value={subCategoria}
              >
                {sub}
              </TextField>
              <TextField
                InputLabelProps={{ shrink: true }}
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
