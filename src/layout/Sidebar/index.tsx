import styles from './Sidebar.module.scss';
import { useState } from 'react';
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
} from '@tabler/icons-react';
import LogoSollaris from '/public/images/logo.svg';
import { Avatar } from '@mui/material';
import Link from 'next/link';
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
  { icon: IconCalendarStats, label: 'Pedidos', path: '/pedidos' },
  { icon: IconHeart, label: 'Favoritos', path: '/favoritos' },
  { icon: IconUser, label: 'Perfil', path: '/perfil' },
];

export function Sidebar() {
  const router = useRouter();
  const { pathname } = router;

  const [active, setActive] = useState(0);

  const links = mockdata.map((link, index) => (
    <Link href={link.path}>
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
        <img src={LogoSollaris.src} alt="Logo do Sollaris" />
      </Center>
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          {/* <Avatar className={styles.buttonCart__avatar} /> */}
          <NavbarLink
            icon={IconLogout}
            label="Sair"
            onClick={() => alert('Saindo!')}
          />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}