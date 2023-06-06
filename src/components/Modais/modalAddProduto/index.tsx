import styles from './modalAddProduct.module.scss';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react';
import { httpApiMockada, httpProduto } from '../../../http';
import { IProdutoPost } from '../../../compartilhado/IProdutoPost';
import { IconAt, IconPaint, IconPackage, IconPhoto } from '@tabler/icons-react';
import noImage from '../../../../public/images/no_image.jpg';

// Modern or es5 bundle (pay attention to the note below!)
import { IDetalhesProduto } from '../../../compartilhado/IDetalhesProduto';
import { ICategory } from 'compartilhado/ICategory';
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
import masks from 'util/fieldMasks';
import { validates } from 'util/validations';
import { useForm } from '@mantine/form';

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
    // setPublico('');
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

  // USE STATES AND VARIABLES

  const [empresaid, setEmpresaId] = useState('1');
  // const [publico, setPublico] = useState('');
  const [isSubCategoriaDisable, setIsSubCategoriaDisable] = useState(true);
  const [optionsCategories, setOptionsCategories] = useState([]);
  const [optionsSubCategories, setOptionsSubCategories] = useState([]);
  const [error, setError] = useState(false); // Estado para controlar se ocorreu um erro no carregamento da imagem

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

  // LIST PRODUCTS

  const resgatarListaProdutos = () => {
    httpProduto
      .get('/api/products')
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

  // CREATE PRODUCT

  const criarProduto = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // SETAR VARIÁVEL DO TIPO CATEGORIA
    let detalhes_produto: IDetalhesProduto = {
      tamanho: form.values.size,
      peso: form.values.weight,
      cor: `${form.values.primaryColor} ${
        form.values.secondaryColor ? '' + form.values.secondaryColor : ''
      }`,
      quantidade: form.values.amount,
    };
    let produto: IProdutoPost = {
      empresa_id: empresaid,
      nome: form.values.name,
      descricao: form.values.description,
      img: form.values.url,
      publico: form.values.targetAudience,
      categoria_id: form.values.category,
      sub_categoria_id: form.values.subCategory,
      preco: form.values.price.replace(/,/g, '.'),
      detalhes_do_produto: detalhes_produto,
    };

    // httpProduto
    //   .post('/api/products', produto)
    httpApiMockada
      .post('produtos-post', produto)
      .then((resp) => {
        console.log('Produto Criado com Sucesso');
      })
      .then((resp) => {
        resgatarListaProdutos();
        setOpen(false);
        setSnackbarOpen(true);
        // setPublico('');
        setCategoriaMantine('');
        setSubCategoriaMantine('');
        setIsSubCategoriaDisable(true);
        setIsSubCategoriaDisable(true);
        // Reset values in mantine form
        // form.reset();
      })
      .catch((erro: any) => console.log(erro));
    setIsSubCategoriaDisable(true);
  };

  // MANTINE FORM
  const [categoriaMantine, setCategoriaMantine] = useState('');
  const [subCategoriaMantine, setSubCategoriaMantine] = useState('');
  const [genreMantine, genreCategoriaMantine] = useState('');

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
      amount: (value) => (value ? null : 'Informe a quantidade.'),
      price: (value) => (value ? null : 'Informe o preço.'),
      size: (value) => (value ? null : 'Informe o tamanho.'),
      weight: (value) => (value ? null : 'Informe o peso.'),
      targetAudience: (value) => (value ? null : 'Selecione uma opção.'),
      category: (value) => (value ? null : 'Selecione uma opção.'),
      subCategory: (value) => (value ? null : 'Selecione uma opção.'),
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
      <Button
        variant="outlined"
        // startIcon={<BsPlus />}
        onClick={handleOpen}
        className={styles.open_btn}
      >
        Adicionar produto
      </Button>
      <Modal keepMounted open={open} onClose={handleClose}>
        <Box sx={style}>
          <form onSubmit={form.onSubmit(console.log)} className={styles.form}>
            <div className={styles.form__part1}>
              <img
                src={error ? noImage.src : form.values.url}
                alt={`Imagem ilustrativa: ${form.values.name}`}
                onError={() => setError(true)}
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
                label="Imagem do produto"
                placeholder="Insira o link (url) da imagem"
                {...inputProps}
                {...form.getInputProps('url')}
                onBlur={() => setError(false)}
              />
              <NumberInput
                // icon={'kg'}
                className={styles.amount}
                label="Quantidade"
                placeholder="Informe o estoque disponível"
                min={1}
                {...inputProps}
                {...form.getInputProps('amount')}
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
                icon={'g'}
                className={styles.weight}
                label="Peso"
                placeholder="Informe o peso do produto"
                {...inputProps}
                {...form.getInputProps('weight')}
                min={1}
                onChange={handleInputChange('weight', masks.numbers)}
              />
            </SimpleGrid>

            {/* SE IsFormValid ser false na propriedade disabled ele vira true | se IsFormValid ser true na propriedade disabled ele vira false  */}
            <Center>
              <Button
                onClick={form.isValid() ? criarProduto : null}
                type="submit"
                mt="xl"
                radius="xl"
                mb={'xl'}
                color="green"
              >
                Cadastrar Produto
              </Button>
            </Center>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
