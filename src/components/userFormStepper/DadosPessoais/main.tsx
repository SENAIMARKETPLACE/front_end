import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import styled from "@emotion/styled";
import { IDataUser } from "../../../compartilhado/IDataUser";
import React, { FC, useState } from "react";
import { IMaskInput, useIMask } from "react-imask";
import styles from "./DadosPessoais.module.scss";
import { height } from "@mui/system";
import { InputMask } from "imask";
import { useMask } from 'react-mask-field'
interface DadosPessoaisProps {
  data: IDataUser;
  atualizarCampo: (key: string, value: string) => void;
  onData: (data: boolean) => void;
}

const InputField = styled(TextField)({
  width: "100%",
  margin: "5px 0",
});

const SelectField = styled(Select)({
  width: "100%",
  height: "55px",
  margin: "5px 0",
});




interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}


const TextMaskCustom = React.forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="000.000.000-00"
        onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  },
);




const DadosPessoais: FC<DadosPessoaisProps> = ({
  data,
  atualizarCampo,
  onData,
}: DadosPessoaisProps) => {
  const [errorCPF, setErrorCPF] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorGenero, setErrorGenero] = useState(false);
  const [errorTelefone, setErrorTelefone] = useState(false);
  const [errorNome, setErrorNome] = useState(false);
  const [errorFotoPerfil, setErrorFotoPerfil] = useState(false);
  const [errorData, setErrorData] = useState(false);

  const [buttonNextDisable, setButtonNextDisable] = useState<boolean>(false);


  const validarFoto = (fotoDigitada: string) => {
    const regexFoto = /\.(png|jpg)$/;
    if (regexFoto.test(fotoDigitada)) {
      setErrorFotoPerfil(false);
    } else {
      setErrorFotoPerfil(true);
      // setButtonNextDisable(true)
      // onData(buttonNextDisable)
    }
  };

  const validarNome = (nomeDigitado: string) => {
    const regexNome = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s-]{10,50}$/;
    if (regexNome.test(nomeDigitado)) {
      setErrorNome(false);
    } else {
      setErrorNome(true);
    }
  };

  const maskOnlyLetters = (value: string) => {
    return value.replace(/[0-9!@#¨$%^&*)(+=._-]+/g, "")
  }

  const validarGenero = (generoDigitado: string) => {
    if (data.genero === "") {
      setErrorGenero(true);
    } else {
      setErrorGenero(false);
    }
  };



  const maskCPF = (cpfDigitado: string) => {
    return cpfDigitado
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1")
  }


  const maskPhone = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})(\d+?)$/, '$1');
  };
  /* 
    ^: início da string
    (?=.*\d): deve conter pelo menos um dígito
    (?=.*[a-z]): deve conter pelo menos uma letra minúscula
    (?=.*[A-Z]): deve conter pelo menos uma letra maiúscula
    (?=.*[$*&@#]): deve conter pelo menos um caractere especial ($, *, &, @ ou #)
    [0-9a-zA-Z$*&@#]{8,}: deve ter pelo menos 8 caracteres e pode conter dígitos, letras maiúsculas e minúsculas e os caracteres especiais $, *, &, @ ou #
    $: fim da string
  */

  const validarCampoSenha = (senhaDigitada: string) => {
    const regexSenha = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,16}$/;
    if (regexSenha.test(senhaDigitada)) {
      setErrorPassword(false);
    } else {
      setErrorPassword(true);
    }
  };





  const validarEmail = (emailDigitado: string) => {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regexEmail.test(emailDigitado)) {
      setErrorEmail(false);
    } else {
      setErrorEmail(true);
    }
  };

  const validarTelefone = (telefoneDigitado: string) => {
    if (telefoneDigitado.length === 11) {
      setErrorTelefone(false);
    } else {
      setErrorTelefone(true);
    }
  };

  const validarCampoConfirmarSenha = (senhaDigitada: string) => {
    if (senhaDigitada !== data.senha) {
      setErrorConfirmPassword(true);
    } else {
      setErrorConfirmPassword(false);
    }
  };

  const validarData = (dataEscolhida: string) => {
    if (data.dataNasc !== " ") {
      setErrorData(false);
    } else {
      setErrorData(true);
    }
  };

  const validarCampoCpf = (cpfDigitado: string) => {
    if (cpfDigitado.length !== 11) {
      setErrorCPF(true);
    } else {
      setErrorCPF(false);
      let primeiroDigitoValido = true;
      let segundoDigitoValido = true;
      let soma = 0;
      for (let i = 0; i < 9; i++) {
        soma += parseInt(cpfDigitado.charAt(i)) * (10 - i);
      }
      let resto = soma % 11;
      let digitoVerificador1 = resto < 2 ? 0 : 11 - resto;
      if (digitoVerificador1 !== parseInt(cpfDigitado.charAt(9))) {
        primeiroDigitoValido = false; // Verifica o primeiro dígito verificador
      }
      soma = 0;
      for (let i = 0; i < 10; i++) {
        soma += parseInt(cpfDigitado.charAt(i)) * (11 - i);
      }
      resto = soma % 11;
      let digitoVerificador2 = resto < 2 ? 0 : 11 - resto;
      if (digitoVerificador2 !== parseInt(cpfDigitado.charAt(10))) {
        segundoDigitoValido = false; // Verifica o segundo dígito verificador
      }

      if (primeiroDigitoValido == true && segundoDigitoValido == true) {
        setErrorCPF(false);
      } else {
        setErrorCPF(true);
      }
    }
  };

  return (
    <section className={styles.camposCadastro}>
      <InputField
        label="Nome"
        InputLabelProps={{ shrink: true }}
        required
        value={data.nome || ""}
        error={errorNome}
        onBlur={(e) => {
          validarNome(data.nome);
        }}
        onChange={(e) => {
          atualizarCampo("nome", maskOnlyLetters(e.target.value));
        }}
        className={styles.camposCadastro__nome}
      ></InputField>
      <InputField
        error={errorCPF}
        label="CPF"
        // ref={refFieldCPF}
        InputLabelProps={{ shrink: true }}
        required
        value={data.cpf || ""}
        onChange={(e) => {
          atualizarCampo("cpf", maskCPF(e.target.value));
        }}
        onBlur={(e) => {
          validarCampoCpf(data.cpf);
        }}
        
        className={styles.camposCadastro__cpf}
      ></InputField>

      <InputField
        label="URL Foto de Perfil"
        InputLabelProps={{ shrink: true }}
        required
        error={errorFotoPerfil}
        onBlur={(e) => {
          validarFoto(data.urlFotoPerfil);
        }}
        value={data.urlFotoPerfil || ""}
        onChange={(e) => atualizarCampo("urlFotoPerfil", e.target.value)}
        className={styles.campoCadastro__urlPerfil}
      ></InputField>
      <InputField
        label="Telefone"
        InputLabelProps={{ shrink: true }}
        required
        error={errorTelefone}
        onBlur={(e) => validarTelefone(data.telefone)}
        value={data.telefone || ""}
        onChange={(e) => atualizarCampo("telefone", maskPhone(e.target.value))}
        className={styles.camposCadastro__telefone}
      ></InputField>
      <InputField
        label="Data de Nascimento"
        type="date"
        InputLabelProps={{ shrink: true }}
        required
        value={data.dataNasc || ""}
        error={errorData}
        onBlur={(e) => validarData(data.dataNasc)}
        onChange={(e) => atualizarCampo("dataNasc", e.target.value)}
        className={styles.camposCadastro__dtNasc}
      ></InputField>
      <SelectField
        value={data.genero || ""}
        onChange={(e: SelectChangeEvent) =>
          atualizarCampo("genero", e.target.value)
        }
        displayEmpty
        error={errorGenero}
        onBlur={(e) => validarGenero(data.genero)}
        required
        className={styles.camposCadastro__genero}
      >
        <MenuItem value="">Gênero</MenuItem>
        <MenuItem value="FEMININO">Feminino</MenuItem>
        <MenuItem value="MASCULINO">Masculino</MenuItem>
        <MenuItem value="NAO_INFORMADO">Não Informar</MenuItem>
      </SelectField>
      <InputField
        label="E-mail"
        InputLabelProps={{ shrink: true }}
        required
        value={data.email || ""}
        onChange={(e) => atualizarCampo("email", e.target.value)}
        onBlur={(e) => validarEmail(data.email)}
        error={errorEmail}
        className={styles.camposCadastro__email}
      ></InputField>
      <InputField
        label="Senha"
        type="password"
        error={errorPassword}
        InputLabelProps={{ shrink: true }}
        required
        value={data.senha || ""}
        onChange={(e) => {
          atualizarCampo("senha", e.target.value),
            validarCampoConfirmarSenha(data.confirmeSenha);
        }}
        onBlur={(e) => validarCampoSenha(data.senha)}
        className={styles.camposCadastro__senha}
      ></InputField>
      <InputField
        label="Confirmar Senha"
        type="password"
        error={errorConfirmPassword}
        InputLabelProps={{ shrink: true }}
        required
        onBlur={(e) => validarCampoConfirmarSenha(data.confirmeSenha)}
        value={data.confirmeSenha || ""}
        onChange={(e) => atualizarCampo("confirmeSenha", e.target.value)}
        className={styles.camposCadastro__confirmarSenha}
      ></InputField>
    </section>
  );
};
export default DadosPessoais;
