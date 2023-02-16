import { Button } from '@mui/material';
import InputDate from '../../components/InputDate';
import InputText from '../../components/InputText';
import styles from './FormCadastroUsuario.module.scss'
const Form = () => {
    return(
        <form className={styles.form__body}>
            <InputText label="Nome"/> 
            <InputDate label="Data de Nascimento "/>
            <InputText label="CPF"/> 
            <InputText label="E-mail"/> 
            <InputText label="Telefone"/> 
            <InputText label="Senha"/> 
            <InputText label="Confirme sua senha"/>
            <Button color='success' variant="contained">Salvar e Continuar</Button> 
        </form>
    )
    
}
export default Form;