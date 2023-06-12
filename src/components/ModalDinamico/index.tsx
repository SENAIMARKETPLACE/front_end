import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import { IconLogout } from "@tabler/icons-react";
import { styled } from "@mui/material";
import router from "next/router";
import sollarisImg from "../../../public/images/logo.png"; 


interface FadeProps {
  children: React.ReactElement;
  in?: boolean;
  onClick?: any;
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
  onExited?: (node: HTMLElement, isAppearing: boolean) => void;
  ownerState?: any;
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(
  props,
  ref
) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null as any, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null as any, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const StyledButton = styled(Button)`
  width: 20px;
  height: 20px;
  color: #f50057;
  border-radius: 50px;
  font-weight: bold;
  font-size: 10px;
  font-family: "Poppins", sans-serif;
  &:hover {
    color: #ff4081;
  }
`;

const CancelButton = styled(Button)`
  background-color: #f50057;
  color: white;
  border-radius: 5px;
  font-family: "Poppins", sans-serif;
  margin-right: 10px;

  &:hover {
    background-color: #ff4081;
  }
`;

const ConfirmButton = styled(Button)`
  background-color: #4caf50;
  color: white;
  border-radius: 5px;
  font-family: "Poppins", sans-serif;

  &:hover {
    background-color: #81c784;
  }
`;

const CustomBox = styled(Box)`
  background-color: #f2f2f2;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border: none;
  box-shadow: none;
  row-gap: 30px;
  text-align: center;
  border: none;
  font-family: "Poppins", sans-serif;
`;

interface SpringModalProps {
  setarIsLogged?: (newState: boolean) => void;
}

export default function SpringModal({ setarIsLogged }: SpringModalProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deslogar = () => {
    alert("Saindo");
    localStorage.removeItem("userLoginResponse");
    localStorage.removeItem("productsInCart");
    localStorage.setItem("qtdProduto", "0");
    localStorage.setItem("isUserLogged", "false");
    router.push("/marketplace");
    setarIsLogged(false);
    handleClose();
    router.reload();
  };

  return (
    <div>
      <StyledButton onClick={handleOpen}>
        <IconLogout size={20} />
      </StyledButton>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
  
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
       
      >
        <Fade in={open}>
          <CustomBox sx={style}>
            <img src={sollarisImg.src} alt="" />
            <p>Atleta, você deseja mesmo sair de campo?</p>
            <div>
              <CancelButton onClick={() => handleClose()}>
                Não sair
              </CancelButton>
              <ConfirmButton onClick={() => deslogar()}>
                Encerrar Sessão
              </ConfirmButton>
            </div>
          </CustomBox>
        </Fade>
      </Modal>
    </div>
  );
}
