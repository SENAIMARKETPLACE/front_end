import styles from "./Avatar.module.scss";
import { Avatar } from "@mui/material";
import { Menu, Button, Text } from "@mantine/core";
import {
  IconUser,
  IconCalendarStats,
  IconLogout,
  IconLogin,
} from "@tabler/icons-react";
import Link from "next/link";
import ModalLoginEmpresa from "components/Modais/modalLoginEmpresa";
import ModalLoginUsuario from "components/Modais/modalLoginUsuario";
import { useEffect, useState } from "react";
import { IResponseLoginUser } from "compartilhado/IReponseLoginUser";

interface AvatarIconProps {
  isLogged: boolean;
  setarIsLogged: (newState: boolean) => void;
}

interface DisconnectedProps {
  setarIsLogged: (newState: boolean) => void;
}

interface ConnectProps {
  isLogged: boolean;
}

const AvatarIcon = ({ isLogged, setarIsLogged }: AvatarIconProps) => {
  return isLogged ? (
    <Connected isLogged={isLogged} />
  ) : (
    <Disconnected setarIsLogged={setarIsLogged} />
  );
};

export default AvatarIcon;

function Connected({ isLogged }: ConnectProps) {
  const [usuarioInfo, setUsuarioInfo] = useState<IResponseLoginUser>();

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Avatar
          src="https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt96a5fcd6c6f93d80/60dc5e4215da443b102fbe95/50670def60e2e315c689f6cd589d2f2ac8a42f5a.jpg?auto=webp&format=pjpg&width=3840&quality=60"
          className={styles.avatar}
        />
      </Menu.Target>

      <Menu.Dropdown className={styles.avatar__list}>
        {/* AQUI PRECISA VIR O PRIMEIRO NOME DO USUÁRIO */}
        <Menu.Label>Olá, João Acesse:</Menu.Label>
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
          onClick={() => alert("Saindo!")}
        >
          Desconectar
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

function Disconnected({ setarIsLogged }: DisconnectedProps) {
  return (
    <Menu
      shadow="md"
      width={200}
      closeOnItemClick={false}
      closeOnClickOutside={false}
    >
      <Menu.Target>
        {/* <Button leftIcon={<IconLogin />}>Entrar</Button> */}
        <Avatar className={styles.avatar} />
      </Menu.Target>

      <Menu.Dropdown className={styles.avatar__list}>
        <Menu.Label>Como desejar acessar?</Menu.Label>
        {/* <Menu.Item icon={<IconCalendarStats size={14} />}>Empresa</Menu.Item>
        <Menu.Item icon={<IconUser size={14} />}>Cliente</Menu.Item> */}
        <Menu.Item icon={<IconUser size={14} />}>
          <ModalLoginUsuario setarIsLogged={setarIsLogged} />
        </Menu.Item>
        <Menu.Item icon={<IconCalendarStats size={14} />}>
          <ModalLoginEmpresa />
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
