import { IconBuildingStore, IconTag } from '@tabler/icons-react';
import styles from './DrawerCompanyLinks.module.scss';
import { Burger, Center, Drawer } from '@mantine/core';
import MiniSearchBar from 'components/MiniSearchBar';
import Link from 'next/link';
import LogoSollaris from '../../../public/images/Logo.svg';
import { useDisclosure } from '@mantine/hooks';
import SearchBar from 'components/SearchBar';

export function DrawerCompanyLinks() {
  const [opened, { open, close }] = useDisclosure(false);

  const [openedBurguer, { toggle }] = useDisclosure(false);
  const label = opened ? 'Close navigation' : 'Open navigation';

  const mockdata = [
    { icon: IconTag, label: 'Meus Produtos', path: '/empresa/produtos' },
    {
      icon: IconBuildingStore,
      label: 'Minha Loja',
      path: '/empresa/minha-loja',
    },
  ];

  return (
    <>
      <Drawer
        size="320px"
        opened={opened}
        onClose={close}
        className={styles.drawer}
      >
        <Center>
          <Link href={'/marketplace'}>
            <img src={LogoSollaris.src} alt="Logo do Sollaris" />
          </Link>
        </Center>

        <ul className={styles.drawer__list}>
          {mockdata.map((link) => (
            <Link href={link.path} key={link.label}>
              <li key={link.label}>{link.label}</li>
            </Link>
          ))}
        </ul>
      </Drawer>

      <Burger
        opened={opened}
        onClick={open}
        aria-label={label}
        size={'md'}
        color="#5f78e7"
      />
    </>
  );
}
