import React from 'react';

import { getPosts, getPostDetails } from '../../../services';

import {
  BlogPostDetail,
  //   BlogCategories,
  //   BlogPostWidget,
  BlogAuthor,
  //   BlogComments,
  //   BlogCommentsForm,
} from '../../../components';

const BlogPostDetails = ({ post }) => {
  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-3/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 ml-5">
          <div className="col-span-1 lg:col-span-8">
            <BlogPostDetail post={post} />
            <BlogAuthor author={post.author} />
            {/* <BlogCommentsForm slug={post.slug} />
            <BlogComments slug={post.slug} /> */}
          </div>
          {/* <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">
              <BlockPostWidget
                slug={post.slug}
                categories={post.categories.map((category) => category.slug)}
              />
              <Categories />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetails;

// these results are pass as props to this component
export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.slug);
  console.log(data);

  return {
    props: { post: data },
  };
}

export async function getStaticPaths() {
  const posts = await getPosts();

  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: false,
  };
}
