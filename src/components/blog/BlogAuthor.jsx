/* eslint-disable @next/next/no-img-element */
import React from 'react';

const BlogAuthor = ({ author }) => {
  return (
    <div className="text-center mt-20 mb-8 p-12 relative border-2 shadow-lg rounded-lg bg-white dark:bg-nft-dark ">
      <div className="absolute left-0 right-0 -top-14">
        <img
          alt={author.name}
          height="100px"
          width="100px"
          className="align-middle rounded-full"
          src={author.photo.url}
        />
      </div>
      <div className="text-black dark:text-white">
        <h3 className="my-4 text-xl font-bold">{author.name}</h3>
        <p className="text-lg">{author.bio}</p>
      </div>
    </div>
  );
};

export default BlogAuthor;
