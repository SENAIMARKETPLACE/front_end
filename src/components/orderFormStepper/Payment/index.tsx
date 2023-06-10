import styles from './Payment.module.scss';
import ProductPreview from '../Identification/ProductPreview';
import IdentificationPreview from '../Identification/IdentificationPreview';
import PaymentPreview from '../Identification/PaymentPreview';

interface props {
  prevStep: any;
  nextStep: any;
  valorTotal: string;
  setarQuantidadeAoExcluirProps: (novaQuantidade: number) => void;
  alterIsOrderFinishedProps: (newValue: number) => void;
}

const Payment = ({
  prevStep,
  nextStep,
  valorTotal,
  setarQuantidadeAoExcluirProps,
  alterIsOrderFinishedProps,
}: props) => {
  return (
    <div className={styles.container}>
      <ProductPreview />
      <IdentificationPreview
        prevStep={prevStep}
        nextStep={nextStep}
        overlay={true}
      />
      <PaymentPreview
        alterIsOrderFinishedProps={alterIsOrderFinishedProps}
        setarQuantidadeAoExcluirProps={setarQuantidadeAoExcluirProps}
        valorTotal={valorTotal}
        prevStep={prevStep}
        nextStep={nextStep}
        overlay={false}
        validateFields={true}
      />
    </div>
  );
};

export default Payment;
