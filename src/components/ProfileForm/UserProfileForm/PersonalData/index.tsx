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
import { useDisclosure } from '@mantine/hooks';
import { validates } from 'util/validations';
import masks from 'util/fieldMasks';
import ModalPhotoProfile from 'components/Modais/ModalPhotoProfile';
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

// Simulando gêneros
const genresData = [
  { value: 'Masculino', label: 'Masculino' },
  { value: 'ng', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'vue', label: 'Vue' },
];

const PersonalData = ({ inputProps }: PersonalDataProps) => {
  // A URL de perfil deve vir no State abaixo
  const [profilePhoto, setProfilePhoto] = useState(
    'https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt96a5fcd6c6f93d80/60dc5e4215da443b102fbe95/50670def60e2e315c689f6cd589d2f2ac8a42f5a.jpg'
  );

  const updateProfilePhoto = (url: string) => {
    setProfilePhoto(url);
  };

  const form = useForm({
    // Valores que serão substituídos pelo GET. Mantenha as máscaras.
    initialValues: {
      name: 'João Abreu',
      email: 'sollaris@gmail.com',
      phone: `${masks.phone('11111111111')}`,
      cpf: `${masks.cpf('52543043080')}`,
      birthDate: new Date(1999, 6, 1),
      genre: 'Masculino',
      interests: ['react', 'ng'],
    },

    // Validações dos campos
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
      birthDate: (value) => {
        const dateOfBirth = new Date(value);
        const currentDate = new Date();

        let yearsDiff =
          currentDate.getUTCFullYear() - dateOfBirth.getUTCFullYear();
        const monthsDiff =
          currentDate.getUTCMonth() - dateOfBirth.getUTCMonth();
        const daysDiff = currentDate.getUTCDate() - dateOfBirth.getUTCDate();

        if (monthsDiff < 0 || daysDiff < 0) yearsDiff--;

        return yearsDiff >= 16
          ? null
          : 'Você deve ter no mínimo 16 anos de idade.';
      },
      interests: (value) =>
        value.length > 0 ? null : 'Você deve selecionar ao menos uma opção',
    },
  });

  // Função genérica que atualiza valor do Input que o chama, substituindo useState.
  const handleInputChange =
    (fieldName: string, maskFunction?: Function) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      const maskedValue = maskFunction ? maskFunction(inputValue) : inputValue;
      form.setFieldValue(fieldName, maskedValue);
    };

  return (
    <section>
      <Center maw={400} h={100} mx="auto" mt={'xs'}>
        <Avatar.Group spacing="sm">
          <Avatar src={profilePhoto} size={100} radius={'50%'} mb={20} />
          <Avatar
            color="dark"
            radius="xl"
            size={32}
            mt={70}
            right={16}
            style={{ cursor: 'pointer' }}
          >
            <ModalPhotoProfile
              inputProps={inputProps}
              currentPhoto={profilePhoto}
              updateProfilePhoto={setProfilePhoto}
            />
          </Avatar>
        </Avatar.Group>
      </Center>
      <form onSubmit={form.onSubmit(console.log)} className={styles.form}>
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
    </section>
  );
};

export default PersonalData;
