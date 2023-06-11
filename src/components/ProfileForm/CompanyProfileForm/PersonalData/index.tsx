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
  Text,
  Image,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import 'dayjs/locale/ru';
import { useDisclosure } from '@mantine/hooks';
import { validates } from 'util/validations';
import masks from 'util/fieldMasks';
import ModalPhotoProfile from 'components/Modais/ModalPhotoProfile';
import { useState } from 'react';
import ModalCoverProfile from 'components/Modais/ModalCoverProfile';

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
  const [profileCover, setProfileCover] = useState(
    'https://media.discordapp.net/attachments/924735264574816318/1117158403282837606/banner02.jpg'
  );

  const updateProfilePhoto = (url: string) => {
    setProfileCover(url);
  };

  const form = useForm({
    // Valores que serão substituídos pelo GET. Mantenha as máscaras.
    initialValues: {
      corporateName: 'Sollaris LTDA',
      fantasyName: 'Sollaris',
      owner: 'João Abreu',
      email: 'sollaris@gmail.com',
      phone: `${masks.phone('11111111111')}`,
      cnpj: `${masks.cnpj('14298354000179')}`,
    },

    // Validações dos campos
    validate: {
      corporateName: (value) =>
        value.length >= 4 ? null : 'A razão social deve ter ao menos 4 letras.',
      fantasyName: (value) =>
        value.length >= 4
          ? null
          : 'O nome fantasia deve ter ao menos 4 letras.',
      owner: (value) =>
        validates.name(value) ? null : 'O nome deve ter ao menos 6 letras.',
      email: (value) => (validates.email(value) ? null : 'E-mail inválido.'),
      phone: (value) =>
        value.length >= 14 ? null : 'O telefone deve conter DDD e 9 dígitos.',
      cnpj: (value) => {
        const errors: Array<string> = [];

        value.length === 18
          ? null
          : errors.push('O CNPJ informado deve ter 14 dígitos.');

        validates.cnpj(value) ? null : errors.push('CNPJ inválido.');

        return errors.length > 0 ? errors[0] : null;
      },
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
      <div className={styles.coverEdit}>
        <Image
          width={300}
          height={150}
          fit="fill"
          src={profileCover}
          radius={'sm'}
        />
        <ModalCoverProfile
          inputProps={inputProps}
          currentPhoto={profileCover}
          updateProfilePhoto={setProfileCover}
        />
      </div>
      <form onSubmit={form.onSubmit(console.log)} className={styles.form}>
        <TextInput
          label="Razão Social"
          placeholder="Informe a Razão Social"
          {...inputProps}
          {...form.getInputProps('corporateName')}
          onChange={handleInputChange('corporateName')}
        />
        <TextInput
          label="Nome Fantasia"
          placeholder="Informe o Nome Fantasia"
          {...inputProps}
          {...form.getInputProps('fantasyName')}
          onChange={handleInputChange('fantasyName')}
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
            label="CNPJ"
            placeholder="CNPJ"
            {...inputProps}
            {...form.getInputProps('cnpj')}
            onChange={handleInputChange('cnpj', masks.cnpj)}
          />
        </SimpleGrid>
        <TextInput
          label="Nome do responsável"
          placeholder="Nome"
          {...inputProps}
          {...form.getInputProps('owner')}
          onChange={handleInputChange('owner', masks.letters)}
        />
        <TextInput
          label="E-mail"
          placeholder="E-mail"
          {...inputProps}
          {...form.getInputProps('email')}
          onChange={handleInputChange('email')}
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
