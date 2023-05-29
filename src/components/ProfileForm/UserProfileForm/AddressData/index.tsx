import { Button, Center, TextInput } from '@mantine/core';
import styles from './AddressData.module.scss';
import { useForm } from '@mantine/form';

interface AddressDataProps {
  inputProps: object;
}

const AddressData = ({ inputProps }: AddressDataProps) => {
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
    <>
      <h3 className={styles.title}>Altere suas informações de endereço:</h3>
      <form onSubmit={form.onSubmit(console.log)}>
        <TextInput
          label="CEP"
          placeholder="Name"
          {...inputProps}
          {...form.getInputProps('name')}
        />
        <TextInput
          label="Logradouro"
          placeholder="Name"
          {...inputProps}
          {...form.getInputProps('name')}
        />
        <TextInput
          label="Complemento"
          placeholder="Name"
          {...inputProps}
          {...form.getInputProps('name')}
        />
        <TextInput
          label="Número"
          placeholder="Name"
          {...inputProps}
          {...form.getInputProps('name')}
        />
        <TextInput
          label="Cidade"
          placeholder="Name"
          {...inputProps}
          {...form.getInputProps('name')}
        />
        <TextInput
          label="Estado"
          placeholder="Name"
          {...inputProps}
          {...form.getInputProps('name')}
        />
        <TextInput
          label="Bairro"
          placeholder="Name"
          {...inputProps}
          {...form.getInputProps('name')}
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
