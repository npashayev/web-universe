import Image from "next/image";
import styles from "./page.module.scss";
import SolarSystem from "./components/SolarSystem";

export default function Home() {
  return (
    <main className={styles.page}>
      <SolarSystem />
      <div className={styles.txt}>
        <div className={styles.headingTxt}>
          <Image src="/images/galaxy.png" alt="galaxy icon" width={512} height={512} className={styles.galaxyIcn} />
          <h1>
            Explore the Universe of Web Development
          </h1>
        </div>
        <p>
          Start your journey through the cosmos of code — one planet at a time.
        </p>
        <p>
          Learn the building blocks of the web — HTML, CSS, and JavaScript — through interactive planets, visual guides, and hands-on examples made for absolute beginners.
        </p>
      </div>
    </main>
  );
}
