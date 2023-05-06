import React from "react";
import { MdGroups, MdPerson, MdStar, MdStore } from "react-icons/md";
import HeaderSollaris from "../../layout/Header";
import styles from "./HomeScreen.module.scss";
import FooterSollaris from "../../layout/Footer";
import SectionOne from "../../components/homeScreenComponents/sectionOne";
import SectionSignIn from "../../components/homeScreenComponents/sectionSignIn";
import CarrosselProdutos from "../../components/CarrosselProdutos";

const HomeScreen = () => {

  return (
    <div className={styles.bodyHome}>
      <HeaderSollaris></HeaderSollaris>
      <main>
        <SectionOne />
        <CarrosselProdutos/>
        <SectionSignIn />
      </main>
      <FooterSollaris></FooterSollaris>
    </div>
  );
};
export default HomeScreen;
