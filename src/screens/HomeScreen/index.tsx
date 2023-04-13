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
        asdasdas
        asdasdasd
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur, eveniet ex dignissimos delectus velit voluptate molestias, culpa maxime praesentium sapiente ipsam aliquam fugiat repellat dolorem cupiditate. Omnis, deleniti. Qui, nesciunt.
      </main>
      <FooterSollaris></FooterSollaris>
    </div>
  );
};
export default HomeScreen;
