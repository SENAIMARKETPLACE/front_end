import { Button, Menu } from "@mantine/core";
import {
  IconArrowsLeftRight,
  IconBuildingStore,
  IconMessageCircle,
  IconPhoto,
  IconSearch,
  IconSettings,
  IconTag,
  IconTrash,
} from "@tabler/icons-react";
import styles from "./AvatarBusiness.module.scss";
import styled from "styled-components";
import Link from "next/link";

const AvatarBusiness = () => {
  const AvatarBusinessImage = styled.div`
    height: 40px;
    width: 40px;
    border-radius: 50px;
    cursor: pointer;
    background-image: url("https://www.esportelandia.com.br/wp-content/uploads/2019/09/Miami-Heat.jpg");
    background-position: center;
    background-size: cover;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  `;

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <AvatarBusinessImage />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>O que você deseja fazer?</Menu.Label>
        <Menu.Item icon={<IconTag size={14} />}>
          <Link href="/empresa/produtos">Meus produtos</Link>
        </Menu.Item>
        <Menu.Item icon={<IconBuildingStore size={14} />}><Link href="/empresa/minha-loja">Minha Loja</Link></Menu.Item>

        <Menu.Divider />

        <Menu.Item color="red" icon={<IconTrash size={14} />}>
          logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
export default AvatarBusiness;
