import Head from "next/head";
import Image from "next/image";

import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Crystallize Topics Navigation</title>
        <meta
          name="description"
          content="How to use topics to create topics navigation in Next.js"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Topics for navigation</h1>

        <p className={styles.description}>
          This is an example of how to use{" "}
          <a href="https://crystallize.com/learn/concepts/pim/topic-map">
            Crystallize topics
          </a>{" "}
          for navigation in{" "}
          <a
            href="https://nextjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Next.js
          </a>
        </p>
        <Image
          alt=""
          width={200}
          height={200}
          className={styles.image}
          src="https://media.crystallize.com/crystallize_marketing/21/4/20/6/topic-organizer.png"
        />
      </main>
    </>
  );
}
