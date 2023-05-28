import styles from './FinalizarCompra.module.scss';
import { useEffect, useRef, useState } from 'react';
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
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  IconShoppingCart,
  IconBrandCashapp,
  IconId,
} from '@tabler/icons-react';
import Link from 'next/link';
import Cart from 'components/orderFormStepper/Cart';
import Identification from 'components/orderFormStepper/Identification';
import Payment from 'components/orderFormStepper/Payment';
import LoadingGif from 'layout/LoadingGif';


interface FinalizarCompraProps {
  setarQuantidadeAoExcluirProps: (novaQuantidade: number) => void
}



export default function FinalizarCompra({setarQuantidadeAoExcluirProps}: FinalizarCompraProps) {
  const [active, setActive] = useState(0);
  const [isLoadingPage, setIsLoadingPage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingPage(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [isLoadingPage]);

  const exibirLoadingPage = (estado: boolean) => {
    setIsLoadingPage(estado)
  }  

  const form = useForm({
    initialValues: {
      username: '',
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
    <section className={styles.main}>
      {isLoadingPage && <LoadingGif/>}
       <Stepper active={active} breakpoint="sm">
        {/* ETAPA 1 - CARRINHO */}
        <Stepper.Step
          icon={<IconShoppingCart size="1.1rem" />}
          label="Carrinho"
          mr="xl"
        >
          <Cart exibirLoadingPageProps={exibirLoadingPage} setarQuantidadeAoExcluirProps={setarQuantidadeAoExcluirProps} nextStep={nextStep} />
        </Stepper.Step>

        {/* ETAPA 2 - IDENTIFICAÇÃO */}
        <Stepper.Step
          icon={<IconId size="1.1rem" />}
          label="Identificação"
          mr="xl"
        >
          <Identification prevStep={prevStep} nextStep={nextStep} />
        </Stepper.Step>

        {/* ETAPA 3 - PAGAMENTO */}
        <Stepper.Step
          icon={<IconBrandCashapp size="1.1rem" />}
          label="Pagamento"
        >
          <Payment prevStep={prevStep} nextStep={nextStep} />
        </Stepper.Step>

        <Stepper.Completed>
          Compra realizada! Talvez adicionar um efeito loading...
        </Stepper.Completed>
      </Stepper> 
    </section>
  );
}