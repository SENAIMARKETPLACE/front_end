import styles from "./PersonalData.module.scss";
import {
  Avatar,
  Button,
  Center,
  MultiSelect,
  Select,
  TextInput,
  Modal,
  SimpleGrid,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import "dayjs/locale/ru";
import { useDisclosure } from "@mantine/hooks";
import { validates } from "util/validations";
import masks from "util/fieldMasks";
import ModalPhotoProfile from "components/Modais/ModalPhotoProfile";
import { useState } from "react";
import { IResponseLoginUser } from "compartilhado/IReponseLoginUser";

import { IPersonalData } from "compartilhado/AlteracoesPerfilUser/IPersonalData";
import { httpUsuario } from "../../../../http";
import { useRouter } from "next/router";

interface PersonalDataProps {
  inputProps: object;
  userConnect: IResponseLoginUser;
}

// Simulando lista de interesses
const data = [
  { value: "1", label: "Roupas" },
  { value: "2", label: "Calçados" },
  { value: "3", label: "Suplementos" },
  { value: "4", label: "Esportes" },
  { value: "5", label: "Acessórios" },
];

// Simulando gêneros
const genresData = [
  { value: "MASCULINO", label: "Masculino" },
  { value: "FEMININO", label: "Feminino" },
  { value: "NAO_INFORMADO", label: "Não Informar" },
];

interface PersonalData {}

const PersonalData = ({ inputProps, userConnect }: PersonalDataProps) => {
  // A URL de perfil deve vir no State abaixo
  const [profilePhoto, setProfilePhoto] = useState(userConnect.img);

  const router = useRouter();
  const updateProfilePhoto = (url: string) => {
    setProfilePhoto(url);
  };

  const gruposDeInteresse = userConnect.gruposDeInteresse;
  // Simulando lista de interesses
 
    const data = [
      { value: '1', label: 'Roupas', selected: gruposDeInteresse.includes('1') },
      { value: '2', label: 'Calçados', selected: gruposDeInteresse.includes('2') },
      { value: '3', label: 'Suplementos', selected: gruposDeInteresse.includes('3') },
      { value: '4', label: 'Esportes', selected: gruposDeInteresse.includes('4') },
      { value: '5', label: 'Acessórios', selected: gruposDeInteresse.includes('5') }
    ];

  const form = useForm({
    // Valores que serão substituídos pelo GET. Mantenha as máscaras.
    initialValues: {
      name: userConnect.nome,
      email: userConnect.email,
      phone: `${masks.phone("11111111111")}`,
      cpf: `${masks.cpf(userConnect.cpf)}`,
      birthDate: new Date(userConnect.data_nascimento),
      genre: userConnect.genero,
      interests: userConnect.gruposDeInteresse,
    },

    // Validações dos campos
    validate: {
      name: (value) =>
        validates.name(value) ? null : "O nome deve ter ao menos 6 letras.",
      email: (value) => (validates.email(value) ? null : "E-mail inválido."),
      phone: (value) =>
        value.length >= 14 ? null : "O telefone deve conter DDD e 9 dígitos.",
      cpf: (value) => {
        const errors: Array<string> = [];

        value.length === 14
          ? null
          : errors.push("O CPF informado deve ter 11 dígitos.");

        validates.cpf(value) ? null : errors.push("CPF inválido.");

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
          : "Você deve ter no mínimo 16 anos de idade.";
      },
      interests: (value) =>
        value.length > 0 ? null : "Você deve selecionar ao menos uma opção",
    },
  });

  const converterParaDataLocal = (dataInformada: string): string => {
    let data = new Date(dataInformada);

    // data local
    return data.toLocaleDateString();
  };


  const alterarDados = () => {
    const novosDadosPessoais: IPersonalData = {
      usuario_id: userConnect.id, 
      nome: form.values.name, 
      email: form.values.email, 
      cpf: form.values.cpf, 
      genero: form.values.genre, 
      data_nascimento: form.values.birthDate.toLocaleDateString('pt-BR', { year: '2-digit', month: '2-digit', day: '2-digit' }),   
      grupo_de_interesses: form.values.interests,
      img: profilePhoto
      
    }
    // httpUsuario.put(`endpoint/${userConnect.id}`, novosDadosPessoais)
    // .then(() => alert("Informações Pessoais Salvas!"))
    // .catch((erro) => alert("deu ruim"))


    // AO TESTAR AMANHÃ, NO PRIMEIRO THEN ATUALIZAR NO LOCALSTORAGE
    const novosDadosLocalStorage:IResponseLoginUser = JSON.parse(localStorage.getItem('userLoginResponse'));

    novosDadosLocalStorage.nome = novosDadosPessoais.nome, 
    novosDadosLocalStorage.email = novosDadosPessoais.email,
    novosDadosLocalStorage.cpf = novosDadosPessoais.cpf,
    novosDadosLocalStorage.genero = novosDadosPessoais.genero, 
    novosDadosLocalStorage.gruposDeInteresse = novosDadosPessoais.grupo_de_interesses
    novosDadosLocalStorage.img = novosDadosPessoais.img
    novosDadosLocalStorage.data_nascimento = novosDadosPessoais.data_nascimento


    localStorage.setItem('userLoginResponse', JSON.stringify(novosDadosLocalStorage));

    router.reload();
  }

  // Função genérica que atualiza valor do Input que o chama, substituindo useState.
  const handleInputChange = (fieldName: string, maskFunction?: Function) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    const maskedValue = maskFunction ? maskFunction(inputValue) : inputValue;
    form.setFieldValue(fieldName, maskedValue);
  };

  return (
    <section>
      <Center maw={400} h={100} mx="auto" mt={"xs"}>
        <Avatar.Group spacing="sm">
          <Avatar src={profilePhoto} size={100} radius={"50%"} mb={20} />
          <Avatar
            color="dark"
            radius="xl"
            size={32}
            mt={70}
            right={16}
            style={{ cursor: "pointer" }}
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
          {...form.getInputProps("name")}
          onChange={handleInputChange("name", masks.letters)}
        />
        <TextInput
          label="E-mail"
          placeholder="E-mail"
          {...inputProps}
          {...form.getInputProps("email")}
          onChange={handleInputChange("email")}
        />
        <SimpleGrid
          cols={2}
          breakpoints={[{ maxWidth: "500", cols: 1, verticalSpacing: "0" }]}
        >
          <TextInput
            label="Telefone"
            placeholder="Telefone"
            {...inputProps}
            {...form.getInputProps("phone")}
            onChange={handleInputChange("phone", masks.phone)}
          />
          <TextInput
            label="CPF"
            placeholder="CPF"
            {...inputProps}
            {...form.getInputProps("cpf")}
            onChange={handleInputChange("cpf", masks.cpf)}
          />
        </SimpleGrid>
        <SimpleGrid
          cols={2}
          breakpoints={[{ maxWidth: "500", cols: 1, verticalSpacing: "0" }]}
        >
          <DateInput
            label="Data de Nascimento"
            placeholder="Data de nascimento"
            {...inputProps}
            valueFormat="DD/MM/YYYY"
            {...form.getInputProps("birthDate")}
          />
          <Select
            label="Gênero"
            placeholder="Escolha uma opção"
            data={genresData}
            {...inputProps}
            {...form.getInputProps("genre")}
          />
        </SimpleGrid>
        <MultiSelect
          data={data}
          label="Lista de interesses"
          placeholder="Escolha suas categorias de interesse."
          {...inputProps}
          {...form.getInputProps("interests")}
        />
        <Center>
          <Button type="submit" mt="xl" radius="xl" onClick={alterarDados}>
            Salvar
          </Button>
        </Center>
      </form>
    </section>
  );
};

export default PersonalData;
