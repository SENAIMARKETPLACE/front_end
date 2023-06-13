import { Button, Center, PasswordInput, SimpleGrid } from "@mantine/core";
import styles from "./AccessData.module.scss";
import { useForm } from "@mantine/form";
import { validates } from "util/validations";
import StrongPassword from "components/StrongPassword";
import { IResponseLoginUser } from "compartilhado/IReponseLoginUser";
import { IAccessData } from "compartilhado/AlteracoesPerfilUser/IAccessData";
import { httpUsuario } from "../../../../http";

interface AccessDataProps {
  inputProps: object;
  userConnect: IResponseLoginUser;
}

const AccessData = ({ inputProps, userConnect }: AccessDataProps) => {
  const form: any = useForm({
    initialValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },

    // // functions will be used to validate values at corresponding key
    // validate: {
    //   password: (value) => {
    //     const errors: Array<string> = [];

    //     value.length > 0 ? null : errors.push("Digite sua senha.");

    //     value === "admin" ? null : errors.push("Senha incorreta.");

    //     return errors.length > 0 ? errors[0] : null;
    //   },
    //   newPassword: (value) => {
    //     const errors: Array<string> = [];

    //     /[0-9]/.test(value) ? null : errors.push("Includes number");

    //     /[a-z]/.test(value) ? null : errors.push("Includes lowercase letter");

    //     /[A-Z]/.test(value) ? null : errors.push("Includes uppercase letter");

    //     /[$&+,:;=?@#|'<>.^*()%!-]/.test(value)
    //       ? null
    //       : errors.push("Includes special symbol");

    //     value.length >= 8
    //       ? null
    //       : errors.push("A senha deve ter no mínimo 8 caracteres.");

    //     return errors.length > 0 ? errors[0] : null;
    //   },
    //   confirmPassword: (value) =>
    //     form.values.newPassword === form.values.confirmPassword
    //       ? null
    //       : "As senhas digitadas são diferentes.",
    // },
  });

  const handleInputChange = (fieldName: string, maskFunction?: Function) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    const maskedValue = maskFunction ? maskFunction(inputValue) : inputValue;
    form.setFieldValue(fieldName, maskedValue);
  };

  const alterarDados = () => {
    const alterarSenha: IAccessData = {
      usuario_id: userConnect.id,
      senha_antiga: form.values.password,
      senha_nova: form.values.newPassword,
    };

    console.log(alterarSenha)
    httpUsuario.put(`api/users/password/`, alterarSenha)
      .then(() => alert("Informações da nova senha Salvas!"))
      .catch((erro) => alert("Senha inválida"))
    form.isValid() ? form.reset() : null;
    console.log(alterarSenha);
    // router.reload();
  };
  return (
    <>
      <form onSubmit={form.onSubmit(console.log)} className={styles.form}>
        <h3 className={styles.title}>Altere seus dados de acesso:</h3>
        <PasswordInput
          label="Senha Atual"
          placeholder="Senha atual"
          {...inputProps}
          {...form.getInputProps("password")}
        />

        <SimpleGrid cols={2}>
          {/* <StrongPassword
            label={'Digite sua nova senha'}
            placeholder={'Confirme sua senha'}
            props={inputProps}
            form={form}
            name={'newPassword'}
          /> */}
          <PasswordInput
            label="Nova Senha"
            placeholder="Digite a nova senha"
            {...inputProps}
            {...form.getInputProps("newPassword")}
          />
          <PasswordInput
            label="Confirme a nova senha"
            placeholder="Confirme a nova senha"
            {...inputProps}
            {...form.getInputProps("confirmPassword")}

          // {...form.getInputProps('email')}
          />
        </SimpleGrid>

        <Center>
          <Button type="submit" mt="xl" radius="xl" onClick={alterarDados}>
            Salvar
          </Button>
        </Center>
      </form>
    </>
  );
};

export default AccessData;
