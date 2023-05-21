import { Button, Group, Radio } from '@mantine/core';
import styles from './IdentificationPreview.module.scss';
import Link from 'next/link';

interface props {
  prevStep: any;
  nextStep: any;
}

const IdentificationPreview = ({ prevStep, nextStep }: props) => {
  return (
    <>
      <section className={styles.identification}>
        <h4 className={styles.identification__label}>Identificação</h4>

        <div className={styles.profile}>
          <p className={styles.identification__description}>Dados pessoais:</p>

          <div className={styles.profile__item}>
            <label>Nome</label>
            <p>João Abreu</p>
          </div>

          <div className={styles.profile__item}>
            <label>CPF</label>
            <p>359******42</p>
          </div>

          <div className={styles.profile__item}>
            <label>E-mail</label>
            <p>joão.hazard@gmail.com</p>
          </div>
        </div>

        <div className={styles.address}>
          <p>Endereço de entrega:</p>
          <Radio
            label="RUA ABILIO MARIA 1090 - JARDIM PAULA - SÃO PAULO"
            size="sm"
            mt="xl"
          />

          <Button variant="subtle" color="gray" radius="xl">
            <Link href="/" style={{ color: 'gray' }}>
              Editar endereço
            </Link>
          </Button>
        </div>

        <div className={styles.delivery}>
          <p>Escolha o tipo de entrega:</p>

          <Radio.Group name="frete" withAsterisk>
            <Group mt="xl">
              <Radio
                value="normal"
                label="Normal - 7 dias úteis (Frete Grátis)"
              />
              <Radio
                value="express"
                label="Express - 4 dias úteis (Frete Grátis)"
              />
            </Group>
          </Radio.Group>
        </div>
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep} radius="xl">
            Voltar
          </Button>
          <Button onClick={nextStep} radius="xl">
            Continuar
          </Button>
        </Group>
      </section>
    </>
  );
};

export default IdentificationPreview;
