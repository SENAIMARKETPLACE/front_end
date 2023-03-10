import { Button } from "@mui/material"
import { Idata } from "../../compartilhado/IData"
interface ListaInteressesProps {
    data: Idata
}
const ListaInteresses = ({data}: ListaInteressesProps) => {
    return (
        <div>
            <Button variant="contained">Acessórios</Button>
            <Button variant="contained">Suplementos</Button>
            <Button variant="contained">Esportes</Button>
            <Button variant="contained">Roupas</Button>
            <Button variant="contained">Calçados</Button>
        </div>
    )
}
export default ListaInteresses