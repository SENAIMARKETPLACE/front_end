import styles from './Payment.module.scss';
import ProductPreview from '../Identification/ProductPreview';
import IdentificationPreview from '../Identification/IdentificationPreview';
import PaymentPreview from '../Identification/PaymentPreview';
import { Button, Group } from '@mantine/core';

interface props {
  prevStep: any;
  nextStep: any;
}

const Payment = ({ prevStep, nextStep }: props) => {
  return (
    <div className={styles.container}>
      <ProductPreview />
      <IdentificationPreview
        prevStep={prevStep}
        nextStep={nextStep}
        overlay={true}
      />
      <PaymentPreview />

      <Group position="apart">
        <Button variant="default" onClick={prevStep} radius="xl">
          Voltar
        </Button>
        <Button onClick={nextStep} radius="xl">
          Finalizar Compra
        </Button>
      </Group>
    </div>
  );
};

export default Payment;
