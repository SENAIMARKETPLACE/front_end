import Link from "next/link";
import styles from "./CardSignIn.module.scss"
import Button from '@mui/material/Button';



interface CardSingInProps{
    urlImg:string;
    title: string; 
    description: string;
    linkHref: string;
}



const CardSingIn: React.FC<CardSingInProps> = ({urlImg, title, description, linkHref}) => {
    return(
        <>
            <div className={styles.cardBody}>
                <div className={styles.cardHeader}>
                    <img className={styles.cardHeader__img} src={urlImg} alt="Imagem Cadastro" />
                </div>
                <div className={styles.cardBody__main}>
                    <p className={styles.cardBody__main__title}>{title}</p>
                    <p className={styles.cardBody__main__description}>{description}</p>
                    <Link href={linkHref}>
                        <div className={styles.cardBody__main__button} >
                            <p>CADASTRE-SE</p>
                        </div>
                    </Link>
                </div>

            </div>
        </>
    )
}
export default CardSingIn;

