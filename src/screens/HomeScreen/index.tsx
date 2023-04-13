import React from "react";
import { MdGroups, MdPerson, MdStar, MdStore } from "react-icons/md";
import HeaderSollaris from "../../layout/Header";
import styles from "./HomeScreen.module.scss";
import beneficios1 from "../../../public/images/beneficios1.png";
import Link from "next/link";
import FooterSollaris from "../../layout/Footer";
import SectionOne from "../../components/homeScreenComponents/sectionOne";

const HomeScreen = () => {
  return (
    <div className={styles.bodyHome}>
      <HeaderSollaris></HeaderSollaris>
      <main>
        <SectionOne />
      </main>
      <FooterSollaris></FooterSollaris>
    </div>
  );
};
export default HomeScreen;
