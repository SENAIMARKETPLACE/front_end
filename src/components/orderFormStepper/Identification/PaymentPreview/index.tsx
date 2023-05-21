import {
  AspectRatio,
  Checkbox,
  Overlay,
  Select,
  Tabs,
  TextInput,
  CopyButton,
  ActionIcon,
  Tooltip,
  Group,
  Image,
  Text,
  Button,
} from '@mantine/core';
import styles from './PaymentPreview.module.scss';
import {
  IconCreditCard,
  IconQrcode,
  IconScan,
  IconCopy,
  IconCheck,
} from '@tabler/icons-react';

function Demo() {
  return (
    <CopyButton value="DDPAK102M4S0M1DMIAJSKM121" timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
          <ActionIcon mt={'md'} color={copied ? 'teal' : 'gray'} onClick={copy}>
            {copied ? <IconCheck size="1rem" /> : <IconCopy size="1rem" />}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  );
}

interface props {
  prevStep: any;
  nextStep: any;
  overlay: boolean;
}

const PaymentPreview = ({ prevStep, nextStep, overlay }: props) => {
  return (
    <>
      <AspectRatio
        ratio={720 / 1080}
        className={`${styles.radio} ${!overlay && styles.overlay}`}
      >
        <section className={styles.payment}>
          <h4 className={styles.payment__label}>Método de Pagamento</h4>

          <Tabs
            color="gray"
            variant="outline"
            defaultValue="gallery"
            mt="md"
            mb="lg"
          >
            <Tabs.List>
              <Tabs.Tab value="credito" icon={<IconCreditCard size="0.8rem" />}>
                Crédito
              </Tabs.Tab>
              <Tabs.Tab value="pix" icon={<IconQrcode size="0.8rem" />}>
                Pix
              </Tabs.Tab>
              <Tabs.Tab value="boleto" icon={<IconScan size="0.8rem" />}>
                Boleto
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="credito" pt="xs">
              <TextInput
                label="Dados do cartão"
                placeholder="Número do cartão"
                radius="xl"
              />
              <TextInput placeholder="Nome do titular" mt="xs" radius="xl" />
              <TextInput
                label="Validade"
                placeholder="MM/AA"
                mt="sm"
                radius="xl"
              />
              <TextInput
                label="Código de segurança"
                placeholder="CVV"
                mt="sm"
                radius="xl"
              />
              <Select
                label="Número de parcelas"
                placeholder="Parcelamento"
                mt="sm"
                radius="xl"
                data={[
                  { value: '2', label: '2x sem juros' },
                  { value: '3', label: '3x sem juros' },
                  { value: '4', label: '4x sem juros' },
                  { value: '5', label: '5x sem juros' },
                ]}
              />
            </Tabs.Panel>

            <Tabs.Panel value="pix" pt="xs">
              <Group>
                <TextInput
                  label="Chave PIX"
                  value={'DDPAK102M4S0M1DMIAJSKM121'}
                  placeholder="Número do cartão"
                  radius="xl"
                  readOnly
                />
                <Demo />
              </Group>
              <Text mt="sm">Ou se preferir: </Text>
              <Image
                src="https://www.qrcode-monkey.com/img/default-preview-qr.svg"
                maw={120}
                mx="auto"
                mt="xs"
              />
            </Tabs.Panel>

            <Tabs.Panel value="boleto" pt="xs">
              <Group>
                <TextInput
                  label="Código de Barras:"
                  value={'7891234567890'}
                  placeholder="Número do cartão"
                  radius="xl"
                  readOnly
                />
                <Demo />
              </Group>
              <Text mt="sm">Ou se preferir: </Text>
              <Image
                src="https://www.qrcode-monkey.com/img/default-preview-qr.svg"
                maw={120}
                mx="auto"
                mt="xs"
              />
            </Tabs.Panel>
          </Tabs>

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
          <Group position="apart" mt={'xl'}>
            <Button variant="default" onClick={prevStep} radius="xl">
              Voltar
            </Button>
            <Button onClick={nextStep} radius="xl">
              Finalizar Compra
            </Button>
          </Group>
        </section>

        {overlay && <Overlay color="#ffffff" opacity={0.75} />}
      </AspectRatio>
    </>
  );
};

export default PaymentPreview;
