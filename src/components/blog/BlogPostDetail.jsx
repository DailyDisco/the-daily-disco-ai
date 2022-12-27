import React from 'react';
import moment from 'moment';

/* eslint-disable @next/next/no-img-element */
const BlogPostDetail = ({ post }) => {
  // this gets the parts of the content
  // if the obj exists and if obj.bold exists return text as bold, or italic, or underlined, etc..
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>;
      }

      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>;
      }

      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>;
      }
    }
    // if the type of that object is a either one of those things it will return it as those headings
    switch (type) {
      case 'heading-one':
        return (
          <h3 key={index} className="text-3xl font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        );
      case 'heading-two':
        return (
          <h3 key={index} className="text-2xl font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        );
      case 'heading-three':
        return (
          <h3 key={index} className="text-xl font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        );
      case 'heading-four':
        return (
          <h4 key={index} className="text-md font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        );
      case 'paragraph':
        return (
          <p key={index} className="mb-8">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        );
      case 'image':
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );
      case 'code':
        return (
          <code key={index} className="text-md font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </code>
        );
      default:
        return modifiedText;
    }
  };

  return (
    <div className="dark:bg-nft-dark bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
      <h1 className="flex items-center justify-center mb-8 text-3xl font-semibold">
        {post.title}
      </h1>
      <div className="relative overflow-hidden shadow-md mb-6 h-4/5 w-4/5 mx-auto">
        <img
          src={post.featuredImage.url}
          alt={post.title}
          className="object-top h-full w-full rounded-t-lg"
        />
      </div>
      <div className="px-4 lg:px-0">
        <div className="flex items-center mb-8 w-full">
          <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
            <img
              alt={post.author.name}
              height="30px"
              width="30px"
              className="align-middle rounded-full"
              src={post.author.photo.url}
            />
            <p className="inline align-middle text-white-700 ml-2 text-lg">
              {post.author.name}
            </p>
          </div>
          <div className="font-medium text-white-7">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline mr-2 text-pink-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {/* this is for placing a date on the post */}
            <span>{moment(post.createdAt).format('MMM DD, YYYY')}</span>
          </div>
        </div>
        {/* <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1> */}
        {/* here we will map through the children of the post which include excerpt, body, author, etc... */}
        {/* console.log(post.content.raw) */}
        {post.content.raw.children.map((typeObj, index) => {
          const children = typeObj.children.map((item, itemIndex) =>
            getContentFragment(itemIndex, item.text, item)
          );
          //   now we have the children so pass them
          return getContentFragment(index, children, typeObj, typeObj.type);
        })}
      </div>
    </div>
  );
};

export default BlogPostDetail;
