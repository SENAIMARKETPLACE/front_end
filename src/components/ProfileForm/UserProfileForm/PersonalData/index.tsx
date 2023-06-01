import styles from './PersonalData.module.scss';
import {
  Avatar,
  Button,
  Center,
  MultiSelect,
  Select,
  TextInput,
  Modal,
  SimpleGrid,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import 'dayjs/locale/ru';
import { IconEdit } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { validates } from 'util/validations';
import masks from 'util/fieldMasks';

interface PersonalDataProps {
  inputProps: object;
}

// Simulando lista de interesses
const data = [
  { value: 'react', label: 'React' },
  { value: 'ng', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'vue', label: 'Vue' },
  { value: 'riot', label: 'Riot' },
  { value: 'next', label: 'Next.js' },
  { value: 'blitz', label: 'Blitz.js' },
];

const genresData = [
  { value: 'Masculino', label: 'Masculino' },
  { value: 'ng', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'vue', label: 'Vue' },
];

const PersonalData = ({ inputProps }: PersonalDataProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      name: 'João Abreu',
      email: 'sollaris@gmail.com',
      phone: `${masks.phone('11111111111')}`,
      cpf: `${masks.cpf('52543043080')}`,
      birthDate: new Date(1999, 6, 1),
      genre: 'Masculino',
      interests: ['react', 'ng'],
    },

    // Funções que serão usadas para validar os valores nos respectivos campos
    validate: {
      name: (value) =>
        validates.name(value) ? null : 'O nome deve ter ao menos 6 letras.',
      email: (value) => (validates.email(value) ? null : 'E-mail inválido.'),
      phone: (value) =>
        value.length >= 14 ? null : 'O telefone deve conter DDD e 9 dígitos.',
      cpf: (value) => {
        const errors: Array<string> = [];

        value.length === 14
          ? null
          : errors.push('O CPF informado deve ter 11 dígitos.');

        validates.cpf(value) ? null : errors.push('CPF inválido.');

        return errors.length > 0 ? errors[0] : null;
      },
      interests: (value) =>
        value.length > 0 ? null : 'Você deve selecionar ao menos uma opção',
    },
  });

  const handleInputChange =
    (fieldName: string, maskFunction?: Function) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      const maskedValue = maskFunction ? maskFunction(inputValue) : inputValue;
      form.setFieldValue(fieldName, maskedValue);
    };

  return (
    <form onSubmit={form.onSubmit(console.log)} className={styles.form}>
      <Center maw={400} h={100} mx="auto">
        <Avatar.Group spacing="sm">
          <Avatar
            src="https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt96a5fcd6c6f93d80/60dc5e4215da443b102fbe95/50670def60e2e315c689f6cd589d2f2ac8a42f5a.jpg?auto=webp&format=pjpg&width=3840&quality=60"
            size={100}
            radius={'50%'}
            mb={20}
          />
          <Avatar
            color="dark"
            radius="xl"
            size={32}
            mt={70}
            right={16}
            style={{ cursor: 'pointer' }}
          >
            <Modal opened={opened} onClose={close} title="Pré-visualização">
              <Center maw={400} h={100} mx="auto">
                <Avatar
                  src="https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt96a5fcd6c6f93d80/60dc5e4215da443b102fbe95/50670def60e2e315c689f6cd589d2f2ac8a42f5a.jpg?auto=webp&format=pjpg&width=3840&quality=60"
                  size={100}
                  radius={'50%'}
                  mb={20}
                  mt={20}
                />
              </Center>
              <TextInput
                data-autofocus
                label="Insira a URL da imagem"
                placeholder="URL"
                mt="md"
                value={
                  'https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt96a5fcd6c6f93d80/60dc5e4215da443b102fbe95/50670def60e2e315c689f6cd589d2f2ac8a42f5a.jpg?auto=webp&format=pjpg&width=3840&quality=60'
                }
              />
              <Center mx="auto" mt={'xl'}>
                <Button onClick={close} radius={'xl'}>
                  Salvar
                </Button>
              </Center>
            </Modal>

            <IconEdit onClick={open} />
          </Avatar>
        </Avatar.Group>
      </Center>
      <TextInput
        label="Nome"
        placeholder="Nome"
        {...inputProps}
        {...form.getInputProps('name')}
        onChange={handleInputChange('name', masks.letters)}
      />
      <TextInput
        label="E-mail"
        placeholder="E-mail"
        {...inputProps}
        {...form.getInputProps('email')}
        onChange={handleInputChange('email')}
      />
      <SimpleGrid
        cols={2}
        breakpoints={[{ maxWidth: '500', cols: 1, verticalSpacing: '0' }]}
      >
        <TextInput
          label="Telefone"
          placeholder="Telefone"
          {...inputProps}
          {...form.getInputProps('phone')}
          onChange={handleInputChange('phone', masks.phone)}
        />
        <TextInput
          label="CPF"
          placeholder="CPF"
          {...inputProps}
          {...form.getInputProps('cpf')}
          onChange={handleInputChange('cpf', masks.cpf)}
        />
      </SimpleGrid>
      <SimpleGrid
        cols={2}
        breakpoints={[{ maxWidth: '500', cols: 1, verticalSpacing: '0' }]}
      >
        <DateInput
          label="Data de Nascimento"
          placeholder="Data de nascimento"
          {...inputProps}
          valueFormat="DD/MM/YYYY"
          {...form.getInputProps('birthDate')}
        />
        <Select
          label="Gênero"
          placeholder="Escolha uma opção"
          data={genresData}
          {...inputProps}
          {...form.getInputProps('genre')}
        />
      </SimpleGrid>
      <MultiSelect
        data={data}
        label="Lista de interesses"
        placeholder="Escolha suas categorias de interesse."
        {...inputProps}
        {...form.getInputProps('interests')}
      />
      <Center>
        <Button type="submit" mt="xl" radius="xl">
          Salvar
        </Button>
      </Center>
    </form>
  );
};

export default PersonalData;
