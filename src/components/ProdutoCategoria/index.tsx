// import { Avatar } from '@mui/material';
import { Avatar, Tooltip } from '@mantine/core';
import styles from './ProdutoCategoria.module.scss';

const brandsLogo = [
  {
    name: 'Nike',
    url: '',
  },
  {
    name: 'Nike',
    url: '',
  },
  {
    name: 'Nike',
    url: '',
  },
  {
    name: 'Nike',
    url: '',
  },
];

const ProdutoCategoria = () => {
  return (
    <div
      className={styles.category}
      onClick={() =>
        alert('Ir para a página de busca com o filtro da categoria carregado')
      }
    >
      <Tooltip.Group openDelay={300} closeDelay={100}>
        <Avatar.Group spacing="sm" mr="xs">
          <Tooltip label="Salazar Troop" withArrow>
            <Avatar
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
              radius="xl"
            />
          </Tooltip>
          <Tooltip label="Jane Rata" withArrow>
            <Avatar src="https://github.com/alexandresouva.png" radius="xl" />
          </Tooltip>
          <Tooltip
            withArrow
            label={
              <>
                <div>John Outcast</div>
                <div>Levi Capitan</div>
              </>
            }
          >
            {/* Incluir lógica de subcategorias */}
            <Avatar radius="xl">+2</Avatar>
          </Tooltip>
        </Avatar.Group>
      </Tooltip.Group>
      {/* <span className={styles.avatars}>
        <Avatar alt="Remy Sharp" src="" sx={{ width: 24, height: 24 }} />
        <Avatar alt="Remy Sharp" src="" sx={{ width: 24, height: 24 }} />
        <Avatar alt="Remy Sharp" src="" sx={{ width: 24, height: 24 }} />
        <Avatar alt="Remy Sharp" src="" sx={{ width: 24, height: 24 }} />
      </span> */}
      <p className={styles.text}>Treino e Academia</p>
    </div>
  );
};

export default ProdutoCategoria;

// function Demo() {
//   return (

//   );
// }
