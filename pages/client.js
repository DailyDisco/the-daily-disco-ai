import sanityClient from '@sanity/client';
import ImageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2021-11-16',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_APP_SANITY_TOKEN,
});

// builder is used to create image urls
const builder = ImageUrlBuilder(client);

// this is a utility function to create image urls
export const urlFor = (source) => builder.image(source);

const random = () => {
  return <div>client</div>;
};

export default random;
