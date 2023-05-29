import styles from './PersonalData.module.scss';
import {
  Avatar,
  Button,
  Center,
  MultiSelect,
  NumberInput,
  Select,
  TextInput,
  Modal,
  Group,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import 'dayjs/locale/ru';
import { IconEdit } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

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
  { value: 'male', label: 'Masculino' },
  { value: 'ng', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'vue', label: 'Vue' },
];

const PersonalData = ({ inputProps }: PersonalDataProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: { name: '', email: '', age: 0 },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) =>
        value.length < 2 ? 'Name must have at least 2 letters' : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      age: (value) =>
        value < 18 ? 'You must be at least 18 to register' : null,
    },
  });

  return (
    <form onSubmit={form.onSubmit(console.log)}>
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
        value={'João'}
      />
      <TextInput
        label="Telefone"
        placeholder="Telefone"
        {...inputProps}
        {...form.getInputProps('phone')}
        value={'11952553102'}
      />
      <TextInput
        label="CPF"
        placeholder="CPF"
        {...inputProps}
        {...form.getInputProps('cpf')}
        value={'18656306081'}
      />
      <DateInput
        label="Data de Nascimento"
        placeholder="Data de nascimento"
        {...inputProps}
        valueFormat="DD/MM/YYYY"
        {...form.getInputProps('birthDate')}
        locale={'pt-BR'}
        value={new Date(1999, 6, 1)}
      />
      <Select
        label="Gênero"
        placeholder="Escolha uma opção"
        data={genresData}
        {...inputProps}
        {...form.getInputProps('genre')}
        value={'male'}
      />
      <MultiSelect
        data={data}
        label="Lista de interesses"
        placeholder="Pick all that you like"
        {...inputProps}
        {...form.getInputProps('interests')}
        value={['react', 'ng']}
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
