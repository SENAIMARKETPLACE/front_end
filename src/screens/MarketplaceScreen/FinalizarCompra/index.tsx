import styles from "./FinalizarCompra.module.scss";
import { useEffect, useRef, useState } from "react";
import {
  Stepper,
  Button,
  Group,
  TextInput,
  Code,
  Table,
  ActionIcon,
  NumberInput,
  NumberInputHandlers,
  rem,
  Radio,
  Checkbox,
  AspectRatio,
  Image,
  Overlay,
  Tabs,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconShoppingCart,
  IconBrandCashapp,
  IconId,
} from "@tabler/icons-react";
import Link from "next/link";
import Cart from "components/orderFormStepper/Cart";
import Identification from "components/orderFormStepper/Identification";
import Payment from "components/orderFormStepper/Payment";
import LoadingGif from "layout/LoadingGif";
import CartFinish from "components/orderFormStepper/Cart/CartFinish";
import { IPedidoPost } from "compartilhado/IPedidoPost";
import { IProdutoPost } from "compartilhado/IProdutoPost";
import { IResponseLoginUser } from "compartilhado/IReponseLoginUser";
import SignInMessage from "patterns/SignInMessage";

interface FinalizarCompraProps {
  setarQuantidadeAoExcluirProps: (novaQuantidade: number) => void;
}

// APÓS O LOGIN VALIAR E RESGATA O ID DO USUÁRIO LOGADO E COLOCAR NA VARIÁVEL USUARIO_ID

const pedidoTemplate: IPedidoPost = {
  usuario_id: "1",
  endereco_id: "1",
  pagamento_id: "",
  produtos_selecionados: [],
};

export default function FinalizarCompra({
  setarQuantidadeAoExcluirProps,
}: FinalizarCompraProps) {
  const [active, setActive] = useState(0);
  const [prepararPedido, setPrepararPedido] = useState(pedidoTemplate);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [isOrderFinished, setIsOrderFinished] = useState(0);

  const [precoTotal, setPrecoTotal] = useState("0.0");

  const [usuarioInfo, setUsuarioInfo] = useState<IResponseLoginUser>();


  
  useEffect(() => {
    const userDataString = localStorage.getItem("userLoginResponse");

    if (userDataString) {
      const userData: IResponseLoginUser = JSON.parse(userDataString);

      // ...faça o que for necessário com os dados do usuário
      setUsuarioInfo(userData);
    }
  }, []);

  const setarPrecoTotal = (valorTotal: string) => {
    setPrecoTotal(valorTotal);
  };

  const alterIsOrderFinished = (newValorTotal: number) => {
    setIsOrderFinished(newValorTotal);
  };

  useEffect(() => {
    console.log(pedidoTemplate);
  }, [prepararPedido]);

  const atualizarCampo = (key: string, value: any) => {
    setPrepararPedido((prev) => {
      return { ...prev, [key]: value };
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingPage(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [isLoadingPage]);

  const exibirLoadingPage = (estado: boolean) => {
    setIsLoadingPage(estado);
  };

  const form = useForm({
    initialValues: {
      username: "",
    },
  });

  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      {!usuarioInfo ? (
        (<SignInMessage message="Faça o login para acessar o seu perfil." />)
        ) : (
          <section className={styles.main}>
          {isLoadingPage && <LoadingGif />}
          <h1 className={styles.title}>Finalizar Compra</h1>
          <Stepper active={active} breakpoint="sm">
            {/* ETAPA 1 - CARRINHO */}
            <Stepper.Step
              icon={<IconShoppingCart size="1.1rem" />}
              label="Carrinho"
              mr="xl"
            >
              <Cart
                atualizarCampoProps={atualizarCampo}
                setarValorTotalCompraProps={setarPrecoTotal}
                exibirLoadingPageProps={exibirLoadingPage}
                setarQuantidadeAoExcluirProps={setarQuantidadeAoExcluirProps}
                nextStep={nextStep}
              />
            </Stepper.Step>

            {/* ETAPA 2 - IDENTIFICAÇÃO */}
            <Stepper.Step
              icon={<IconId size="1.1rem" />}
              label="Identificação"
              mr="xl"
            >
              <Identification
                userConnect={usuarioInfo}
                valorTotal={precoTotal}
                prevStep={prevStep}
                nextStep={nextStep}
              />
            </Stepper.Step>

            {/* ETAPA 3 - PAGAMENTO */}
            <Stepper.Step
              icon={<IconBrandCashapp size="1.1rem" />}
              label="Pagamento"
            >
              <Payment
                userConnect={usuarioInfo}
                alterIsOrderFinishedProps={alterIsOrderFinished}
                setarQuantidadeAoExcluirProps={setarQuantidadeAoExcluirProps}
                valorTotal={precoTotal}
                prevStep={prevStep}
                nextStep={nextStep}
              />
            </Stepper.Step>

            <Stepper.Completed>
              <CartFinish isOrderFinished={isOrderFinished} />
            </Stepper.Completed>
          </Stepper>
        </section>
      )}
    </>
  );
}
