import styles from './Sidebar.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
  rem,
} from '@mantine/core';
import {
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconLogout,
  IconHeart,
  IconBuildingStore,
  IconTag,
} from '@tabler/icons-react';
import LogoSollaris from '/public/images/logo.svg';
import { Avatar } from '@mui/material';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
  link: {
    width: rem(50),
    height: rem(50),
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color,
    },
  },
}));

interface NavbarLinkProps {
  icon: React.FC<any>;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon size="1.2rem" stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome2, label: 'Início', path: '/marketplace' },
  { icon: IconCalendarStats, label: 'Pedidos', path: '/marketplace/pedidos' },
  // { icon: IconHeart, label: "Favoritos", path: "/marketplace/favoritos" },
  { icon: IconUser, label: 'Perfil', path: '/marketplace/perfil' },
];

const mockDataBusiness = [

  { icon: IconBuildingStore, label: 'Minha Loja', path: '/empresa/minha-loja' },
  { icon: IconTag, label: 'Meus Produtos', path: '/empresa/produtos' },

];


interface SideBarProps{
  setarIsLogged?: (newState: boolean) => void;
}

export function Sidebar({setarIsLogged}: SideBarProps) {
  const router = useRouter();
  const { pathname } = router;
  const [isUser, setIsUser] = useState(false);
  const [active, setActive] = useState(0);

  // useEffect(() => {
  //   if (pathname.includes("marketplace")) {
  //     setIsUser(true);
  //   } else {
  //     setIsUser(false);
  //   }
  // });

  const deslogar = () => {
    // EXCLUIR VARIÁVEL DO LOCALSTORAGE
    localStorage.removeItem("userLoginResponse");

    // setar is Logged como false
    localStorage.setItem("isUserLogged", "false");
    setarIsLogged(false);
    //ENVIAR PARA A PÁGINA, AGORA DESLOGADO 
    router.reload()
  };

  useEffect(() => {
    if (pathname.includes('marketplace')) {
      setIsUser(true);
      const activeIndex = mockdata.findIndex((link) => link.path === pathname);
      setActive(activeIndex);
    } else {
      setIsUser(false);
      const activeIndex = mockDataBusiness.findIndex(
        (link) => link.path === pathname
      );
      setActive(activeIndex);
    }
  }, [pathname]);

  const linksMarketplace = mockdata.map((link, index) => (
    <Link href={link.path} key={link.label}>
      <NavbarLink
        {...link}
        key={link.label}
        active={pathname === link.path}
        onClick={() => setActive(index)}
      />
    </Link>
  ));

  const linksEmpresa = mockDataBusiness.map((link, index) => (
    <Link href={link.path} key={link.label}>
      <NavbarLink
        {...link}
        key={link.label}
        active={pathname === link.path}
        onClick={() => setActive(index)}
      />
    </Link>
  ));

  return (
    <Navbar className={styles.sidebar}>
      <Center className={styles.sidebar__logo}>

        {isUser ? (
          <Link href={"/#"}>
            <img src={LogoSollaris.src} alt="Logo do Sollaris" />
          </Link>
        ) : (
          <Link href={"http://localhost:3000/empresa/produtos"}>
            <img src={LogoSollaris.src} alt="Logo do Sollaris" />
          </Link>
        )}

      </Center>
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {isUser ? linksMarketplace : linksEmpresa}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          {/* <Avatar className={styles.buttonCart__avatar} /> */}
          <NavbarLink
            icon={IconLogout}
            label="Sair"

            onClick={() => deslogar()}

          />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}
