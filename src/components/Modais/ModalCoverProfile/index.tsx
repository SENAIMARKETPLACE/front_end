import { Avatar, Button, Center, Image, Modal, TextInput } from '@mantine/core';
import styles from './ModalPhotoProfile.module.scss';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit } from '@tabler/icons-react';
import { useState } from 'react';

interface ModalPhotoProfileProps {
  inputProps: object;
  currentPhoto: string;
  updateProfilePhoto: Function;
}

const ModalCoverProfile = ({
  inputProps,
  currentPhoto,
  updateProfilePhoto,
}: ModalPhotoProfileProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [previewPhoto, setPreviewPhoto] = useState(currentPhoto);

  const formPhoto = useForm({
    initialValues: {
      url: '',
    },
    validate: {
      url: (value: string) => {
        const errors: Array<string> = [];

        /^(http|https):\/\//.test(value)
          ? null
          : errors.push(
              'Certifique-se de que a url inicie com http:// ou https://'
            );
        /\.(jpg|jpeg|png|gif|bmp)$/i.test(value)
          ? null
          : errors.push(
              'A url deve terminar com um tipo válido de imagem (jpeg, jpg ou png)'
            );

        return errors.length > 0 ? errors[0] : null;
      },
    },
  });
  return (
    <form>
      <Modal opened={opened} onClose={close} title="Pré-visualização">
        <Center mx="auto">
          <Image
            width={400}
            height={200}
            fit="fill"
            src={previewPhoto}
            radius={'sm'}
          />
        </Center>
        <form onSubmit={formPhoto.onSubmit(console.log)}>
          <TextInput
            data-autofocus
            label="URL da imagem"
            placeholder="Insira o link da imagem aqui"
            mt="md"
            {...inputProps}
            {...formPhoto.getInputProps('url')}
            onBlur={() => {
              formPhoto.values.url
                ? setPreviewPhoto(formPhoto.values.url)
                : null;
              formPhoto.isValid()
                ? alert(
                    'Quando houver url inserida, adicionar um gif de carregamento.'
                  )
                : null;
            }}
          />
          <Center mx="auto" mt={'xl'}>
            <Button
              radius={'xl'}
              type="submit"
              onClick={() => {
                if (formPhoto.isValid()) {
                  alert('Exibir uma mensagem de salvo com sucesso!');
                  updateProfilePhoto(formPhoto.values.url);
                  formPhoto.reset();
                  close();
                }
              }}
            >
              Salvar
            </Button>
          </Center>
        </form>
      </Modal>
      <Button
        onClick={open}
        leftIcon={<IconEdit />}
        variant="subtle"
        color="blue"
      >
        Alterar capa
      </Button>
    </form>
  );
};

export default ModalCoverProfile;
