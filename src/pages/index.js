import { client } from "../lib/contentful";
import Head from "next/head";
import Card from "../components/card";
import styles from "../style/home.module.css";

export default function Home({ post }) {
  console.log(post);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={styles.grid}>
          {post.map((blogposts, i) => (
            <Card key={blogposts.fields.slug || i} post={blogposts} />
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  const response = await client.getEntries({ content_type: "post" });

  return {
    props: {
      post: response.items,
      revalidate: 70,
    },
  };
};