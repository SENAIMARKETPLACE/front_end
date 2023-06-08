import styles from './modalEditProduto.module.scss';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  TextField,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { httpApiMockada, httpProduto } from '../../../http';

import styled from 'styled-components';
import { IProdutoPost } from '../../../compartilhado/IProdutoPost';
import { IProdutoGet } from '../../../compartilhado/IProdutoGet';
import { IDetalhesProduto } from '../../../compartilhado/IDetalhesProduto';

import {
  MuiColorInput,
  MuiColorInputColors,
  MuiColorInputFormat,
} from 'mui-color-input';
import { ICategory } from 'compartilhado/ICategory';
import { useForm } from '@mantine/form';
import {
  Button,
  Center,
  ColorInput,
  NumberInput,
  Select,
  SimpleGrid,
  TextInput,
  Textarea,
} from '@mantine/core';
import { IconPackage, IconPhoto } from '@tabler/icons-react';
import masks from 'util/fieldMasks';

interface modalEditarProps {
  idSelecionado: string;
  setarLista: (listaAtualizada: string[]) => void;
  snackbarOpenEdit: boolean;
  setSnackbarEditOpen: (open: boolean) => void;
  categoriesAndSubCategories: ICategory[];
}

const ModalEditarProduto = ({
  idSelecionado,
  categoriesAndSubCategories,
  setarLista,
  setSnackbarEditOpen,
  snackbarOpenEdit,
}: modalEditarProps) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  // STATES PARA CAPTURA DE CAMPOS
  const [nomeProduto, setNomeProduto] = useState('');
  const [descricao, setDescricao] = useState('');
  const [urlImagem, setUrlImagem] = useState('');
  const [publico, setPublico] = useState('');
  const [categoria, setCategoria] = useState('');
  const [subCategoria, setSubCategoria] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');
  const [empresaid, setEmpresaId] = useState('1');
  const [peso, setPeso] = useState<string>('');
  const [tamanho, setTamanho] = useState('');
  const [subCategoriasTeste, setSubCategoriasTeste] = useState<JSX.Element[]>();
  const [isSubCategoriaDisable, setIsSubCategoriaDisable] = useState(false);
  const [subCategoriaAtual, setSubCategoriaAtual] = useState('');
  const [idDetalhesProduto, setIdDetalhesProdutos] = useState('');

  const [colorPrimary, setColorPrimary] = useState('');
  const [colorSecondary, setColorSecondary] = useState('');
  const [secondColorField, setColorSecondColorField] = useState(true);

  const format: MuiColorInputFormat = 'hex';

  const trocarPrimeiraCor = (newValue: string, colors: MuiColorInputColors) => {
    setColorPrimary(newValue);
  };
  const trocarSegundaCor = (newValue: string, colors: MuiColorInputColors) => {
    setColorSecondary(newValue);
  };

  // STYLING MODAL IN SMALL SCREEN

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 700);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '1200px',
    width: '95vw',
    maxHeight: '95vh',
    bgcolor: 'background.paper',
    boxShadow: 24,
    display: 'flex',
    justifyContent: 'center',
    padding: isSmallScreen ? 2 : 4, // Define o valor do padding com base no tamanho da tela
    overflow: 'auto',
  };

  const targetAudienceList = [
    {
      value: 'MASCULINO',
      label: 'Masculino',
    },
    {
      value: 'FEMININO',
      label: 'Feminino',
    },
    {
      value: 'UNISSEX',
      label: 'Unissex',
    },
    {
      value: 'CRIANÇA',
      label: 'Criança',
    },
  ].map((option) => ({ value: option.value, label: option.label }));

  const categoriasLista = categoriesAndSubCategories.map((option) => (
    <MenuItem key={option.id} value={option.id}>
      {option.nome}
    </MenuItem>
  ));

  // Fix a ts bug about Categories's request
  const setarSub = (idCategorieSelected: string) => {
    let categorias = categoriesAndSubCategories.filter(
      (c) => c.id === idCategorieSelected
    );
    let subCategoriasLista = categorias[0].sub_categorias.map((option) => (
      <MenuItem key={option.id} value={option.id}>
        {option.nome}
      </MenuItem>
    ));

    setSubCategoriasTeste(subCategoriasLista);
  };

  const regastarInformacoesProdutoSelecionado = () => {
    // httpProduto
    //   .get<IProduto>(`/api/products/${idSelecionado}`)
    httpApiMockada
      .get(`produto-get/${idSelecionado}`)
      .then((resp) => {
        const arrayCores = resp.data.detalhes_dos_produtos[0].cor.split(' ');
        console.log(arrayCores);
        form.setFieldValue('name', resp.data.nome);
        form.setFieldValue('description', resp.data.descricao);
        form.setFieldValue('url', resp.data.img);
        form.setFieldValue('targetAudience', resp.data.publico);
        form.setFieldValue('category', resp.data.categoria.id);
        setarSubTeste(resp.data.categoria.id);
        form.setFieldValue('subCategory', resp.data.categoria.sub_categoria.id);
        form.setFieldValue('price', resp.data.preco);
        form.setFieldValue('weight', resp.data.detalhes_dos_produtos[0].peso);
        form.setFieldValue('size', resp.data.detalhes_dos_produtos[0].tamanho);
        form.setFieldValue(
          'amount',
          Number(resp.data.detalhes_dos_produtos[0].quantidade)
        );
        form.setFieldValue('primaryColor', arrayCores[0]);
        form.setFieldValue('secondaryColor', arrayCores[1]);
      })

      .catch((err) => alert(err));
  };

  function atirarFuncoes() {
    handleOpen(), regastarInformacoesProdutoSelecionado();
  }

  function regastarListaProdutos() {
    // httpProduto
    //   .get("/api/products")
    httpApiMockada
      .get('produtos-get')
      .then((response) => {
        setarLista(response.data);
      })
      .catch((error) => console.error);
  }

  const atualizarProduto = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const detalhesProduto: IDetalhesProduto = {
      id: idDetalhesProduto,
      tamanho: tamanho,
      quantidade: quantidade,
      peso: peso,
      cor: `${colorPrimary} ${colorSecondary ? '' + colorSecondary : ''}`,
    };
    const produtoAtualizado: IProdutoPost = {
      nome: nomeProduto,
      descricao: descricao,
      img: urlImagem,
      publico: publico,
      categoria_id: categoria,
      sub_categoria_id: subCategoria,
      preco: preco,
      detalhes_do_produto: detalhesProduto,
    };
    // httpProduto
    //   .put(`produtos/${idSelecionado}`, produtoAtualizado)
    //   .then((response) => setOpen(false))
    //   .then((resp) => {
    //     regastarListaProdutos();
    //   })
    //   .catch((err) => console.log(err));
    httpApiMockada
      .put(`produtos-post/${idSelecionado}`, produtoAtualizado)
      .then((response) => setOpen(false))
      .then((resp) => {
        regastarListaProdutos();
        setSnackbarEditOpen(true);
      })
      .catch((err) => console.log(err));
  };
  // <h1>PRODUTO DE CÓDIGprodutos-postO: {idSelecionado} </h1>

  // MANTINE FORM
  const [categoriaMantine, setCategoriaMantine] = useState('');
  const [subCategoriaMantine, setSubCategoriaMantine] = useState('');
  const [genreMantine, genreCategoriaMantine] = useState('');
  const [optionsCategories, setOptionsCategories] = useState([]);
  const [optionsSubCategories, setOptionsSubCategories] = useState([]);

  const setarSubTeste = (idCategorieSelected: string) => {
    setSubCategoriaMantine('');
    const categorias = categoriesAndSubCategories.filter(
      (c) => c.id === idCategorieSelected
    );
    let subCategoriasLista = categorias[0].sub_categorias.map((option) => ({
      value: option.id,
      label: option.nome,
    }));

    setOptionsSubCategories(subCategoriasLista);
  };

  useEffect(() => {
    const transformarDados = categoriesAndSubCategories.map((categoria) => ({
      value: categoria.id,
      label: categoria.nome,
    }));

    setOptionsCategories(transformarDados);
  });

  const inputProps = {
    radius: 'sm',
    required: true,
    withAsterisk: false,
    mb: 'xs',
  };

  const remainingCharacters = (
    value: number,
    fieldName: keyof typeof form.values
  ) => {
    const str = `Caracteres restantes: ${
      value - form.values[fieldName].length
    }`;
    return str;
  };

  const form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      name: '',
      description: '',
      url: '',
      targetAudience: '',
      category: '',
      subCategory: '',
      price: '',
      size: '',
      weight: '',
      amount: '',
      primaryColor: '',
      secondaryColor: '',
    },

    // Validações dos campos
    validate: {
      name: (value) =>
        value.length > 6
          ? null
          : 'O nome deve conter no mínimo 6 letras. Usar um nome curto demais resulta em baixa conversão de vendas.',
      description: (value) =>
        value.length > 20
          ? null
          : 'A descrição deve conter no mínimo 20 letras. Interessados usarão este texto para obter informações sobre o seu produto.',
      url: (value: string) => {
        const errors: Array<string> = [];

        /^(http|https):\/\//.test(value)
          ? null
          : errors.push(
              'Certifique-se de que a url inicie com http:// ou https://'
            );
        /\.(jpg|jpeg|png|gif|bmp)$/i.test(value)
          ? null
          : errors.push(
              'A url deve terminar com um tipo válido de imagem (jpeg, jpg ou png)'
            );

        return errors.length > 0 ? errors[0] : null;
      },
      // amount: (value) => (value.length > 0 ? null : 'Informe a quantidade.'),
      // price: (value) => (value.length > 0 ? null : 'Informe o preço.'),
      // size: (value) => (value.length > 0 ? null : 'Informe o tamanho.'),
      // weight: (value) => (value.length > 0 ? null : 'Informe o peso.'),
    },
  });

  const handleInputChange =
    (fieldName: string, maskFunction?: Function) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      const maskedValue = maskFunction ? maskFunction(inputValue) : inputValue;
      form.setFieldValue(fieldName, maskedValue);
    };

  return (
    <div>
      <MdModeEdit className={styles.product__edit} onClick={atirarFuncoes} />
      <Modal keepMounted open={open} onClose={handleClose}>
        <Box sx={style}>
          <form onSubmit={form.onSubmit(console.log)} className={styles.form}>
            <div className={styles.form__part1}>
              <img
                src={form.values.url}
                alt={`Imagem ilustrativa: ${form.values.name}`}
                className={styles['form__part1--image']}
              />
              <div className={styles['form__part1--text']}>
                <TextInput
                  icon={<IconPackage size="1.2rem" />}
                  label="Produto"
                  placeholder="Informe o nome do produto"
                  maxLength={100}
                  description={remainingCharacters(100, 'name')}
                  inputWrapperOrder={['label', 'error', 'input', 'description']}
                  {...inputProps}
                  {...form.getInputProps('name')}
                />
                <Textarea
                  label="Descrição"
                  placeholder="Descreva os detalhes e diferenciais do seu produto."
                  maxLength={800}
                  description={remainingCharacters(800, 'description')}
                  inputWrapperOrder={['label', 'error', 'input', 'description']}
                  {...inputProps}
                  {...form.getInputProps('description')}
                  minRows={4}
                  maxRows={4}
                />
              </div>
            </div>
            <SimpleGrid
              cols={3}
              verticalSpacing={4}
              mb={16}
              breakpoints={[
                { maxWidth: '700', cols: 2, verticalSpacing: '0' },
                { maxWidth: '500', cols: 1, verticalSpacing: '0' },
              ]}
            >
              <TextInput
                icon={<IconPhoto size="1.1rem" />}
                className={styles.url}
                label="Foto do produto"
                placeholder="Insira o link (url) da imagem"
                {...inputProps}
                {...form.getInputProps('url')}
              />
              <NumberInput
                // icon={'kg'}
                className={styles.amount}
                label="Quantidade"
                placeholder="Informe o estoque disponível"
                min={1}
                {...inputProps}
                {...form.getInputProps('amount')}
                type="number"
              />
              <TextInput
                icon={'R$'}
                className={styles.price}
                label="Preço"
                placeholder="Informe o valor do produto"
                {...inputProps}
                {...form.getInputProps('price')}
                min={1}
                onChange={handleInputChange('price', masks.real)}
              />
              <Select
                value={genreMantine}
                className={styles.genre}
                label="Público"
                placeholder="Selecione o público alvo "
                data={targetAudienceList}
                {...inputProps}
                {...form.getInputProps('targetAudience')}
                // onChange={(value) => genreCategoriaMantine(value)}
              />
              <Select
                value={categoriaMantine}
                className={styles.category}
                label="Categoria"
                placeholder="Selecione uma categoria"
                data={optionsCategories}
                // onChange={(value) => setCategoriaMantine(value)}
                {...inputProps}
                {...form.getInputProps('category')}
                onBlur={() => {
                  if (form.values.category !== '') {
                    setarSubTeste(form.values.category);
                  }
                }}
              />
              <Select
                value={subCategoriaMantine}
                className={styles.subcategory}
                label="Sub-Categoria"
                data={optionsSubCategories}
                placeholder="Selecione uma sub-categoria"
                // onChange={(value) => setSubCategoriaMantine(value)}
                {...inputProps}
                {...form.getInputProps('subCategory')}
              />
            </SimpleGrid>

            <SimpleGrid
              cols={4}
              breakpoints={[
                { maxWidth: '700', cols: 2, verticalSpacing: '0' },
                { maxWidth: '500', cols: 1, verticalSpacing: '0' },
              ]}
            >
              <ColorInput
                className={styles.colors}
                label={'Cor primária'}
                dropdownZIndex={1500}
                format="hex"
                swatches={[
                  '#000000',
                  '#ffffff',
                  '#b40000',
                  '#005baf',
                  '#e3e622',
                  '#02b10a',
                  '#df50f2',
                  '#df6a26',
                  '#5f15bf',
                ]}
                {...inputProps}
                {...form.getInputProps('primaryColor')}
              />
              <ColorInput
                className={styles.colors2}
                label={'Cor secundária'}
                dropdownZIndex={1500}
                format="hex"
                swatches={[
                  '#000000',
                  '#ffffff',
                  '#b40000',
                  '#005baf',
                  '#e3e622',
                  '#02b10a',
                  '#df50f2',
                  '#df6a26',
                  '#5f15bf',
                ]}
                {...inputProps}
                {...form.getInputProps('secondaryColor')}
                required={false}
                disabled={form.values.primaryColor === '' ? true : false}
              />
              <TextInput
                // icon={'M'}
                className={styles.size}
                label="Tamanho"
                placeholder="Informe o tamanho do produto"
                {...inputProps}
                {...form.getInputProps('size')}
              />
              <TextInput
                icon={'kg'}
                className={styles.weight}
                label="Peso"
                placeholder="Informe o peso do produto"
                {...inputProps}
                {...form.getInputProps('weight')}
              />
            </SimpleGrid>

            {/* SE IsFormValid ser false na propriedade disabled ele vira true | se IsFormValid ser true na propriedade disabled ele vira false  */}
            <Center>
              <Button
                // onClick={criarProduto}
                type="submit"
                mt="xl"
                radius="xl"
                mb={'xl'}
              >
                Salvar alterações
              </Button>
            </Center>
          </form>
          {/* <form className={styles.form}>
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
                  setarSub(categoria);
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
                  setSubCategoria(e.target.value);
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

              <MuiColorInput
                value={colorPrimary}
                onChange={trocarPrimeiraCor}
                onBlur={(e) => setColorSecondColorField(false)}
                format={format}
                label="Cor Primária"
                className={styles.colors}
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

            <Button
              variant="contained"
              onClick={(e) => atualizarProduto(e)}
              type="submit"
              className={styles.submit_btn}
            >
              Salvar Alterações
            </Button>
          </form> */}
        </Box>
      </Modal>
    </div>
  );
};

export default ModalEditarProduto;
