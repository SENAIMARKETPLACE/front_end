import * as React from 'react';
import styles from './modalLoginEmpresa.module.scss';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { styled } from '@mui/styles';
import { TextField, Checkbox, FormControlLabel } from '@mui/material';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import logo from '../../../../public/images/Logo.svg';
import { validates } from 'util/validations';
import { fieldType } from 'compartilhado/enums/fieldTypes';

const ButtonLogar = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '0px 10px',
  border: '1px solid',
  height: '50px',
  lineHeight: 1.5,
  fontWeight: '400',
  borderSize: '2',
  borderColor: '#000',
  backgroundColor: '#000',
  color: '#FFF',
  '&:hover': {
    backgroundColor: '#000',
    borderColor: '#000',
    boxShadow: 'none',
    color: '#fff',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#000',
    borderColor: '#000',
  },
});
const ButtonLogarGoogle = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '0px 10px',
  border: '1px solid',
  height: '50px',
  lineHeight: 1.5,
  fontWeight: '400',
  borderSize: '2',
  borderColor: '#000',
  backgroundColor: '#fff',
  color: '#000',
  '&:hover': {
    backgroundColor: '#fff',
    borderColor: '#000',
    boxShadow: 'none',
    color: '#000',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#fff',
    borderColor: '#000',
  },
});

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '90vh',
  bgcolor: 'background.paper',
  boxShadow: 24,
  display: 'flex',
};

const InputField = styled(TextField)({
  width: '100%',
  margin: '10px 0',
});

export default function ModalLoginEmpresa() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isBtnDisabled, setIsBtnDisabled] = React.useState(true);

  const [emailError, setEmailError] = React.useState(false);
  const [emailMsg, setEmailMsg] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordMsg, setPasswordMsg] = React.useState('');

  const validateEmail = (email: string) => {
    let { error, msg } = validates.email(email);

    error === true ? setEmailError(true) : setEmailError(false);
    setEmailMsg(msg);
  };

  const validatePassword = (password: string) => {
    let { error, msg } = validates.simplePassword(password);

    error === true ? setPasswordError(true) : setPasswordError(false);
    setPasswordMsg(msg);
  };

  const updateLoginBtn = () => {
    emailError && passwordError
      ? setIsBtnDisabled(false)
      : setIsBtnDisabled(true);
  };
  return (
    <div>
      <Button className={styles.buttonLogin} onClick={handleOpen}>
        Login Empresa
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className={styles.modal__leftSide}>
              <div className={styles.modal__leftSide__image}>
                <img src={logo.src} alt="" />
              </div>
              <div className={styles.modal__leftSide__textoModal}>
                <h2>SEJA BEM-VINDO!</h2>
                <p>
                  Queremos que se sintam em casa e que trabalhemos juntos em
                  harmonia, sempre buscando inovação e excelência na prestação
                  de serviços. Juntos, somos mais fortes!
                </p>
              </div>
              <form>
                <InputField
                  label="Email"
                  type="email"
                  error={emailError}
                  helperText={emailMsg}
                  onBlur={(e) => {
                    validateEmail(e.target.value);
                    updateLoginBtn();
                  }}
                  required
                />
                <InputField
                  label="Senha"
                  type="password"
                  error={passwordError}
                  helperText={passwordMsg}
                  onBlur={(e) => {
                    validatePassword(e.target.value);
                    updateLoginBtn();
                  }}
                  required
                />
                <div className={styles.modal__leftSide__ganchos}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Lembrar Senha"
                  />
                  <div>
                    <p
                      onClick={() =>
                        alert(
                          'Entre em contato com o administrador para recuperá-la. \nTelefone: (11) 4002-8922 \nE-mail: suport@sollaris.com'
                        )
                      }
                    >
                      Esqueceu a Senha?
                    </p>
                  </div>
                </div>
                <div className={styles.modal__leftSide__buttons}>
                  <ButtonLogar type="submit" disabled={false}>
                    ENTRAR
                  </ButtonLogar>
                  {/* <ButtonLogarGoogle startIcon={<FcGoogle />}>
                    ENTRAR COM GOOGLE
                  </ButtonLogarGoogle> */}
                </div>
              </form>
              <div className={styles.modal__leftSide__singIn}>
                <p>Não conta tem sua usuário cadastrada? </p>
                <Link href="/cadastro/empresa">Cadastre-se</Link>
              </div>
            </div>
            <div className={styles.modal__divImagem}></div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
