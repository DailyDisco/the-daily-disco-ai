import imageUrlBuilder from '@sanity/image-url';
import { useState, useEffect } from 'react';
import BlockContent from '@sanity/block-content-to-react';

import styles from '../../../styles/Post.module.css';

export const Post = ({ title, body, image }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const imgBuilder = imageUrlBuilder({
      projectId: 'p1ozl58j',
      dataset: 'production',
    });

    setImageUrl(imgBuilder.image(image));
  }, [image]);

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-4/5">
        {/* possible wrap this styles.main class in another div */}
        <div className="styles.main">
          {/* this is our blogs title */}
          <h1 className="flex justify-center font-poppins font-semibold text-3xl mb-3">{title}</h1>
          {/* here we work with our blogs images */}
          {imageUrl && <img className={styles.mainImage} src={imageUrl} />}

          {/* this is where we present the blogs body/content */}
          <div className={styles.body}>
            <BlockContent blocks={body} />
          </div>

        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (pageContext) => {
  const pageSlug = pageContext.query.slug;

  if (!pageSlug) {
    return {
      notFound: true,
    };
  }

  const query = encodeURIComponent(`*[ _type == "post" && slug.current == "${pageSlug}" ]`);
  const url = `https://p1ozl58j.api.sanity.io/v1/data/query/production?query=${query}`;

  const result = await fetch(url).then((res) => res.json());

  //   this is an array of posts
  const post = result.result[0];

  //   if there's not a post
  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      body: post.body,
      title: post.title,
      image: post.mainImage,
    },
  };
};

export default Post;
