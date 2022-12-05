import Head from 'next/head';
// BlogCategories, BlogPostWidget
import { BlogPostCard } from '../../components';
// BlogPostWidget
import { getPosts } from '../../services';

// eslint-disable-next-line react/function-component-definition
export default function BlogHome({ posts }) {
  return (
    <div className="flex justify-center sm:px-4 p-12 minmd:mx-auto">
      <div className="w-full minmd:w-3/5">
        <Head>
          <title>The Daily Disco Blog</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {/* <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 ml-5"> */}
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post, index) => (
            <BlogPostCard post={post.node} key={index} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            {/* <BlogPostWidget /> */}
            {/* <BlogCategories /> */}
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}

export async function getStaticProps() {
  const posts = (await getPosts()) || [];
  console.log(posts);

  return {
    props: { posts },
  };
}
