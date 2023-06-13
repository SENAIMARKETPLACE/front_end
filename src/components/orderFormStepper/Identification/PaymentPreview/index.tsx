import {
  AspectRatio,
  Checkbox,
  Overlay,
  Select,
  Tabs,
  TextInput,
  CopyButton,
  ActionIcon,
  Tooltip,
  Group,
  Image,
  Text,
  Button,
} from '@mantine/core';
import styles from './PaymentPreview.module.scss';
import {
  IconCreditCard,
  IconQrcode,
  IconScan,
  IconCopy,
  IconCheck,
} from '@tabler/icons-react';
import { IPedidoPost } from 'compartilhado/IPedidoPost';
import { useEffect, useState } from 'react';
import { IProdutoGet } from 'compartilhado/IProdutoGet';
import { httpApiMockada, httpPedido } from '../../../../http';
import masks from 'util/fieldMasks';
import { httpEmpresa } from '../../../../http';

function RandomBarCode() {
  return (
    <CopyButton value="DDPAK102M4S0M1DMIAJSKM121" timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
          <ActionIcon mt={'md'} color={copied ? 'teal' : 'gray'} onClick={copy}>
            {copied ? <IconCheck size="1rem" /> : <IconCopy size="1rem" />}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  );
}

interface props {
  prevStep: any;
  nextStep: any;
  overlay: boolean;
  valorTotal: string;
  validateFields?: boolean;
  setarQuantidadeAoExcluirProps?: (novaQuantidade: number) => void;
  alterIsOrderFinishedProps?: (newValue: number) => void;
}

