import styles from './FinalizarCompra.module.scss';
import { useRef, useState } from 'react';
import {
  Stepper,
  Button,
  Group,
  TextInput,
  Code,
  Table,
  ActionIcon,
  NumberInput,
  NumberInputHandlers,
  rem,
  Radio,
  Checkbox,
  AspectRatio,
  Image,
  Overlay,
  Tabs,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  IconShoppingCart,
  IconPhoto,
  IconMessageCircle,
  IconSettings,
} from '@tabler/icons-react';
import { RiDeleteBinLine } from 'react-icons/ri';
import Link from 'next/link';
import Cart from 'components/orderFormStepper/Cart';

export default function FinalizarCompra() {
  const [active, setActive] = useState(0);
  const [value, setValue] = useState<number | ''>(0);
  const handlers = useRef<NumberInputHandlers>();

  const form = useForm({
    initialValues: {
      username: '',
    },
  });

  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <section className={styles.main}>
      <Stepper active={active} breakpoint="sm">
        <Stepper.Step
          icon={<IconShoppingCart size="1.1rem" />}
          label="Carrinho"
          mr="xl"
        >
          <Cart />
          <Group position="right" mt="xl">
            <Button onClick={nextStep} radius="xl">
              Continuar
            </Button>
          </Group>
        </Stepper.Step>

        <Stepper.Step label="Identificação" mr="xl">
          <div className={styles.step1}>
            <AspectRatio>
              <section className={styles.products}>
                <Table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Produtos</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className={styles.td__img}>
                        <img
                          src="https://m.media-amazon.com/images/I/412BRS3YzZL._AC_SY500_.jpg"
                          alt="Random image"
                        />
                      </td>
                      <td>
                        <p>Camiseta Nike Preta</p>
                        <p>
                          Cor: <span>Preta</span>
                        </p>
                        <p>
                          Tamanho: <span>M</span>
                        </p>
                        <p>
                          Quantidade: <span>1</span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className={styles.td__img}>
                        <img
                          src="https://cdn.awsli.com.br/800x800/157/157421/produto/43753862/2ab068446a.jpg"
                          alt="Random image"
                        />
                      </td>
                      <td>
                        <p>Kit Whey, BCAA e Creatina Integral Médica</p>
                        <p>
                          Cor: <span>Preta</span>
                        </p>
                        <p>
                          Tamanho: <span>M</span>
                        </p>
                        <p>
                          Quantidade: <span>1</span>
                        </p>
                      </td>
                    </tr>
                    <tr className={styles.tr__price}>
                      <td className={styles.td__price}>Total:</td>
                      <td className={styles.td__price__value}>
                        R$ <span>5000,98</span>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </section>
              {<Overlay color="#ffffff" opacity={0.15} />}
            </AspectRatio>

            <section className={styles.identification}>
              <h2 className={styles.identification__title}>Identificação</h2>

              <div className={styles.profile}>
                <p className={styles.identification__description}>Dados</p>

                <div className={styles.profile__item}>
                  <label>Nome</label>
                  <p>João Abreu</p>
                </div>

                <div className={styles.profile__item}>
                  <label>CPF</label>
                  <p>359******42</p>
                </div>

                <div className={styles.profile__item}>
                  <label>E-mail</label>
                  <p>joão.hazard@gmail.com</p>
                </div>
              </div>

              <div className={styles.adress}>
                <p className={styles.identification__description}>
                  Endereço de entrega
                </p>
                <Radio
                  label="RUA ABILIO MARIA 1090 - JARDIM PAULA - SÃO PAULO"
                  checked={true}
                  size="sm"
                />

                <Button variant="subtle" color="gray" radius="xl">
                  <Link href="/" style={{ color: 'gray' }}>
                    Editar endereço
                  </Link>
                </Button>
              </div>

              <div className={styles.delivery}>
                <p className={styles.identification__description}>
                  Escolha o tipo de entrega
                </p>

                <Radio.Group name="frete" withAsterisk>
                  <Group mt="xs">
                    <Radio
                      value="normal"
                      label="Normal - 7 dias úteis (Frete Grátis)"
                    />
                    <Radio
                      value="express"
                      label="Express - 4 dias úteis (Frete Grátis)"
                    />
                  </Group>
                </Radio.Group>
              </div>
              <Group position="center" mt="xl">
                <Button variant="default" onClick={prevStep} radius="xl">
                  Voltar
                </Button>
                <Button onClick={nextStep} radius="xl">
                  Continuar
                </Button>
              </Group>
            </section>

            <AspectRatio>
              <section className={styles.payment}>
                <p className={styles.identification__description}>
                  Escolha o método
                </p>

                <Tabs
                  color="gray"
                  variant="outline"
                  defaultValue="gallery"
                  mt="md"
                  mb="lg"
                >
                  <Tabs.List>
                    <Tabs.Tab
                      value="credito"
                      icon={<IconPhoto size="0.8rem" />}
                    >
                      Crédito
                    </Tabs.Tab>
                    <Tabs.Tab
                      value="pix"
                      icon={<IconMessageCircle size="0.8rem" />}
                    >
                      Pix
                    </Tabs.Tab>
                    <Tabs.Tab
                      value="boleto"
                      icon={<IconSettings size="0.8rem" />}
                    >
                      Boleto
                    </Tabs.Tab>
                  </Tabs.List>

                  <Tabs.Panel value="credito" pt="xs">
                    Falta inserir inputs do crédito
                  </Tabs.Panel>

                  <Tabs.Panel value="pix" pt="xs">
                    Falta inserir inputs do pix
                  </Tabs.Panel>

                  <Tabs.Panel value="boleto" pt="xs">
                    Falta inserir inputs do boleto
                  </Tabs.Panel>
                </Tabs>
                {/* <Tabs defaultValue="gallery" orientation="horizontal" mb="xl">
                  <Tabs.List className={styles.payment__types}>
                    <Tabs.Tab value="gallery">Cartão de Crédito</Tabs.Tab>
                    <Tabs.Tab value="messages">Pix</Tabs.Tab>
                    <Tabs.Tab value="settings">Boleto Bancário</Tabs.Tab>
                  </Tabs.List>

                  <Tabs.Panel value="gallery">Gallery tab content</Tabs.Panel>
                  <Tabs.Panel value="messages">Messages tab content</Tabs.Panel>
                  <Tabs.Panel value="settings">Settings tab content</Tabs.Panel>
                </Tabs> */}

                <Checkbox
                  label="Aceito a Política de Trocas e Devoluções"
                  className={styles.terms}
                />
                <h4>Resumo</h4>
                <ul className={styles.payment__resumeList}>
                  <li>
                    Valor dos produtos <span>RS {'1479,55'}</span>
                  </li>
                  <li>
                    Frete: <span>Grátis</span>
                  </li>
                  <li>
                    Desconto: <span>R$ {'0,00'}</span>
                  </li>
                  <li>
                    Total: <span>R$ {'1479,55'}</span>
                  </li>
                </ul>
              </section>
              {<Overlay color="#ffffff" opacity={0.75} />}
            </AspectRatio>
          </div>
        </Stepper.Step>

        <Stepper.Step label="Pagamento">
          <div className={styles.step}>
            <section className={styles.identification}>
              <Checkbox label="Aceito a Política de Trocas e Devoluções" />
            </section>
          </div>
          <Group position="apart">
            <Button variant="default" onClick={prevStep} radius="xl">
              Voltar
            </Button>
            <Button onClick={nextStep} radius="xl">
              Finalizar Compra
            </Button>
          </Group>
        </Stepper.Step>
        <Stepper.Completed>
          Compra realizada! Talvez adicionar um efeito loading...
        </Stepper.Completed>
      </Stepper>
    </section>
  );
}
