import styles from "./modalLoginUsuario.module.scss";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Link from "next/link";
import logo from "../../../../public/images/Logo.svg";
import { validates } from "util/validations";
import { UseFormReturnType, useForm } from "@mantine/form";
import { TextInput, Button, Checkbox, Text, Grid } from "@mantine/core";
import { PasswordInput } from "@mantine/core";
import { IconLock, IconAt } from "@tabler/icons-react";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { ILoginBody } from "compartilhado/ILoginBody";
import { httpUsuario } from "../../../http";
import { IResponseLoginUser } from "compartilhado/IReponseLoginUser";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "90vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  display: "flex",
};

interface ModalLoginEmpresaProps {
  setarIsLogged: (newState: boolean) => void;
}

export default function ModalLoginEmpresa({
  setarIsLogged,
}: ModalLoginEmpresaProps) {
  // Modal Settings
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [badLogin, setBadLogin] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const MensagemBadRequest = styled.div`
    color: #cc3a3a;
    font-size: 12px;
    text-align: center;
    letter-spacing: 1px;
  `;

  // Form Settings
  const [isFormValid, setIsFormValid] = useState(false);

  const form = useForm({
    validateInputOnBlur: true,
    initialValues: { email: "", senha: "" },

    // functions will be used to validate values at corresponding key
    validate: {
      email: (value) => (validates.email(value) ? null : "E-mail inválido"),
      senha: (value) =>
        value.length < 8 ? "A senha deve conter no mínimo 8 caracteres." : null,
    },
  });

  // ESSA VAI SER A FUNÇÃO de login
  const realizarOLogin = (
    event: FormEvent<HTMLFormElement>,
    formValues: UseFormReturnType<
      {
        email: string;
        senha: string;
      },
      (values: {
        email: string;
        senha: string;
      }) => {
        email: string;
        senha: string;
      }
    >
  ) => {
    
    // httpUsuario
    //   .post("api/users/login", formValues.values)
    //   // NO PRÓXIMO THEN EU VOU POPULARIZAR A MINHA VARIÁVEL do Tipo IResponseLoginUser
    //   .then((response) => {
    //     const userLoginResponse: IResponseLoginUser = response.data.content

    //     //armazena os dados no localstorage:
    //     localStorage.setItem('userLoginResponse', JSON.stringify(userLoginResponse))

    //     //definir a variável isLogged como true
    //     setarIsLogged(true)

    //     //ENVIAR PARA A PÁGINA, AGORA LOGADO E VISUALIZAR SUAS INFORMAÇÕES
    //     router.push("/marketplace")
    //   })
    //   .then((resp) => router.push("/marketplace"))
    //   .catch((erro) => {
    //     setBadLogin(true);

    //   });
    // event.preventDefault();
    httpUsuario
      .post("api/users/login", formValues.values)
      // NO PRÓXIMO THEN EU VOU POPULARIZAR A MINHA VARIÁVEL do Tipo IResponseLoginUser
      .then((response) => {
        const userLoginResponse: IResponseLoginUser = response.data.content;

        //armazena os dados no localstorage:
        localStorage.setItem(
          "userLoginResponse",
          JSON.stringify(userLoginResponse)
        );
      })
      .then((resp) => router.push("/marketplace"))
      .catch((erro) => {
        setBadLogin(true);

        //definir a variável isLogged como true
        setarIsLogged(true);

        //MOCKANDO UM USUARIO FALSO
        const userLoginResponse: IResponseLoginUser = {
          id: "44",
          data_requisicao: "09/06/2023 11:00:11",
          nome: "Juvenal Maxiliano",
          cpf: "53950516867",
          email: "jvabreusousa19@gmail.com",
          data_nascimento: "03/03/2002",
          genero: "MASCULINO",
          img: "https://github.com/joaoabreu004.png",
          gruposDeInteresse: ["1", "5"],
          enderecos: [
            {
              id: "1",
              cep: "05881020",
              logradouro: "Rua Abílio César",
              numero: "28",
              estado: "SP",
              bairro: "Capão Redondo",
              cidade: "São Paulo",
              complemento: "Teste"
            },
          ],
        };

        //ENVIANDO PARA LOCALSTORAGE:
        localStorage.setItem(
          "userLoginResponse",
          JSON.stringify(userLoginResponse)
        );
        
        //ENVIAR PARA A PÁGINA, AGORA LOGADO E VISUALIZAR SUAS INFORMAÇÕES
        router.push("/marketplace");
        localStorage.setItem("isUserLogged", "true");
        router.reload();
      });
    event.preventDefault();
  };


  useEffect(() => {
    setIsFormValid(!form.isValid());
  }, [form.isValid]);

  const showAlert = () => {
    alert(
      "Atleta! Entre em contato com o administrador para recuperá-la. \nTelefone: (11) 4002-8922 \nE-mail: suport@sollaris.com"
    );
  };

  return (
    <div>
      <p onClick={handleOpen}>Usuário</p>
      <Modal
        aria-labelledby="Modal para cadastro de empresa"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} className={styles.modal}>
            <div className={styles.modal__leftSide}>
              <div className={styles.modal__leftSide__image}>
                <img src={logo.src} alt="" />
              </div>
              <div className={styles.modal__leftSide__textoModal}>
                <h2>SEJA BEM-VINDO!</h2>
                <p>
                  Esperamos que você aproveite ao máximo a sua experiência
                  conosco e que encontre aqui um espaço para se inspirar para
                  viver uma vida mais saudável e ativa.
                </p>
              </div>
              <form onSubmit={(e) => realizarOLogin(e, form)}>
                <TextInput
                  label="Email"
                  placeholder="E-mail"
                  value={form.values.email}
                  icon={<IconAt size="1rem" />}
                  size="lg"
                  withAsterisk={false}
                  required
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  type="text"
                  {...form.getInputProps("email")}
                />
                <PasswordInput
                  label="Senha"
                  value={password}
                  placeholder="Senha"
                  icon={<IconLock size="1rem" />}
                  size="lg"
                  mt="sm"
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  withAsterisk={false}
                  required
                  {...form.getInputProps("senha")}
                />
                <div className={styles.modal__leftSide__options}>
                  <Checkbox label="Lembrar minha senha" />
                  <p onClick={() => showAlert()}>Esqueceu a senha?</p>
                </div>

                <div className={styles.modal__leftSide__spaceToBadRequest}>
                  {badLogin ? (
                    <MensagemBadRequest>
                      Atleta, o login não foi bem-sucedido. Por favor, verifique
                      suas informações de acesso e tente novamente.
                    </MensagemBadRequest>
                  ) : (
                    ""
                  )}
                </div>
                <div className={styles.modal__leftSide__buttons}>
                  <Button
                    type="submit"
                    mt="sm"
                    size="lg"
                    disabled={isFormValid}
                  >
                    ENTRAR
                  </Button>
                </div>
              </form>

              <div className={styles.modal__leftSide__signIn}>
                <p>Ainda não tem conta cadastrada? </p>
                <Link href="/cadastro/usuario">Cadastre-se agora!</Link>
              </div>
            </div>
            <div className={styles.modal__divImagem}></div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
