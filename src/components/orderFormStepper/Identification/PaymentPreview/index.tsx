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
} from "@mantine/core";
import styles from "./PaymentPreview.module.scss";
import {
  IconCreditCard,
  IconQrcode,
  IconScan,
  IconCopy,
  IconCheck,
} from "@tabler/icons-react";
import { IPedidoPost } from "compartilhado/IPedidoPost";
import { useEffect, useState } from "react";
import { IProdutoGet } from "compartilhado/IProdutoGet";
import { httpApiMockada } from "../../../../http";

function Demo() {
  return (
    <CopyButton value="DDPAK102M4S0M1DMIAJSKM121" timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? "Copied" : "Copy"} withArrow position="right">
          <ActionIcon mt={"md"} color={copied ? "teal" : "gray"} onClick={copy}>
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
  setarQuantidadeAoExcluirProps: (novaQuantidade: number) => void;
  alterIsOrderFinishedProps: (newValue: number) => void;
}

const PaymentPreview = ({ prevStep, nextStep, overlay, valorTotal, setarQuantidadeAoExcluirProps, alterIsOrderFinishedProps}: props) => {
  const [produtosDetalhes, setProdutoDetalhes] = useState<IPedidoProduto[]>([]);
  const [arrayProdutosDesejados, setArrayProdutosDesejados] = useState<
    IProdutoGet[]
  >([]);
  const [pagamentoSelecionado, setPagamentoSelecionado] = useState<string>("0"); // Estado para controlar a opção de pagamento selecionada

  const pedidoTemplate: IPedidoPost = {
    usuario_id: "1",
    endereco_id: "1",
    pagamento_id: pagamentoSelecionado,
    produtos_selecionados: [],
  };

  const produtosLocalStorage = localStorage.getItem("productsInCart");
  let produtos: IProdutoGet[] = [];
  if (produtosLocalStorage) {
    produtos = JSON.parse(produtosLocalStorage);
  }

  const produtosSelecionados: IPedidoProduto[] = produtos.map(
    (produto: IProdutoGet) => {
      return {
        produto_detalhe_id: produto.id || "",
        quantidade: produto.quantidadeCarrinho || 0,
      };
    }
  );

  pedidoTemplate.produtos_selecionados = produtosSelecionados;

  useEffect(() => {
    console.log(pedidoTemplate);
  }, [pedidoTemplate]);

  const alterarLocalStorageAposCadastrarPedido = () => {
    localStorage.removeItem("productsInCart")
    localStorage.setItem("qtdProduto", "0")
    setarQuantidadeAoExcluirProps(0)
    alterIsOrderFinishedProps(1)
  }

  const cadastrarPedido = (pedidoAPostar: IPedidoPost) => {
    httpApiMockada
      .post("/pedidos-post", pedidoAPostar)
      .then((response) => alert("PEDIDO CADASTRADO"))
      .then((response) => alterarLocalStorageAposCadastrarPedido())
      .catch((error) => alterIsOrderFinishedProps(2));
  };

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
            defaultValue="gallery"
            mt="md"
            mb="lg"
            onTabChange={(value) => setPagamentoSelecionado(value)}
          >
            <Tabs.List>
              <Tabs.Tab value="1" icon={<IconCreditCard size="0.8rem" />}>
                Crédito
              </Tabs.Tab>
              <Tabs.Tab value="2" icon={<IconQrcode size="0.8rem" />}>
                Pix
              </Tabs.Tab>
              <Tabs.Tab value="3" icon={<IconScan size="0.8rem" />}>
                Boleto
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="1" pt="xs">
              <TextInput
                label="Dados do cartão"
                placeholder="Número do cartão"
                radius="xl"
              />
              <TextInput placeholder="Nome do titular" mt="xs" radius="xl" />
              <TextInput
                label="Validade"
                placeholder="MM/AA"
                mt="sm"
                radius="xl"
              />
              <TextInput
                label="Código de segurança"
                placeholder="CVV"
                mt="sm"
                radius="xl"
              />
              <Select
                label="Número de parcelas"
                placeholder="Parcelamento"
                mt="sm"
                radius="xl"
                data={[
                  { value: "2", label: "2x sem juros" },
                  { value: "3", label: "3x sem juros" },
                  { value: "4", label: "4x sem juros" },
                  { value: "5", label: "5x sem juros" },
                ]}
              />
            </Tabs.Panel>

            <Tabs.Panel value="2" pt="xs">
              <Group>
                <TextInput
                  label="Chave PIX"
                  value={"DDPAK102M4S0M1DMIAJSKM121"}
                  placeholder="Número do cartão"
                  radius="xl"
                  readOnly
                />
                <Demo />
              </Group>
              <Text mt="sm">Ou se preferir: </Text>
              <Image
                src="https://www.qrcode-monkey.com/img/default-preview-qr.svg"
                maw={120}
                mx="auto"
                mt="xs"
              />
            </Tabs.Panel>

            <Tabs.Panel value="3" pt="xs">
              <Group>
                <TextInput
                  label="Código de Barras:"
                  value={"7891234567890"}
                  placeholder="Número do cartão"
                  radius="xl"
                  readOnly
                />
                <Demo />
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
            label="Aceito a Política de Trocas e Devoluções"
            className={styles.terms}
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
          <Group position="apart" mt={"xl"}>
            <Button variant="default" onClick={prevStep} radius="xl">
              Voltar
            </Button>
            <Button
              onClick={(e) => {
                nextStep();
                cadastrarPedido(pedidoTemplate); 
              }}
              radius="xl"
            >
              Finalizar Compra
            </Button>
          </Group>
        </section>

        {overlay && <Overlay color="#ffffff" opacity={0.75} />}
      </AspectRatio>
    </>
  );
};

export default PaymentPreview;
