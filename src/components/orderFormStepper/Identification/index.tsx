import styles from "./Identification.module.scss";
import ProductPreview from "./ProductPreview";
import IdentificationPreview from "./IdentificationPreview";
import PaymentPreview from "./PaymentPreview";
import { IResponseLoginUser } from "compartilhado/IReponseLoginUser";
import { useEffect, useState } from "react";

interface props {
  prevStep: any;
  nextStep: any;
  valorTotal: string;
  userConnect: IResponseLoginUser;
}

const Identification = ({
  prevStep,
  nextStep,
  valorTotal,
  userConnect,
}: props) => {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  
  const [usuarioInfo, setUsuarioInfo] = useState<IResponseLoginUser>();
  useEffect(() => {
    const userDataString = localStorage.getItem("userLoginResponse");

    if (userDataString) {
      const userData: IResponseLoginUser = JSON.parse(userDataString);

      // ...faça o que for necessário com os dados do usuário
      setUsuarioInfo(userData);
    }
  }, []);

  useEffect(() => {
    if (usuarioInfo) {
      setNome(usuarioInfo.nome);
      setCpf(usuarioInfo.cpf);
      setEmail(usuarioInfo.email);
    }
  }, [usuarioInfo]);

  return (
    <div className={styles.container}>
      <ProductPreview />
      <IdentificationPreview
       
        userConnect={userConnect}
        prevStep={prevStep}
        nextStep={nextStep}
        overlay={false}
      />
      <PaymentPreview
        valorTotal={valorTotal}
        prevStep={prevStep}
        nextStep={nextStep}
        overlay={true}
      />
    </div>
  );
};

export default Identification;
