import { Button, Center, SimpleGrid, TextInput } from '@mantine/core';
import styles from './AddressData.module.scss';
import { useForm } from '@mantine/form';
import axios from 'axios';
import masks from 'util/fieldMasks';

interface AddressDataProps {
  inputProps: object;
}

const AddressData = ({ inputProps }: AddressDataProps) => {
  const form = useForm({
    initialValues: {
      cep: masks.cep('01001000'),
      address: 'Praça da Sé',
      complement: 'lado ímpar',
      number: '20',
      city: 'São Paulo',
      state: 'SP',
      neighborhood: 'Sé',
    },
  });

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
          <Button type="submit" mt="xl" radius="xl">
            Salvar
          </Button>
        </Center>
      </form>
    </>
  );
};

export default AddressData;
