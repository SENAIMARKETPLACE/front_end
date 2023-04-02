import styles from './SucessMsg.module.scss';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props,ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface StatusAlertProps{
  isOpen: boolean,
  mensagem: string;
}

export default function StatusAlert({isOpen, mensagem}: StatusAlertProps) {

  const [open, setOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);


  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {mensagem}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
