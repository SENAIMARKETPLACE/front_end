import styled from "styled-components";
import styles from "./ProductDetails.module.scss";

interface ProductDetailsProps {
  colors: string;
  sizes: string;
}

const ProductDetails = ({ colors, sizes }: ProductDetailsProps) => {
  const arrayCores = colors.split(" ");

  const DivCores = styled.span`
        display: flex;
        justify-content: space-between;
        border-radius: 50px;
        height: 25px;
        width: 25px; 
        background: ${arrayCores.length === 1 ? `${arrayCores[0]};`: `linear-gradient(60deg, ${arrayCores[0]} 50%, ${arrayCores[1]} 50%); ` }
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }
  `;


  return (
    <div className={styles.details}>
      <h3 className={styles.title}>Tamanhos:</h3>
      <div className={styles.size_options}>
        <span className={styles.size}>{sizes}</span>
      </div>

      <h3 className={styles.title}>Cores:</h3>
      <div className={styles.colors}>
        <DivCores/>
        
        
      </div>
    </div>
  );
};

export default ProductDetails;
