import nikeImg from "../../../../public/images/brands/nike.png"
import adidasImg from "../../../../public/images/brands/adidas.png"
import umbroImg from "../../../../public/images/brands/umbro-logo.png"
import underImg from "../../../../public/images/brands/under.png"
import sollarisImg from "../../../../public/images/logo_sollaris.png"


import styles from './sectionOneBrands.module.scss'

const SectionOneBrands = () => {
    return(
        <>
            <div className={styles.blocoMarcas}>
                <ul className={styles.blocoMarcas__lista}>
                    <li><img className={styles.imagesBrand} src={nikeImg.src} alt="nike" /></li>
                    <li><img className={styles.imagesBrand} src={adidasImg.src} alt="adidas" /></li>
                    <li><img className={styles.imagesLogo} src={sollarisImg.src} alt="adidas" /></li>
                    <li><img className={styles.imagesBrand} src={umbroImg.src} alt="umbro" /></li>
                    <li><img className={styles.imagesBrand} src={underImg.src} alt="under" /></li>
                </ul>
                <p><i>ENCONTRE O SEU MELHOR!</i></p>
            </div>
            
        </>
    )

}
export default SectionOneBrands;