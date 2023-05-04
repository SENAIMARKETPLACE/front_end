import styles from './EmpresaBanner.module.scss';

interface EmpresaBannerProps {
  image: any;
  alt: string;
}

const EmpresaBanner = ({ image, alt }: EmpresaBannerProps) => {
  return <img className={styles.banner} src={image.src} alt={alt} />;
};

export default EmpresaBanner;