const PaymentPreview = ({
  prevStep,
  nextStep,
  overlay,
  valorTotal,
  validateFields,
  setarQuantidadeAoExcluirProps,
  alterIsOrderFinishedProps,
}: props) => {
  const [produtosDetalhes, setProdutoDetalhes] = useState<IPedidoProduto[]>([]);
  const [arrayProdutosDesejados, setArrayProdutosDesejados] = useState<
    IProdutoGet[]
  >([]);
  const [pagamentoSelecionado, setPagamentoSelecionado] = useState<string>('0'); // Estado para controlar a opção de pagamento selecionada
  const [isFormValid, setIsFormValid] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  // INPUT STATES
  const [ownerName, setOwnerName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [validityCard, setValidityCard] = useState('');

  

  const pedidoTemplate: IPedidoPost = {
    usuario_id: '1',
    endereco_id: '1',
    pagamento_id: pagamentoSelecionado,
    produtos_selecionados: [],
  };

  const produtosLocalStorage = localStorage.getItem('productsInCart');
  let produtos: IProdutoGet[] = [];
  if (produtosLocalStorage) {
    produtos = JSON.parse(produtosLocalStorage);
  }

  const produtosSelecionados: IPedidoProduto[] = produtos.map(
    (produto: IProdutoGet) => {
      return {
        produto_detalhe_id: produto.id || '',
        quantidade: produto.quantidadeCarrinho || 0,
      };
    }
  );

  pedidoTemplate.produtos_selecionados = produtosSelecionados;

  useEffect(() => {
    console.log(pedidoTemplate);
  }, [pedidoTemplate]);

  const alterarLocalStorageAposCadastrarPedido = () => {
    localStorage.removeItem('productsInCart');
    localStorage.setItem('qtdProduto', '0');
    setarQuantidadeAoExcluirProps(0);
    alterIsOrderFinishedProps(1);
  };

  const cadastrarPedido = (pedidoAPostar: IPedidoPost) => {
    console.log(pedidoAPostar)
    httpPedido
      .post('/api/orders', pedidoAPostar)
      .then((response) => alterarLocalStorageAposCadastrarPedido())
      .catch((error) => alert(error));
  };

  const checkFormValidity = () => {
    const textInputs = document.querySelectorAll('input[type="text"]');
    let isFormValid = true;

    textInputs.forEach((input) => {
      if (input instanceof HTMLInputElement && input.value === '') {
        isFormValid = false;
      }
    });

    setIsFormValid(isFormValid);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckboxChecked(event.currentTarget.checked);
  };

  const updateBtnState = (type?: string) => {
    if (type === 'credit') {
      !isFormValid || !isCheckboxChecked
        ? setIsDisabled(true)
        : setIsDisabled(false);
    } else {
      !isCheckboxChecked ? setIsDisabled(true) : setIsDisabled(false);
    }
  };

  useEffect(() => {
    updateBtnState();
  }, [isFormValid, isCheckboxChecked]);

  return (
    <>
      <AspectRatio
        ratio={720 / 1080}
        className={`${styles.radio} ${!overlay && styles.overlay}`}
      >
        <section className={styles.payment}>
          <h4 className={styles.payment__label}>Método de Pagamento</h4>

          <Tabs
            color="gray"
            variant="outline"
            defaultValue={validateFields ? 'credit' : ''}
            mt="md"
            mb="lg"
            onTabChange={(value) => setPagamentoSelecionado(value)}
          >
            <Tabs.List>
              <Tabs.Tab
                value="3"
                icon={<IconCreditCard size="0.8rem" />}
                onClick={() => updateBtnState('credit')}
              >
                Crédito
              </Tabs.Tab>
              <Tabs.Tab
                value="1"
                icon={<IconQrcode size="0.8rem" />}
                onClick={() => updateBtnState()}
              >
                Pix
              </Tabs.Tab>
              <Tabs.Tab
                value="4"
                icon={<IconScan size="0.8rem" />}
                onClick={() => updateBtnState()}
              >
                Boleto
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="3" pt="xs">
              <TextInput
                label="Dados do cartão"
                placeholder="Número do cartão"
                description="Preencha todos os campos para finalizar a compra."
                radius="xl"
                value={cardNumber}
                onChange={(e) => {
                  setCardNumber(masks.numbers(e.target.value));
                  checkFormValidity();
                }}
              />
              <TextInput
                placeholder="Nome do titular"
                mt="xs"
                radius="xl"
                value={ownerName}
                onChange={(e) => {
                  setOwnerName(masks.letters(e.target.value));
                  checkFormValidity();
                }}
              />
              <TextInput
                label="Validade"
                placeholder="MM/AA"
                mt="sm"
                radius="xl"
                value={validityCard}
                onChange={(e) => {
                  setValidityCard(masks.monthAndYear(e.target.value));
                  checkFormValidity();
                }}
              />
              <TextInput
                label="Código de segurança"
                placeholder="CVV"
                mt="sm"
                radius="xl"
                onChange={checkFormValidity}
                type="number"
                maxLength={3}
              />
              <Select
                label="Número de parcelas"
                placeholder="Parcelamento"
                mt="sm"
                radius="xl"
                // onChange={checkFormValidity}
                defaultValue="2"
                data={[
                  { value: '2', label: '2x sem juros' },
                  { value: '3', label: '3x sem juros' },
                  { value: '4', label: '4x sem juros' },
                  { value: '5', label: '5x sem juros' },
                ]}
              />
            </Tabs.Panel>

            <Tabs.Panel value="1" pt="xs">
              <Group>
                <TextInput
                  label="Chave PIX"
                  value={'DDPAK102M4S0M1DMIAJSKM121'}
                  placeholder="Número do cartão"
                  radius="xl"
                  readOnly
                />
                <RandomBarCode />
              </Group>
              <Text mt="sm">Ou se preferir: </Text>
              <Image
                src="https://www.qrcode-monkey.com/img/default-preview-qr.svg"
                maw={120}
                mx="auto"
                mt="xs"
              />
            </Tabs.Panel>

            <Tabs.Panel value="4" pt="xs">
              <Group>
                <TextInput
                  label="Código de Barras:"
                  value={'7891234567890'}
                  placeholder="Número do cartão"
                  radius="xl"
                  readOnly
                />
                <RandomBarCode />
              </Group>
              <Text mt="sm">Ou se preferir: </Text>
              <Image
                src="https://www.qrcode-monkey.com/img/default-preview-qr.svg"
                maw={120}
                mx="auto"
                mt="xs"
              />
            </Tabs.Panel>
          </Tabs>

          <Checkbox
            checked={isCheckboxChecked}
            onChange={handleCheckboxChange}
            label="Aceito a Política de Trocas e Devoluções"
            className={styles.terms}
            required
          />
          <h4>Resumo</h4>
          <ul className={styles.payment__resumeList}>
            <li>Valor dos produtos: {valorTotal}</li>
            <li>
              Frete: <span>Grátis</span>
            </li>
            <li>Desconto: -</li>
            <li>Total: {valorTotal}</li>
          </ul>
          <Group position="apart" mt={'xl'}>
            <Button variant="default" onClick={prevStep} radius="xl">
              Voltar
            </Button>
            <Button
              onClick={(e) => {
                nextStep();
                cadastrarPedido(pedidoTemplate);
              }}
              disabled={isDisabled}
              radius="xl"
            >
              Finalizar Compra
            </Button>
          </Group>
        </section>

        {overlay && <Overlay color="#f4f4f4" opacity={0.75} />}
      </AspectRatio>
    </>
  );
};

export default PaymentPreview;
