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
      <IdentificationPreview
        prevStep={prevStep}
        nextStep={nextStep}
        overlay={false}
      />
      <PaymentPreview prevStep={prevStep} nextStep={nextStep} overlay={true} />
    </div>
  );
};

export default Identification;
