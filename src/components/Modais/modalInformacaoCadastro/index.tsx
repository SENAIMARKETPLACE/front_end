import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FC, useState } from "react";
import { IconType } from "react-icons/lib";
import styled from "styled-components";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";

interface modalInformacaoCadastroProps {
  isOpen: boolean;
  iconeProps: IconType;
  legendaBotaoProps: string;
  mensagemModalPrincipalProps: string;
  descricaoModalProps?: string;
  colorProps: string;
}

const ModalInformacaoCadastro: FC<modalInformacaoCadastroProps> = ({
  isOpen,
  mensagemModalPrincipalProps,
  descricaoModalProps,
  colorProps,
  iconeProps,
  legendaBotaoProps,
}) => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = useState<boolean>(isOpen);
  const [icone, setIcone] = useState(<FaUser />);
  const router = useRouter();

  const rendirecionamento = (url: string) => {
    router.push(url);
  };

  React.useEffect(() => {
    setOpen(isOpen);
    setIcone(iconeProps);
  }, [isOpen]);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    color: "#fff",
    transform: "translate(-50%, -50%)",
    width: "100vw",
    bgcolor: `${colorProps}`,
    boxShadow: 24,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    p: 10,
  };

  const SectionIcone = styled.div`
    font-size: 60px;
    margin-bottom: 20px;
  `;
  const TituloModal = styled.h3`
    font-size: 18px;
    margin-bottom: 20px;
    font-style: italic;
    display: flex;
  `;

  const ButtonRedirecionamento = styled.button`
    background-color: ${colorProps}; /* cor de fundo */
    border: none; /* sem borda */
    margin-top: 10px;
    color: white; /* cor do texto */
    padding: 12px 24px; /* espaçamento interno */
    text-align: center; /* alinhamento do texto */
    text-decoration: none; /* sem decoração */
    display: inline-block; /* exibição em linha */
    font-size: 16px; /* tamanho da fonte */
    border-radius: 4px; /* raio da borda */
    transition-duration: 0.4s; /* duração da transição */

    &:hover {
      cursor: pointer;
      color: white; /* cor do texto ao passar o mouse */
      text-style: italic;
    }
  `;

  

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <SectionIcone>{icone}</SectionIcone>
          <TituloModal>{mensagemModalPrincipalProps}</TituloModal>
          <p>{descricaoModalProps}</p>
          <ButtonRedirecionamento
            onClick={(e) => {
              rendirecionamento("/#");
            }}
          > 
            {legendaBotaoProps}
          </ButtonRedirecionamento>
        </Box>
      </Modal>
    </div>
  );
};
export default ModalInformacaoCadastro;
