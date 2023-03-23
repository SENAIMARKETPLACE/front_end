import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/styles';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const ButtonLogin = styled(Button)({
  marginRight: '30px',
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '0px 10px',
  border: '1px solid',
  height: '50px',
  lineHeight: 1.5,
  fontWeight: '400', 
  backgroundColor: '#fff',
  borderSize: '2',
  borderColor: '#65bce8a9',
  color: '#000',
  transition: 'background-color 1s ease-out', 
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: '#65bce8',
    borderColor: '#0062cc',
    boxShadow: 'none',
    color: '#fff'
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#65bce8',
    borderColor: '#005cbf',
  }

})


//margin-right: 30px;
// display: flex;
// align-items: center;
// justify-content: center;
// border: none;
// height: 50px;
// font-weight: 400;
// font-size: 20px;
// width: max-content;
// justify-content: space-around;
// text-decoration: none;
// color: #000;
// padding: 0 10px;
// border: 2px solid #65bce8a9;
// transition: background-color 1s ease-out;
// &:hover{
//     cursor: pointer;
//     background-color: #65bce8;
//     color: #fff;
// }



export default function ModalLoginEmpresa() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <ButtonLogin onClick={handleOpen}>Login Empresa</ButtonLogin>
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
          <h1>Oi</h1>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}