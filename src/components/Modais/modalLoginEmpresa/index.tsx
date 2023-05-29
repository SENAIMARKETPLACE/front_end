import styles from "./modalLoginEmpresa.module.scss";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Link from "next/link";
import logo from "../../../../public/images/Logo.svg";
import { validates } from "util/validations";
import { useForm } from "@mantine/form";
import { TextInput, Button, Checkbox, Text, Grid } from "@mantine/core";
import { PasswordInput } from "@mantine/core";
import { IconLock, IconAt } from "@tabler/icons-react";
import { FormEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

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

export default function ModalLoginEmpresa() {
  // Modal Settings
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [badLogin, setBadLogin] = useState(false);
  const router = useRouter();


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
    initialValues: { email: "", password: "" },

    // functions will be used to validate values at corresponding key
    validate: {
      email: (value) => (validates.email(value) ? null : "E-mail inválido"),
      password: (value) =>
        value.length < 8 ? "A senha deve conter no mínimo 8 caracteres." : null,
    },
  });

  useEffect(() => {
    setIsFormValid(!form.isValid());
  }, [form.isValid]);

  const showAlert = () => {
    alert(
      "Entre em contato com o administrador para recuperá-la. \nTelefone: (11) 4002-8922 \nE-mail: suport@sollaris.com"
    );
  };
  // ESSA VAI SER A FUNÇÃO
  const realizarOLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/marketplace");
  };

  return (
    <div>
      <Button className={styles.buttonLogin} onClick={handleOpen}>
        Login Empresa
      </Button>
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
                  Queremos que se sintam em casa e que trabalhemos juntos em
                  harmonia, sempre buscando inovação e excelência na prestação
                  de serviços. Juntos, somos mais fortes!
                </p>
              </div>
              <form  onSubmit={realizarOLogin}>
                <TextInput
                  label="Email"
                  placeholder="E-mail"
                  icon={<IconAt size="1rem" />}
                  size="lg"
                  withAsterisk={false}
                  required
                  {...form.getInputProps("email")}
                />
                <PasswordInput
                  label="Senha"
                  placeholder="Senha"
                  icon={<IconLock size="1rem" />}
                  size="lg"
                  mt="sm"
                  withAsterisk={false}
                  required
                  {...form.getInputProps("password")}
                />
                <div className={styles.modal__leftSide__options}>
                  <Checkbox label="Lembrar minha senha" />
                  <p onClick={() => showAlert()}>Esqueceu a senha?</p>
                </div>

                <div className={styles.modal__leftSide__spaceToBadRequest}>
                  {badLogin ? (
                    <MensagemBadRequest>
                      Colaborador, o login da sua empresa não foi bem-sucedido. Por favor, verifique
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
                <Link href="/cadastro/empresa">Cadastre-se agora!</Link>
              </div>
            </div>
            <div className={styles.modal__divImagem}></div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
