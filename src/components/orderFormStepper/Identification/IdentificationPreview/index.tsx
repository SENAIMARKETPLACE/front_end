import { useEffect, useState } from 'react';
import { Button, Group, Radio } from '@mantine/core';
import styles from './IdentificationPreview.module.scss';
import Link from 'next/link';

interface Props {
  prevStep: any;
  nextStep: any;
  overlay: boolean;
}

function hiddenCPF(cpf: string) {
  var formattedCpf = cpf.substr(0, 3) + '*'.repeat(6) + cpf.substr(9);
  return formattedCpf;
}

const IdentificationPreview = ({ prevStep, nextStep, overlay }: Props) => {
  const [selectedDeliveryType, setSelectedDeliveryType] = useState('');
  const [selectedAddressOption, setSelectedAddressOption] = useState(0);

  const isButtonDisabled =
    selectedDeliveryType === '' || selectedAddressOption === 0;

  const handleDeliveryTypeChange = (value: string) => {
    setSelectedDeliveryType(value);
  };

  const handleAddressOptionChange = (value: number) => {
    setSelectedAddressOption(value);
  };

  useEffect(() => {
    setSelectedDeliveryType('normal');
    setSelectedAddressOption(1);
  }, []);

  return (
    <>
      <section
        className={`${styles.identification} ${overlay && styles.overlay}`}
      >
        <h4 className={styles.identification__label}>Identificação</h4>

        <div className={styles.profile}>
          <p className={styles.identification__description}>Dados pessoais:</p>

          <div className={styles.profile__item}>
            <label>Nome</label>
            <p>João Abreu</p>
          </div>

          <div className={styles.profile__item}>
            <label>CPF</label>
            <p>{hiddenCPF('20320302822')}</p>
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
            value={1}
            checked={selectedAddressOption === 1}
            onChange={() => handleAddressOptionChange(1)}
            mt="xl"
          />

          <Button variant="subtle" color="gray" radius="xl" mt={'md'}>
            <Link href="/marketplace/perfil" style={{ color: 'gray' }}>
              Editar endereço
            </Link>
          </Button>
        </div>

        <div className={styles.delivery}>
          <p>Escolha o tipo de entrega:</p>

          <Radio.Group
            value={selectedDeliveryType}
            onChange={handleDeliveryTypeChange}
          >
            <Radio
              value="normal"
              label="Normal - 7 dias úteis (Frete Grátis)"
              mt={'lg'}
            />
            {/* <Radio
              value="express"
              label="Express - 4 dias úteis (Frete Grátis)"
              mt={'sm'}
            /> */}
          </Radio.Group>
        </div>

        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep} radius="xl">
            Voltar
          </Button>
          <Button onClick={nextStep} radius="xl" disabled={isButtonDisabled}>
            Continuar
          </Button>
        </Group>
      </section>
    </>
  );
};

export default IdentificationPreview;
