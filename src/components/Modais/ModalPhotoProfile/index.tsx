import { Avatar, Button, Center, Modal, TextInput } from '@mantine/core';
import styles from './ModalPhotoProfile.module.scss';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit } from '@tabler/icons-react';

interface ModalPhotoProfileProps {
  inputProps: object;
  currentPhoto: string;
}

const ModalPhotoProfile = ({
  inputProps,
  currentPhoto,
}: ModalPhotoProfileProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  const formPhoto = useForm({
    initialValues: {
      url: currentPhoto,
    },
    validate: {
      url: (value: string) =>
        value.length > 2
          ? null
          : 'Certifique-se de que a url inicia com http:// ou https://',
    },
  });
  return (
    <form>
      <Modal opened={opened} onClose={close} title="Pré-visualização">
        <Center maw={400} h={100} mx="auto">
          <Avatar
            src={currentPhoto}
            size={100}
            radius={'50%'}
            mb={20}
            mt={20}
          />
        </Center>
        <form onSubmit={formPhoto.onSubmit(console.log)}>
          <TextInput
            data-autofocus
            label="Insira a URL da imagem"
            placeholder="URL"
            mt="md"
            {...inputProps}
            {...formPhoto.getInputProps('url')}
          />
          <Center mx="auto" mt={'xl'}>
            <Button radius={'xl'} type="submit">
              Salvar
            </Button>
          </Center>
        </form>
      </Modal>
      <IconEdit onClick={open} />
    </form>
  );
};

export default ModalPhotoProfile;
