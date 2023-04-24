import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from 'ModalNewProduct.module.scss'

export default function NewProductModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    color: "#fff",
    transform: "translate(-50%, -50%)",
    width: "100vw",
    boxShadow: 24,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    p: 10,
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <form>
            <img src='' alt='Imagem do produto' />
            <div>Camisa Nike Barcelona I 2022/23</div>
            <div>Como outras camisas da nossa coleção Match, ela combina detalhes de design leves com tecido antissuor para ajudar os grandes craques do mundo a se manterem secos e confortáveis dentro do campo. Esse produto é feito com fibras de poliéster 100% reciclado.</div>
            <div>https://imgnike-a.akamaihd.net/1920x1920/02231015.jpg</div>
          </form>
          {/* <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography> */}
          {/* <section>

          </section> */}
        </Box>
      </Modal>
    </div>
  );
}