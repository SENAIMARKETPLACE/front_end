import styles from './FinalizarCompra.module.scss';
import { useRef, useState } from 'react';
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
  IconPhoto,
  IconMessageCircle,
  IconSettings,
} from '@tabler/icons-react';
import Link from 'next/link';
import Cart from 'components/orderFormStepper/Cart';
import Identification from 'components/orderFormStepper/Identification';

export default function FinalizarCompra() {
  const [active, setActive] = useState(0);

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
      <Stepper active={active} breakpoint="sm">
        {/* ETAPA 1 - CARRINHO */}
        <Stepper.Step
          icon={<IconShoppingCart size="1.1rem" />}
          label="Carrinho"
          mr="xl"
        >
          <Cart nextStep={nextStep} />
        </Stepper.Step>

        {/* ETAPA 2 - IDENTIFICAÇÃO */}
        <Stepper.Step label="Identificação" mr="xl">
          <Identification prevStep={prevStep} nextStep={nextStep} />
        </Stepper.Step>

        {/* ETAPA 3 - PAGAMENTO */}
        <Stepper.Step label="Pagamento">
          <div className={styles.step}>
            <section className={styles.identification}>
              <Checkbox label="Aceito a Política de Trocas e Devoluções" />
            </section>
          </div>
          <Group position="apart">
            <Button variant="default" onClick={prevStep} radius="xl">
              Voltar
            </Button>
            <Button onClick={nextStep} radius="xl">
              Finalizar Compra
            </Button>
          </Group>
        </Stepper.Step>
        <Stepper.Completed>
          Compra realizada! Talvez adicionar um efeito loading...
        </Stepper.Completed>
      </Stepper>
    </section>
  );
}
