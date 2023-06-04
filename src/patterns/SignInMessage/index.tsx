import styles from './SignInMessage.module.scss';
import login from '../../../public/images/login.svg';
import Link from 'next/link';
import { Button } from '@mantine/core';

interface SignInMessageProps {
  message: string;
}

const SignInMessage = ({ message }: SignInMessageProps) => {
  return (
    <>
      <p>{message}</p>
      <div className={styles.pageMessage}>
        <img src={login.src} width={'300px'}></img>
        <Link href={'/marketplace'}>
          <Button radius="xl" size="md">
            Entrar
          </Button>
        </Link>
      </div>
    </>
  );
};

export default SignInMessage;
