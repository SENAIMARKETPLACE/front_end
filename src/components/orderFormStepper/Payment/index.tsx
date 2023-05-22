import styles from './Payment.module.scss';
import ProductPreview from '../Identification/ProductPreview';
import IdentificationPreview from '../Identification/IdentificationPreview';
import PaymentPreview from '../Identification/PaymentPreview';

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
      <PaymentPreview prevStep={prevStep} nextStep={nextStep} overlay={false} />
    </div>
  );
};

export default Payment;
