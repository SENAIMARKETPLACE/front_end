import { Button, Center, PasswordInput, SimpleGrid } from '@mantine/core';
import styles from './AccessData.module.scss';
import { useForm } from '@mantine/form';
import { validates } from 'util/validations';
import StrongPassword from 'components/StrongPassword';

interface AccessDataProps {
  inputProps: object;
}

const AccessData = ({ inputProps }: AccessDataProps) => {
  const form = useForm({
    initialValues: {
      password: '',
      newPassword: '',
      confirmNewPassword: '',
    },

    // functions will be used to validate values at corresponding key
    validate: {
      password: (value) => (value.length > 0 ? null : 'Digite sua senha'),
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
    <>
      <h3 className={styles.title}>Altere seus dados de acesso:</h3>
      <form onSubmit={form.onSubmit(console.log)} className={styles.form}>
        <PasswordInput
          label="Senha Atual"
          placeholder="Senha atual"
          {...inputProps}
          {...form.getInputProps('password')}
        />
        <StrongPassword />
        <SimpleGrid cols={2}>
          <PasswordInput
            label="Nova Senha"
            placeholder="Digite a nova senha"
            {...inputProps}
            // {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Confirme a nova senha"
            placeholder="Confirme a nova senha"
            {...inputProps}
            // {...form.getInputProps('email')}
          />
        </SimpleGrid>

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
