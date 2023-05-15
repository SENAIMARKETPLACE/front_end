import {
  Button,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import styled from '@emotion/styled';
import { IDataUser } from '../../../compartilhado/IDataUser';
import React, { FC, useEffect, useState } from 'react';
import { IMaskInput, useIMask } from 'react-imask';
import styles from './DadosPessoais.module.scss';
import { height } from '@mui/system';
import { InputMask } from 'imask';
import { useMask } from 'react-mask-field';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
interface DadosPessoaisProps {
  data: IDataUser;
  atualizarCampo: (key: string, value: string) => void;
  onData: (data: boolean) => void;
}

const InputField = styled(TextField)({
  width: '100%',
  margin: '5px 0',
});

const SelectField = styled(Select)({
  width: '100%',
  height: '55px',
  margin: '5px 0',
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
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
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

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const validarFoto = (fotoDigitada: string) => {
    const regexFoto = /https?:\/\/.*\.(jpe?g|png)/;
    if (regexFoto.test(fotoDigitada)) {
      setErrorFotoPerfil(false);
    } else {
      setErrorFotoPerfil(true);
    }
  };

  const checkItem = () => {
    const erros = [
      errorCPF,
      errorPassword,
      errorConfirmPassword,
      errorEmail,
      errorGenero,
      errorTelefone,
      errorNome,
      errorFotoPerfil,
      errorData,
    ];
    if (erros.includes(true)) {
      console.table(erros);
      onData(true);
    } else {
      console.table(erros);
      onData(false);
    }
  };

  useEffect(() => {
    checkItem();
  }, []);

  const validarNome = (nomeDigitado: string) => {
    const regexNome = /\D{10,50}$/;
    if (regexNome.test(nomeDigitado)) {
      setErrorNome(false);
    } else {
      //ERRO NOME
      setErrorNome(true);
    }
  };

  const maskOnlyLetters = (value: string) => {
    return value.replace(/[0-9!@#¨$%^&*)(+=._-]+/g, '');
  };

  const validarGenero = (generoDigitado: string) => {
    if (data.genero === '') {
      //ERRO GENERO
      setErrorGenero(true);
    } else {
      if (data.genero === 'Gênero') {
        //ERRO GENERO
        setErrorGenero(true);
      } else {
        setErrorGenero(false);
      }
    }
  };

  const maskCPF = (cpfDigitado: string) => {
    return cpfDigitado
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

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
    const regexSenha =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,16}$/;
    if (regexSenha.test(senhaDigitada)) {
      setErrorPassword(false);
    } else {
      //errorPassword
      setErrorPassword(true);
    }
  };
  const validarCampoConfirmarSenha = (senhaDigitada: string) => {
    if (senhaDigitada !== data.senha) {
      setErrorConfirmPassword(true);
    } else {
      setErrorConfirmPassword(false);
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
    telefoneDigitado = telefoneDigitado
      .replace(/[,!()-.]/g, '')
      .replaceAll(' ', '');
    if (telefoneDigitado.length === 11) {
      setErrorTelefone(false);
    } else {
      setErrorTelefone(true);
    }
  };

  function has18Years(field: string): boolean {
    const dateOfBirth = new Date(field);
    const currentDate = new Date();

    let yearsDiff = currentDate.getUTCFullYear() - dateOfBirth.getUTCFullYear();
    const monthsDiff = currentDate.getUTCMonth() - dateOfBirth.getUTCMonth();
    const daysDiff = currentDate.getUTCDate() - dateOfBirth.getUTCDate();

    if (monthsDiff < 0 || daysDiff < 0) yearsDiff--;

    return yearsDiff >= 18;
  }

  const validarData = (dataEscolhida: string) => {
    if (dataEscolhida === '') {
      setErrorData(true);
    } else {
      if (!has18Years(dataEscolhida)) {
        setErrorData(true);
      } else {
        setErrorData(false);
      }
    }
  };

  const validarCampoCpf = (cpfDigitado: string) => {
    cpfDigitado = cpfDigitado.replace(/[,!()-.]/g, '').replaceAll(' ', '');

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
        value={data.nome || ''}
        error={errorNome}
        onBlur={(e) => {
          validarNome(data.nome);
        }}
        onMouseUp={(e) => checkItem()}
        onChange={(e) => {
          atualizarCampo('nome', maskOnlyLetters(e.target.value));
        }}
        className={styles.camposCadastro__nome}
      ></InputField>
      <InputField
        error={errorCPF}
        label="CPF"
        // ref={refFieldCPF}
        InputLabelProps={{ shrink: true }}
        required
        onMouseUp={(e) => checkItem()}
        value={data.cpf || ''}
        onChange={(e) => {
          atualizarCampo('cpf', maskCPF(e.target.value));
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
        onMouseUp={(e) => checkItem()}
        error={errorFotoPerfil}
        onBlur={(e) => {
          validarFoto(data.urlFotoPerfil);
        }}
        value={data.urlFotoPerfil || ''}
        onChange={(e) => atualizarCampo('urlFotoPerfil', e.target.value)}
        className={styles.campoCadastro__urlPerfil}
      ></InputField>
      <InputField
        label="Telefone"
        InputLabelProps={{ shrink: true }}
        required
        error={errorTelefone}
        onBlur={(e) => {
          validarTelefone(data.telefone);
        }}
        onMouseUp={(e) => checkItem()}
        value={data.telefone || ''}
        onChange={(e) => atualizarCampo('telefone', maskPhone(e.target.value))}
        className={styles.camposCadastro__telefone}
      ></InputField>
      <InputField
        label="Data de Nascimento"
        type="date"
        InputLabelProps={{ shrink: true }}
        required
        value={data.dataNasc || ''}
        error={errorData}
        onBlur={(e) => {
          validarData(e.target.value);
        }}
        onMouseUp={(e) => checkItem()}
        onChange={(e) => atualizarCampo('dataNasc', e.target.value)}
        className={styles.camposCadastro__dtNasc}
      ></InputField>
      <SelectField
        value={data.genero || ''}
        onChange={(e: SelectChangeEvent) =>
          atualizarCampo('genero', e.target.value)
        }
        displayEmpty
        error={errorGenero}
        onBlur={(e) => {
          validarGenero(data.genero);
        }}
        onMouseUp={(e) => checkItem()}
        required
        className={styles.camposCadastro__genero}
      >
        <MenuItem value="" disabled>
          Gênero
        </MenuItem>
        <MenuItem value="FEMININO">Feminino</MenuItem>
        <MenuItem value="MASCULINO">Masculino</MenuItem>
        <MenuItem value="NAO_INFORMADO">Não Informar</MenuItem>
      </SelectField>
      <InputField
        label="E-mail"
        InputLabelProps={{ shrink: true }}
        required
        value={data.email || ''}
        onChange={(e) => atualizarCampo('email', e.target.value)}
        onBlur={(e) => {
          validarEmail(data.email);
        }}
        onMouseUp={(e) => checkItem()}
        error={errorEmail}
        className={styles.camposCadastro__email}
      ></InputField>
      {/* <FormControl required variant="filled">
        <InputLabel htmlFor="outlined-adornment-password" >Senha</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          error={errorPassword}
          required
          value={data.senha || ""}
          onChange={(e) => {
            atualizarCampo("senha", e.target.value),
              validarCampoConfirmarSenha(data.confirmeSenha);
          }}
          onBlur={(e) => validarCampoSenha(data.senha)}
          className={styles.camposCadastro__senha}
        ></OutlinedInput>
      </FormControl> */}
      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          required
          error={errorPassword}
          value={data.senha || ''}
          onChange={(e) => {
            atualizarCampo('senha', e.target.value),
              validarCampoConfirmarSenha(data.confirmeSenha);
          }}
          onMouseUp={(e) => checkItem()}
          onBlur={(e) => validarCampoSenha(data.senha)}
          className={styles.camposCadastro__senha}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>

      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">
          Confirmar Senha
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          required
          error={errorConfirmPassword}
          value={data.confirmeSenha || ''}
          onChange={(e) => {
            atualizarCampo('confirmeSenha', e.target.value);
          }}
          onMouseUp={(e) => checkItem()}
          onBlur={(e) => validarCampoConfirmarSenha(data.confirmeSenha)}
          className={styles.camposCadastro__senha}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
    </section>
  );
};
export default DadosPessoais;
