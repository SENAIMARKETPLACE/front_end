import styles from './Identification.module.scss';
import ProductPreview from './ProductPreview';
import IdentificationPreview from './IdentificationPreview';
import PaymentPreview from './PaymentPreview';

interface props {
  prevStep: any;
  nextStep: any;
}

const Identification = ({ prevStep, nextStep }: props) => {
  return (
    <div className={styles.container}>
      <ProductPreview />
      <IdentificationPreview prevStep={prevStep} nextStep={nextStep} />
      <PaymentPreview />
    </div>
  );
};

export default Identification;
