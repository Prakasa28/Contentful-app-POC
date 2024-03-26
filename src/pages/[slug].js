import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { client } from "../lib/contentful";
import Lottie from "react-lottie";
import { Select } from "@contentful/f36-components";
import ContentfulImage from "../components/contentfulImage";
import CardDetail from "../components/cardDetail";
import RichText from "../components/richText";
import styles from "../style/carddetail.module.css";
import FeatureCards from "../components/featureCard";

const Blogs = ({ post }) => {
  const router = useRouter();
  const {
    title,
    coverImage,
    date,
    authore,
    content,
    lottieAnimation,
    colorPicker,
    noOfFeatureCard,
  } = post.fields;

  console.log(post.fields);
  console.log(colorPicker);
  console.log(post);
  console.log(noOfFeatureCard);

  // const [locales, setLocales] = useState([]);
  // const [selectedLanguage, setSelectedLanguage] = useState("en-us"); // Default language
  // const [selectedPost, setSelectedPost] = useState(post);

  // useEffect(() => {
  //   const fetchSpaceData = async () => {
  //     try {
  //       const space = await client.getSpace();
  //       setLocales(space.locales);
  //       console.log(space);
  //     } catch (error) {
  //       console.error("Error fetching space data:", error);
  //     }
  //   };

  //   fetchSpaceData();
  // }, []);

  // useEffect(() => {
  //   const fetchPostData = async () => {
  //     try {
  //       const response = await client.getEntries({
  //         content_type: "post",
  //         locale: selectedLanguage,
  //       });
  //       console.log(response);
  //       setSelectedPost(response?.items?.[0]);
  //     } catch (error) {
  //       console.error("Error fetching post data:", error);
  //     }
  //   };

  //   fetchPostData();
  // }, [selectedLanguage]);

  // const handleLanguageChange = (event) => {
  //   setSelectedLanguage(event.target.value);
  // };

  // const locale = locales.find((locale) => locale.code === selectedLanguage);
  // console.log(locale);

  const { r, g, b, a } = colorPicker.rgb;
  const rgbaValue = `rgba(${r}, ${g}, ${b}, ${a})`;

  const [animationDataUrl, setAnimationDataUrl] = useState(null);

  useEffect(() => {
    if (lottieAnimation && lottieAnimation.fields.file.url) {
      fetch(lottieAnimation.fields.file.url)
        .then((response) => response.json())
        .then((data) => {
          setAnimationDataUrl(data);
        })
        .catch((error) => {
          console.error("Error fetching Lottie animation data:", error);
        });
    }
  }, [lottieAnimation]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationDataUrl,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  console.log(defaultOptions);

  return (
    <div className={styles.body}>
      {/* <div>
        <Select value={selectedLanguage} onChange={handleLanguageChange}>
          {locales.map((locale) => (
            <Select.Option key={locale.code} value={locale.code}>
              {locale.name}
            </Select.Option>
          ))}
        </Select>
      </div> */}

      <article className={styles.details}>
        {!post.fields ? (
          <>loading..</>
        ) : (
          <CardDetail>
            <div className={styles.grid} style={{ backgroundColor: rgbaValue }}>
              <ContentfulImage
                className={styles.bannerImage}
                alt={title}
                src={coverImage.fields.file.url}
                width={coverImage.fields.file.details.image.width}
                height={coverImage.fields.file.details.image.height}
              />
            </div>

            <div className={styles.blogby}>
              Blog by:
              <div className={styles.blogperson}>
                <ContentfulImage
                  alt={title}
                  src={authore.fields.picture.fields.file.url}
                  width={authore.fields.picture.fields.file.details.image.width}
                  height={
                    authore.fields.picture.fields.file.details.image.height
                  }
                />

                <span> {authore.fields.picture.fields.title}</span>
              </div>
              <div className={styles.content}>
                <h1>{title}</h1>
                <span>Date:{date}</span>
                <RichText content={content} className={styles.content} />
              </div>
            </div>
            <Lottie options={defaultOptions} height={400} width={400} />
          </CardDetail>
        )}
        <FeatureCards features={noOfFeatureCard} />
      </article>
    </div>
  );
};

export const getStaticProps = async ({ params, locale }) => {
  const { slug } = params;

  try {
    // Fetch space to get all locales
    const space = await client.getSpace();
    console.log(space);

    // Fetch post data for the given slug and locale
    const response = await client.getEntries({
      content_type: "post",
      "fields.slug": slug,
      locale: locale,
    });

    console.log(response);
    // If no data found for the given slug and locale, redirect to "/"
    if (!response.items.length) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    // Extract the post data
    const postData = response.items[0];
    console.log(postData);
    // Return the post data along with the locale
    return {
      props: {
        post: postData,
        locale: locale,
        allLocales: space.locales.map((locale) => locale.code), // All available locales
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching post data:", error);

    // If error occurs, return an empty post
    return {
      props: {
        post: null,
        locale: null,
        allLocales: [],
      },
    };
  }
};

export const getStaticPaths = async () => {
  try {
    const response = await client.getEntries({ content_type: "post" });
    const space = await client.getSpace();

    console.log(response);
    const locales = space.locales.map((locale) => locale.code);
    console.log(locales);

    const paths = [];

    response.items.forEach((post) => {
      locales.forEach((locale) => {
        const slug = post.fields.slug;
        paths.push({ params: { slug }, locale });
      });
    });

    console.log(paths);
    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    console.error("Error fetching post paths:", error);
    return {
      paths: [],
      fallback: true,
    };
  }
};

export default Blogs;
