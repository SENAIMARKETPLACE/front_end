import gifLoading from "../../../public/gifs/load.gif";
import styles from "./LoadingGif.module.scss"

const LoadingGif = () => {
  return (
    <section className={styles.loadingAnimation}>
      <img src={gifLoading.src} alt="Loading Gif" />
    </section>
  );
};
export default LoadingGif;
