import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { client } from '../client';
import MasonryLayout from '../../components/MasonryLayout';
import Spinner from '../../components/Spinner';
import { feedQuery, searchQuery } from '../../utils/data';

const Feed = () => {
  const [loading, setloading] = useState(false);
  const [pins, setPins] = useState(null);
  // you can target the query string with the router
  const { categoryId } = useRouter().query;

  // this is the query that will be sent to sanity
  // every time that the categoryId changes
  useEffect(() => {
    setloading(true);
    if (categoryId) {
      console.log('categoryId', categoryId);
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        console.log('data', data);
        setloading(false);
        console.log('success');
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setloading(false);
      });
    }
  }, [categoryId]);

  const ideaName = categoryId || 'new';

  if (loading) {
    return (
      <Spinner message={`We are sorting by ${ideaName} ideas to your feed!`} />
    );
  }

  return (
    <div className="flex justify-center sm:px-4 p-12 minmd:w-4/5 minmd:mx-auto">
      <div className="w-full minmd:w-3/5">
        <h3 className="flex justify-center items-center text-2xl font-bold mb-7">
          Home Feed
        </h3>
        <div>{pins && <MasonryLayout pins={pins} />}</div>
      </div>
    </div>
  );
};

export default Feed;
