import * as React from "react";
import styles from './modalLoginUsuario.module.scss'
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { styled } from "@mui/styles";
import { TextField, Checkbox } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import logo from "../../../../public/images/logo_sollaris.png";



const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "700px",
  bgcolor: "background.paper",
  boxShadow: 24,
  display: "flex"
};



const InputField = styled(TextField)({
  width: "100%",
  margin: "10px 0",
});

const ButtonLogar = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "0px 10px",
  border: "1px solid",
  height: "50px",
  lineHeight: 1.5,
  fontWeight: "400",
  borderSize: "2",
  borderColor: "#000",
  backgroundColor: "#000",
  color: "#FFF",
  "&:hover": {
    backgroundColor: "#000",
    borderColor: "#000",
    boxShadow: "none",
    color: "#fff",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#000",
    borderColor: "#000",
  },
});
const ButtonLogarGoogle = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "0px 10px",
  border: "1px solid",
  height: "50px",
  lineHeight: 1.5,
  fontWeight: "400",
  borderSize: "2",
  borderColor: "#000",
  backgroundColor: "#fff",
  color: "#000",
  "&:hover": {
    backgroundColor: "#fff",
    borderColor: "#000",
    boxShadow: "none",
    color: "#000",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#fff",
    borderColor: "#000",
  },
});

const ButtonLogin = styled(Button)({
  marginRight: "15px",
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "0px 10px",
  border: "1px solid",
  height: "50px",
  lineHeight: 1.5,
  fontWeight: "400",
  backgroundColor: "#fff",
  borderSize: "2",
  borderColor: "#65bce8a9",
  color: "#000",
  transition: "background-color 1s ease-out",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: "#65bce8",
    borderColor: "#0062cc",
    boxShadow: "none",
    color: "#fff",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#65bce8",
    borderColor: "#005cbf",
  },
});




export default function ModalLoginUsuario() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <ButtonLogin onClick={handleOpen}>Login Usuário</ButtonLogin>
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
              <div><img src={logo.src} alt="" /></div>
              <div className={styles.modal__leftSide__textoModal}>
                <h2>SEJA BEM VINDO</h2>
                <p>
                  Esperamos que você aproveite ao máximo a sua experiência conosco e
                  que encontre aqui um espaço para se conectar e se inspirar para
                  viver uma vida mais saudável e ativa.
                </p>
              </div>
              <form>
                <InputField label="Email" type="email" />
                <InputField label="Senha" type="password" />
                <div className={styles.modal__leftSide__ganchos}>
                  <div className={styles.modal__leftSide__checkbox}>
                    <Checkbox />
                    <p>Lembrar Senha</p>
                  </div>
                  <div>
                    <p>Esqueceu a Senha?</p>
                  </div>
                </div>
                <div className={styles.modal__leftSide__buttons}>
                  <ButtonLogar type="submit">ENTRAR</ButtonLogar>
                  <ButtonLogarGoogle startIcon={<FcGoogle />}>ENTRAR COM GOOGLE</ButtonLogarGoogle>
                </div>

              </form>
              <div className={styles.modal__leftSide__singIn}>Não conta tem sua usuário cadastrada? <Link href='cadastro-usuario'>Cadastre-se</Link></div>
            </div>
            <div className={styles.modal__divImagem}>

            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
