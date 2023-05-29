import { Button, Center, TextInput } from '@mantine/core';
import styles from './AccessData.module.scss';
import { useForm } from '@mantine/form';

interface AccessDataProps {
  inputProps: object;
}

const AccessData = ({ inputProps }: AccessDataProps) => {
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
      <h3 className={styles.title}>Altere seus dados de acesso:</h3>
      <form onSubmit={form.onSubmit(console.log)}>
        <TextInput
          label="Email"
          placeholder="Email"
          {...inputProps}
          {...form.getInputProps('email')}
        />
        <TextInput
          label="Senha Atual"
          placeholder="Email"
          {...inputProps}
          {...form.getInputProps('email')}
        />
        <TextInput
          label="Nova Senha"
          placeholder="Email"
          {...inputProps}
          {...form.getInputProps('email')}
        />
        <TextInput
          label="Confirme a nova senha"
          placeholder="Email"
          {...inputProps}
          {...form.getInputProps('email')}
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

export default AccessData;
