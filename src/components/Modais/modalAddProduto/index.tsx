import styles from "./modalAddProduct.module.scss";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Button, FormControl, OutlinedInput, styled } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import { useState } from "react";
import { httpApiMockada, httpProduto } from "../../../http";
import { IProdutoPost } from "../../../compartilhado/IProdutoPost";
import { BsPlus } from "react-icons/bs";
import { IconType } from "react-icons/lib";
import {
  MuiColorInput,
  MuiColorInputColors,
  MuiColorInputFormat,
} from "mui-color-input";

// Modern or es5 bundle (pay attention to the note below!)
import { IDetalhesProduto } from "../../../compartilhado/IDetalhesProduto";
import { FaLessThanEqual } from "react-icons/fa";
import { ICategory } from "compartilhado/ICategory";
import { Select } from "@mantine/core";

interface modalAddProductProp {
  setarLista: (listaAtualizada: string[]) => void;
  setarMensagemEEstadoRequisicao: (
    isOpenProps: boolean,
    mensagemProps: string
  ) => void;
  snackbarOpen: boolean;
  setSnackbarOpen: (open: boolean) => void;
  categoriesAndSubCategories: ICategory[];
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
    setCategoriaMantine("");
    setQuantidade("");
    setSubCategoriaMantine("");
    setPreco("");
    setPeso("");
    setColorPrimary("");
    setColorSecondary("");
    setIsSubCategoriaDisable(true);
    setErroNomeProduto(true);
    setErroDescricao(true);
    setErroUrlImagem(true);
    setErroPublico(true);
    setErroCategoria(true);
    setErroSubCategoria(true);
    setErroPreco(true);
    setErroPeso(true);
    setErroPrimaryColor(true);
    setErroQuantidade(true);
    setErroTamanho(true);
  };

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

  let [subCategoriasTeste, setSubCategoriasTeste] = useState<JSX.Element[]>([]);

  const [isSubCategoriaDisable, setIsSubCategoriaDisable] = useState(true);

  const [secondColorField, setColorSecondColorField] = useState(true);
  const [index, setIndex] = useState(0);

  //TESTES SELECT
  const [optionsCategories, setOptionsCategories] = useState([]);
  const [optionsSubCategories, setOptionsSubCategories] = useState([]);

  // ERROS
  const [erroNomeProduto, setErroNomeProduto] = useState(true);
  const [erroDescricao, setErroDescricao] = useState(true);
  const [erroUrlImagem, setErroUrlImagem] = useState(true);
  const [erroPublico, setErroPublico] = useState(true);
  const [erroCategoria, setErroCategoria] = useState(true);
  const [erroSubCategoria, setErroSubCategoria] = useState(true);
  const [erroPreco, setErroPreco] = useState(true);
  const [erroPeso, setErroPeso] = useState(true);
  const [erroTamanho, setErroTamanho] = useState(true);
  const [erroQuantidade, setErroQuantidade] = useState(true);
  const [erroPrimaryColor, setErroPrimaryColor] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  const format: MuiColorInputFormat = "hex";

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

  const trocarPrimeiraCor = (newValue: string, colors: MuiColorInputColors) => {
    setColorPrimary(newValue);
  };
  const trocarSegundaCor = (newValue: string, colors: MuiColorInputColors) => {
    setColorSecondary(newValue);
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
  ].map((option) => ({ value: option.value, label: option.label }));

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
      cor: `${colorPrimary} ${colorSecondary ? "" + colorSecondary : ""}`,
      quantidade: quantidade,
    };
    let produto: IProdutoPost = {
      empresa_id: empresaid,
      nome: nomeProduto,
      descricao: descricao,
      img: urlImagem,
      publico,
      categoria_id: categoriaMantine,
      sub_categoria_id: subCategoriaMantine,
      preco: preco.replace(/,/g, "."),
      detalhes_do_produto: detalhes_produto,
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
        setCategoriaMantine("");
        setQuantidade("");
        setSubCategoriaMantine("");
        setPreco("");
        setTamanho("");
        setPeso("");
        setColorPrimary("");
        setColorSecondary("");
        setIsSubCategoriaDisable(true);
        setIsSubCategoriaDisable(true);
        setErroNomeProduto(true);
        setErroDescricao(true);
        setErroUrlImagem(true);
        setErroPublico(true);
        setErroCategoria(true);
        setErroSubCategoria(true);
        setErroPreco(true);
        setErroPeso(true);
        setErroPrimaryColor(true);
        setErroQuantidade(true);
        setErroTamanho(true);
      })
      .catch((erro: any) => console.log(erro));
    setIsSubCategoriaDisable(true);
  };

  const validarSomenteTamanho = (
    nomeDigitado: string,
    minimo: string,
    maximo: string,
    funcaoSetar?: (valor: React.SetStateAction<boolean>) => void
  ): boolean => {
    const regexNome = new RegExp(`^.{${minimo},${maximo}}$`);
    if (regexNome.test(nomeDigitado)) {
      funcaoSetar(false);
      return false;
    } else {
      funcaoSetar(true);
      return true;
    }
  };

  const validarFoto = (fotoDigitada: string) => {
    const regexFoto = /https?:\/\/.*\.(jpe?g|png)/;
    if (regexFoto.test(fotoDigitada)) {
      setErroUrlImagem(false);
      return false;
    } else {
      setErroUrlImagem(true);
      return true;
    }
  };

  const validarField = (
    opcaoEscolhida: string,
    funcaoSetar: (valor: React.SetStateAction<boolean>) => void
  ): boolean => {
    if (opcaoEscolhida != "") {
      funcaoSetar(false);
      return false;
    } else {
      funcaoSetar(true);
      return true;
    }
  };

  const validarQuantidade = (quantidadeEscolhida: string): boolean => {
    if (quantidadeEscolhida != "") {
      if (parseInt(quantidadeEscolhida) <= 0) {
        setErroQuantidade(true);
        return true;
      } else {
        setErroQuantidade(false);
        return false;
      }
    } else {
      setErroQuantidade(true);
      return true;
    }
  };

  React.useEffect(() => {
    setIsFormValid(
      !erroNomeProduto &&
        !erroDescricao &&
        !erroUrlImagem &&
        !erroPublico &&
        !erroCategoria &&
        !erroSubCategoria &&
        !erroPeso &&
        !erroTamanho &&
        !erroPrimaryColor &&
        !erroQuantidade &&
        !erroPreco
    );
  }, [
    erroNomeProduto,
    erroDescricao,
    erroUrlImagem,
    erroPublico,
    erroCategoria,
    erroSubCategoria,
    erroPreco,
    erroPeso,
    erroTamanho,
    erroQuantidade,
    erroPrimaryColor,
  ]);

  React.useEffect(() => {
    const transformarDados = categoriesAndSubCategories.map((categoria) => ({
      value: categoria.id,
      label: categoria.nome,
    }));

    setOptionsCategories(transformarDados);
  });

  const [categoriaMantine, setCategoriaMantine] = useState("");
  const [subCategoriaMantine, setSubCategoriaMantine] = useState("");
  const [genreMantine, genreCategoriaMantine] = useState("");

  const setarSubTeste = (idCategorieSelected: string) => {
    setSubCategoriaMantine("");
    const categorias = categoriesAndSubCategories.filter(
      (c) => c.id === idCategorieSelected
    );
    let subCategoriasLista = categorias[0].sub_categorias.map((option) => ({
      value: option.id,
      label: option.nome,
    }));

    setOptionsSubCategories(subCategoriasLista);
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
                onBlur={(e) =>
                  validarSomenteTamanho(
                    nomeProduto,
                    "10",
                    "30",
                    setErroNomeProduto
                  )
                }
                value={nomeProduto}
                error={erroNomeProduto}
                inputProps={{ minLength: 10, maxLength: 30 }}
              />
              <TextField
                label="Descrição"
                onChange={(e) => {
                  setDescricao(e.target.value);
                }}
                onBlur={(e) =>
                  validarSomenteTamanho(
                    descricao,
                    "10",
                    "500",
                    setErroDescricao
                  )
                }
                error={erroDescricao}
                multiline
                rows={4}
                className={styles.description}
                value={descricao}
                inputProps={{ minLength: 10, maxLength: 500 }}
              />
              <TextField
                label="URL da imagem"
                className={styles.url}
                onChange={(e) => setUrlImagem(e.target.value)}
                value={urlImagem}
                onBlur={(e) => validarFoto(urlImagem)}
                error={erroUrlImagem}
              />
              {/* <TextField
                select
                label="Público"
                className={styles.genre}
                onChange={(e) => setPublico(e.target.value)}
                value={publico}
                onBlur={(e) => {
                  validarField(publico, setErroPublico);
                }}
                error={erroPublico}
              >
                {targetAudienceList}
              </TextField> */}
              <Select
                value={genreMantine}
                className={styles.genre}
                label="Público"
                placeholder="Selecione o público alvo "
                data={targetAudienceList}
                onChange={(value) => genreCategoriaMantine(value)}
              />
              <Select
                value={categoriaMantine}
                className={styles.category}
                label="Categoria"
                placeholder="Selecione uma categoria"
                data={optionsCategories}
                onChange={(value) => setCategoriaMantine(value)}
                onBlur={() => {
                  if (categoriaMantine !== "") {
                    setarSubTeste(categoriaMantine);
                  }
                }}
              />
              <Select
                value={subCategoriaMantine}
                className={styles.subcategory}
                label="Sub-Categoria"
                data={optionsSubCategories}
                placeholder="Selecione uma sub-categoria"
                onChange={(value) => setSubCategoriaMantine(value)}
              />
              <TextField
                type="number"
                label="Quantidade"
                className={styles.amount}
                onChange={(e) => setQuantidade(e.target.value)}
                onBlur={(e) => validarQuantidade(quantidade)}
                value={quantidade}
                error={erroQuantidade}
              />
              <FormControl className={styles.price}>
                <InputLabel>Preço</InputLabel>
                <OutlinedInput
                  startAdornment={
                    <InputAdornment position="start">R$</InputAdornment>
                  }
                  label="Amount"
                  value={preco}
                  onBlur={(e) => validarField(preco, setErroPreco)}
                  onChange={(e) => setPreco(e.target.value)}
                  error={erroPreco}
                />
              </FormControl>
              <TextField
                label="Tamanho"
                className={styles.size}
                onChange={(e) => setTamanho(e.target.value)}
                onBlur={(e) => validarField(tamanho, setErroTamanho)}
                value={tamanho}
                error={erroTamanho}
              />
              <TextField
                label="Peso"
                className={styles.weight}
                onChange={(e) => setPeso(e.target.value)}
                onBlur={(e) => validarField(peso, setErroPeso)}
                value={peso}
                error={erroPeso}
              />

              <MuiColorInput
                value={colorPrimary}
                onChange={trocarPrimeiraCor}
                onBlur={(e) => {
                  setColorSecondColorField(false),
                    validarField(colorPrimary, setErroPrimaryColor);
                }}
                format={format}
                label="Cor Primária"
                className={styles.colors}
                error={erroPrimaryColor}
              />

              <MuiColorInput
                disabled={secondColorField}
                value={colorSecondary}
                onChange={trocarSegundaCor}
                format={format}
                className={styles.colors2}
                label="Cor Secundária"
              />
            </div>

            {/* SE IsFormValid ser false na propriedade disabled ele vira true | se IsFormValid ser true na propriedade disabled ele vira false  */}
            <Button
              onClick={criarProduto}
              variant="contained"
              type="submit"
              disabled={!isFormValid}
              className={styles.submit_btn}
            >
              CADASTRAR PRODUTO
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
