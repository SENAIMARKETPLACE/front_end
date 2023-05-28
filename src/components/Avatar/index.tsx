import styles from './Avatar.module.scss';
import { Avatar } from '@mui/material';
import { Menu, Button, Text } from '@mantine/core';
import {
  IconUser,
  IconCalendarStats,
  IconLogout,
  IconLogin,
} from '@tabler/icons-react';
import Link from 'next/link';
import ModalLoginEmpresa from 'components/Modais/modalLoginEmpresa';
import ModalLoginUsuario from 'components/Modais/modalLoginUsuario';

interface AvatarIconProps {
  isLogged: boolean;
}

const AvatarIcon = ({ isLogged }: AvatarIconProps) => {
  return isLogged ? <Connected /> : <Disconnected />;
};

export default AvatarIcon;

function Connected() {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Avatar className={styles.avatar} />
      </Menu.Target>

      <Menu.Dropdown className={styles.avatar__list}>
        {/* AQUI PRECISA VIR O PRIMEIRO NOME DO USUÁRIO */}
        <Menu.Label>Olá, João. Acesse:</Menu.Label>
        <Menu.Item icon={<IconCalendarStats size={14} />}>
          <Link href="/pedidos">Seus pedidos</Link>
        </Menu.Item>
        <Menu.Item icon={<IconUser size={14} />}>
          <Link href="/perfil">Editar perfil</Link>
        </Menu.Item>

        <Menu.Divider />

        {/* <Menu.Label>Sair</Menu.Label> */}
        <Menu.Item
          color="gray"
          icon={<IconLogout size={14} />}
          onClick={() => alert('Saindo!')}
        >
          Desconectar
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

function Disconnected() {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        {/* <Button leftIcon={<IconLogin />}>Entrar</Button> */}
        <Avatar className={styles.avatar} />
      </Menu.Target>

      <Menu.Dropdown className={styles.avatar__list}>
        <Menu.Label>Como desejar acessar?</Menu.Label>
        <Menu.Item icon={<IconCalendarStats size={14} />}>Empresa</Menu.Item>
        <Menu.Item icon={<IconUser size={14} />}>Cliente</Menu.Item>
        {/* <Menu.Item icon={<IconUser size={14} />}>
          <ModalLoginEmpresa />
        </Menu.Item>
        <Menu.Item icon={<IconUser size={14} />}>
          <ModalLoginUsuario />
        </Menu.Item> */}
      </Menu.Dropdown>
    </Menu>
  );
}
