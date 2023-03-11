import { Button } from "@mui/material"
import { Idata } from "../../../compartilhado/IData"
import styles from './ListaInteresses.module.scss'

interface ListaInteressesProps {
    data: Idata
    atualizarCampo: (key: string, value: string) => void;

}
const ListaInteresses = ({data}: ListaInteressesProps) => {
    return (
        <div className={styles.camposCadastro}>
            <Button variant="contained" className={styles.camposCadastro__acessorios}>Acessórios</Button>
            <Button variant="contained" className={styles.camposCadastro__suplementos}>Suplementos</Button>
            <Button variant="contained">Esportes</Button>
            <Button variant="contained">Roupas</Button>
            <Button variant="contained">Calçados</Button>
        </div>
    )
}
export default ListaInteresses