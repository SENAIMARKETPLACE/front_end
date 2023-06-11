import { Button, Center, SimpleGrid, TextInput } from '@mantine/core';
import styles from './AddressData.module.scss';
import { useForm } from '@mantine/form';
import axios from 'axios';
import masks from 'util/fieldMasks';
import { IResponseLoginUser } from 'compartilhado/IReponseLoginUser';
import { IAdressData } from 'compartilhado/AlteracoesPerfilUser/IAdressData';
import { useRouter } from 'next/router';

interface AddressDataProps {
  inputProps: object;
  userConnect: IResponseLoginUser
}

const AddressData = ({ inputProps, userConnect }: AddressDataProps) => {
  const form = useForm({
    initialValues: {
      cep: masks.cep(userConnect.enderecos[0].cep),
      address: userConnect.enderecos[0].logradouro,
      complement: userConnect.enderecos[0].complemento,
      number: userConnect.enderecos[0].numero,
      city: userConnect.enderecos[0].cidade,
      state: userConnect.enderecos[0].estado,
      neighborhood: userConnect.enderecos[0].bairro,
    },
  });

  const router = useRouter();
  const handleInputChange =
    (fieldName: string, maskFunction?: Function) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      const maskedValue = maskFunction ? maskFunction(inputValue) : inputValue;
      form.setFieldValue(fieldName, maskedValue);
    };

  async function consumeViaCepApi(cep: string) {
    const formattedCep = cep.replace(/[^0-9]/g, '');

    try {
      const response = await axios.get(
        `https://viacep.com.br/ws/${formattedCep}/json/`
      );

      form.setFieldValue('address', response.data.logradouro);
      form.setFieldValue('complement', response.data.complemento);
      form.setFieldValue('number', '');
      form.setFieldValue('city', response.data.localidade);
      form.setFieldValue('state', response.data.uf);
      form.setFieldValue('neighborhood', response.data.bairro);
    } catch (error) {
      if (form.values.cep.length < 9) {
        form.setFieldError('cep', 'O CEP informado deve conter 8 números.');
      } else {
        form.setFieldError('cep', 'CEP não encontrado.');
      }
    }
  }


  const alterarDados = () => {
    const novosDadosResidenciais: IAdressData = {
      usuario_id: userConnect.id, 
      endereco_id: "1",
      cep: form.values.cep, 
      logradouro: form.values.address, 
      numero: form.values.number, 
      estado: form.values.state, 
      bairro: form.values.neighborhood, 
      cidade: form.values.city, 
      complemento: form.values.complement
      // complemento: form.values.complement 
    }
    // httpUsuario.put(`endpoint/${userConnect.id}`, novosDadosResidenciais)
    // .then(() => alert("Informações do novo endereço Salvas!"))
    // .catch((erro) => alert("deu ruim"))


    // AO TESTAR AMANHÃ, NO PRIMEIRO THEN ATUALIZAR NO LOCALSTORAGE
    const novosDadosLocalStorage:IResponseLoginUser = JSON.parse(localStorage.getItem('userLoginResponse'));

    // novosDadosLocalStorage.nome = novosDadosPessoais.nome, 
    // novosDadosLocalStorage.email = novosDadosPessoais.email,
    // novosDadosLocalStorage.cpf = novosDadosPessoais.cpf,
    // novosDadosLocalStorage.genero = novosDadosPessoais.genero, 
    // novosDadosLocalStorage.gruposDeInteresse = novosDadosPessoais.grupo_de_interesses
    // novosDadosLocalStorage.img = novosDadosPessoais.img
    // novosDadosLocalStorage.data_nascimento = novosDadosPessoais.data_nascimento

    novosDadosLocalStorage.enderecos[0].cep = novosDadosResidenciais.cep, 
    novosDadosLocalStorage.enderecos[0].logradouro = novosDadosResidenciais.logradouro, 
    novosDadosLocalStorage.enderecos[0].numero = novosDadosResidenciais.numero, 
    novosDadosLocalStorage.enderecos[0].estado = novosDadosResidenciais.estado, 
    novosDadosLocalStorage.enderecos[0].cidade = novosDadosResidenciais.cidade
    novosDadosLocalStorage.enderecos[0].bairro = novosDadosResidenciais.bairro
    novosDadosLocalStorage.enderecos[0].complemento = novosDadosResidenciais.complemento
    

    localStorage.setItem('userLoginResponse', JSON.stringify(novosDadosLocalStorage));

    router.reload();
  }

  return (
    <>
      <form onSubmit={form.onSubmit(console.log)} className={styles.form}>
        <h3 className={styles.title}>Altere suas informações de endereço:</h3>
        <TextInput
          label="CEP"
          placeholder="XXXXX-XXX"
          {...inputProps}
          {...form.getInputProps('cep')}
          onChange={handleInputChange('cep', masks.cep)}
          onBlur={() => consumeViaCepApi(form.values.cep)}
        />
        <TextInput
          label="Logradouro"
          placeholder="Logradouro"
          {...inputProps}
          {...form.getInputProps('address')}
        />
        <TextInput
          label="Complemento"
          placeholder="Complemento"
          {...inputProps}
          {...form.getInputProps('complement')}
          required={false}
        />
        <SimpleGrid
          cols={2}
          breakpoints={[{ maxWidth: '500', cols: 1, verticalSpacing: '0' }]}
        >
          <TextInput
            label="Número"
            placeholder="Número"
            {...inputProps}
            {...form.getInputProps('number')}
          />
          <TextInput
            label="Estado"
            placeholder="Estado"
            {...inputProps}
            {...form.getInputProps('state')}
            readOnly
          />
        </SimpleGrid>
        <TextInput
          label="Cidade"
          placeholder="Cidade"
          {...inputProps}
          {...form.getInputProps('city')}
        />
        <TextInput
          label="Bairro"
          placeholder="Bairro"
          {...inputProps}
          {...form.getInputProps('neighborhood')}
        />
        <Center>
          <Button type="submit" mt="xl" radius="xl" onClick={() => alterarDados()}>
            Salvar
          </Button>
        </Center>
      </form>
    </>
  );
};

export default AddressData;
