import { TextField } from '@mui/material';
import { styled } from '@mui/styles';
import { IDataEmpresa } from '../../../compartilhado/IDataEmpresa';
import styles from './DadosEmpresa.module.scss';
import masks from 'util/fieldMasks';
import { useState } from 'react';
import { validates } from 'util/validations';

interface DadosEmpresaProps {
  data: IDataEmpresa;
  atualizarCampo: (key: string, value: string) => void;
}
const InputField = styled(TextField)({
  width: '100%',
  margin: '5px 0',
});

const DadosEmpresa = ({ data, atualizarCampo }: DadosEmpresaProps) => {
  const [errorName, setErrorName] = useState(false);

  const validatateField = (fieldName:string, value:string) => {

    const fieldElement = document.querySelector(`[data-field="${fieldName}"]`);
    const fieldContainer = fieldElement.closest('div').parentNode;
    let errorMsg = fieldContainer.querySelector('p');   

    switch (fieldName) {    
      case 'name':
        let {error, msg} = validates.name(value);            
        setErrorName(error)

        error ? errorMsg.textContent = msg : errorMsg.textContent = '';
        
        
        
        
        // Lógica para o campo "name"
        break;
      case 'email':
        // Lógica para o campo "email"
        break;
      case 'password':
        // Lógica para o campo "password"
        break;
      default:
        // Lógica para outros campos
        break;
    }
  }

  return (
    <section className={styles.fields}>
      <InputField
        className={styles['field--name']}
        label="Nome do Responsável"
        InputLabelProps={{ shrink: true }}
        required
        value={data.nome_proprietario || ''}
        onChange={(e) =>
          atualizarCampo('nome_proprietario', masks.letters(e.target.value))
        }
        onBlur={(e) => validatateField('name', e.target.value)}
        error={errorName}
        helperText={' '}
        inputProps={{ 'data-field': 'name' }}
      />
      <InputField
        className={styles['field--cnpj']}
        label="CNPJ"
        InputLabelProps={{ shrink: true }}
        required
        value={data.cnpj || ''}
        onChange={(e) => atualizarCampo('cnpj', masks.cnpj(e.target.value))}
      />
      <InputField
        className={styles['field--companyName']}
        label="Razão Social"
        InputLabelProps={{ shrink: true }}
        required
        value={data.razao_social || ''}
        onChange={(e) => atualizarCampo('razao_social', e.target.value)}
      ></InputField>
      <InputField
        className={styles['field--fantasyName']}
        label="Nome Fantasia"
        InputLabelProps={{ shrink: true }}
        required
        value={data.nome_fantasia || ''}
        onChange={(e) => atualizarCampo('nome_fantasia', e.target.value)}
      ></InputField>
      <InputField
        className={styles['field--phone']}
        label="Telefone"
        InputLabelProps={{ shrink: true }}
        value={data.telefone || ''}
        onChange={(e) =>
          atualizarCampo('telefone', masks.phone(e.target.value))
        }
        required
      ></InputField>
      <InputField
        className={styles['field--email']}
        label="E-mail"
        InputLabelProps={{ shrink: true }}
        value={data.email || ''}
        onChange={(e) => atualizarCampo('email', e.target.value)}
        required
      ></InputField>
      <InputField
        className={styles['field--logoSrc']}
        label="URL Logomarca"
        InputLabelProps={{ shrink: true }}
        required
        value={data.url_logo || ''}
        onChange={(e) => atualizarCampo('url_logo', e.target.value)}
      ></InputField>
      <InputField
        className={styles['field--password']}
        label="Senha"
        InputLabelProps={{ shrink: true }}
        required
        type="password"
        value={data.senha || ''}
        onChange={(e) => atualizarCampo('senha', e.target.value)}
      ></InputField>
      <InputField
        className={styles['field--confirmPassword']}
        label="Confirmação de Senha"
        InputLabelProps={{ shrink: true }}
        required
        type="password"
        value={data.confirme_senha || ''}
        onChange={(e) => atualizarCampo('confirme_senha', e.target.value)}
      ></InputField>
      <div className={styles['field--message']}>
        <p>
          • Se você não tem cadastro como pessoa jurídica, pode solicitar o MEI
          no{' '}
          <a
            target="_blank"
            href="https://portaldoempreendedor.me/produto/registro-cnpj-mei"
          >
            Portal do Empreendedor
          </a>
          , de forma rápida e simples!
        </p>
      </div>
    </section>
  );
};
export default DadosEmpresa;
