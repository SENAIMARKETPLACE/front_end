import React from "react";
import Header from "../../layout/Header";
import styles from "./HomeScreen.module.scss"

const HomeScreen = () => {
  return (
    <>
      <Header></Header>
      <main className={styles.sectionMain}>
        <section className={styles.main__alert}>
          <iframe src="https://embed.lottiefiles.com/animation/83369"></iframe>
          <h2>PÁGINA EM DESENVOLVIMENTO</h2>
        </section>
      </main>
    </>
  );
};
export default HomeScreen;
