import { TextField } from '@mui/material';
import { styled } from '@mui/styles';
import { IDataEmpresa } from '../../../compartilhado/IDataEmpresa';
import styles from './DadosEmpresa.module.scss';
import masks from 'util/fieldMasks';

interface DadosEmpresaProps {
  data: IDataEmpresa;
  atualizarCampo: (key: string, value: string) => void;
}
const InputField = styled(TextField)({
  width: '100%',
  margin: '5px 0',
});

const DadosEmpresa = ({ data, atualizarCampo }: DadosEmpresaProps) => {
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
