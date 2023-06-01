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
  SimpleGrid,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import 'dayjs/locale/ru';
import { IconEdit } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { validates } from 'util/validations';
import masks from 'util/fieldMasks';
import { useState } from 'react';

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

  const [name, setName] = useState('');

  const form = useForm({
    initialValues: { name: '', phone: '', cpf: '', birthDate: '', genre: '', interests: '' },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) =>
        (validates.name(value) ? null : 'O nome deve conter no mínimo 6 letras.'),
      phone: (value) =>
        value.length < 14 ? null : 'O número de telefone deve ter ao menos 12 dígitos.'
    
      },
  });

  const [formFields, setFormFields] = useState({
    name: masks.letters('João'),
    phone: masks.phone('(11) 91234-5678'),
    email: 'example@example.com',
    cpf: masks.cpf('33546058046'),
    genre: 'Masculino',
    interests: ['react', 'ng']
    // cpf: masks.cpf()
    // Outros campos do formulário e valores iniciais
  });

  const handleFieldChange = (fieldName: string) => (event: any) => {
    const inputValue = event.target.value;
    let maskedValue: any;

    // Aplica a função de máscara correspondente ao campo
    switch (fieldName) {
      case 'name':
        maskedValue = masks.letters(inputValue);
        break;
      case 'phone':
        maskedValue = masks.phone(inputValue);
        break;
      case 'email':
        maskedValue = inputValue;
        break;
      case 'cpf':
        maskedValue = masks.cpf(inputValue);
        break;
      // case 'genre':
      //   maskedValue = inputValue;
      //   break;
      case 'interests':
        maskedValue = inputValue;
        break;
      default:
        // Tratar outras condições ou valores padrão
        break;
    }
    // Adicione mais blocos else if para outros campos e funções de máscara

    setFormFields((prevFields) => ({
      ...prevFields,
      [fieldName]: maskedValue,
    }));
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
        value={formFields.name}
        onChange={handleFieldChange('name')}
      />
      <SimpleGrid cols={2}
        breakpoints={[
          { maxWidth: '500', cols: 1, verticalSpacing: "0" },
        ]}>
        <TextInput
          label="Telefone"
          placeholder="Telefone"
          {...inputProps}
          {...form.getInputProps('phone')}
          value={formFields.phone}
          onChange={handleFieldChange('phone')}
        />
        <TextInput
          label="CPF"
          placeholder="CPF"
          {...inputProps}
          {...form.getInputProps('cpf')}
          value={formFields.cpf}
          onChange={handleFieldChange('cpf')}
        />
      </SimpleGrid>
      <SimpleGrid cols={2}
        breakpoints={[
          { maxWidth: '500', cols: 1, verticalSpacing: "0" },
        ]}>
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
          value={formFields.genre}
          onChange={handleFieldChange('genre')}

        />
      </SimpleGrid>
      <MultiSelect
        data={data}
        label="Lista de interesses"
        placeholder="Pick all that you like"
        {...inputProps}
        {...form.getInputProps('interests')}
        value={formFields.interests}
        onChange={handleFieldChange('interests')}
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
