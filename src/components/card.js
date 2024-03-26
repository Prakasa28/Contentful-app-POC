import Link from "next/link";
import ContentfulImages from "../components/contentfulImage";
import styles from "../style/card.module.css";

const Card = ({ post }) => {
  //   if (!post || !post.fields) {
  //     // Handle the case when post or post.fields is undefined
  //     return null; // or any other appropriate handling
  //   }
  const { title, slug, coverImage, date } = post.fields;
  console.log(post);
  return (
    <>
      <Link href={`/${slug}`} aria-label={title}>
        <div className={styles.cardWraper}>
          <ContentfulImages
            src={coverImage.fields.file.url}
            width={coverImage.fields.file.details.image.width}
            height={coverImage.fields.file.details.image.height}
            quality="100"
            alt={title}
          />

          <h2>{title}</h2>
          <span>Date:{date}</span>
        </div>
      </Link>
    </>
  );
};

export default Card;
